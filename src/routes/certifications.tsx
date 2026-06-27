import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import { Certifications as CertificationsSection } from "@/components/Portfolio";

function CertificationsPage() {
  return (
    <PageShell>
      <CertificationsSection />
    </PageShell>
  );
}

export const Route = createFileRoute("/certifications")({
  component: CertificationsPage,
  head: () => ({
    meta: [
      { title: "Certifications — Kuldeep Dhangad" },
      { name: "description", content: "AWS Cloud Practitioner Essentials, DevOps Fundamentals (IBM), McKinsey Forward Program — certifications earned by Kuldeep Dhangad." },
      { property: "og:title", content: "Certifications — Kuldeep Dhangad" },
    ],
  }),
});
