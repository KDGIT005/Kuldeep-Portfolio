import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BootIntro from "@/components/BootIntro";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kuldeep Dhangad — AI Backend Developer & Full-Stack Engineer" },
      { name: "description", content: "Portfolio of Kuldeep Dhangad, B.Tech CS student at VIT Bhopal building AI-powered full-stack systems with Java, Kotlin, Python, and modern cloud infrastructure." },
      { name: "author", content: "Kuldeep Dhangad" },
      { property: "og:title", content: "Kuldeep Dhangad — AI Backend Developer & Full-Stack Engineer" },
      { property: "og:description", content: "AI-powered full-stack systems, real-time biometric pipelines, and cloud-native platforms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@kuldeepdhangad" },
      { name: "theme-color", content: "#7c3aed" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("kd_booted");
    if (seen) setBooted(true);
  }, []);

  const finish = () => {
    sessionStorage.setItem("kd_booted", "1");
    setBooted(true);
  };

  return (
    <QueryClientProvider client={queryClient}>

      <AnimatePresence>{!booted && <BootIntro key="intro" onFinish={finish} />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 16 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen text-foreground"
      >
        <Navbar />
        <Outlet />
        <Footer />
      </motion.div>
    </QueryClientProvider>
  );
}
