import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(200, "Email is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

// Simple in-memory rate limiting (resets on worker restart / cold start).
// For production with persistent rate limiting, use Cloudflare KV.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function handleContactRequest(
  request: Request,
  env: Record<string, string | undefined>,
): Promise<Response> {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  // Rate limit by IP
  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown";
  if (isRateLimited(clientIp)) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.errors[0]?.message || "Validation failed";
    return jsonResponse({ error: firstError }, 400);
  }

  const { name, email, message } = result.data;

  // Try sending via Resend if API key is configured
  const resendApiKey = env.RESEND_API_KEY;
  const notifyEmail = env.CONTACT_NOTIFY_EMAIL || "kuldeepdhangad@gmail.com";

  if (resendApiKey) {
    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [notifyEmail],
          subject: `Portfolio Contact: ${name}`,
          html: `
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="padding:12px;background:#f5f5f5;border-left:4px solid #7c3aed;margin:8px 0;">
              ${escapeHtml(message).replace(/\n/g, "<br>")}
            </blockquote>
            <p style="color:#888;font-size:12px;">Sent from kuldeep.dev portfolio contact form</p>
          `,
          reply_to: email,
        }),
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error("Resend API error:", resendResponse.status, errorText);
        // Fall through to console log fallback
      } else {
        console.log(
          `[Contact] Email sent via Resend to ${notifyEmail} from ${name} <${email}>`,
        );
        return jsonResponse({ success: true, message: "Message sent successfully!" });
      }
    } catch (err) {
      console.error("Resend fetch error:", err);
      // Fall through to console log fallback
    }
  }

  // Fallback: log to console (visible in Cloudflare Workers logs)
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📬 NEW CONTACT FORM SUBMISSION");
  console.log(`   Name:    ${name}`);
  console.log(`   Email:   ${email}`);
  console.log(`   Message: ${message}`);
  console.log(`   IP:      ${clientIp}`);
  console.log(`   Time:    ${new Date().toISOString()}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return jsonResponse({
    success: true,
    message: "Message received! I'll get back to you soon.",
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
