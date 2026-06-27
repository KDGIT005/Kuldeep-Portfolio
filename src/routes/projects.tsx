import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import { Projects as ProjectsSection } from "@/components/Portfolio";

function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />
    </PageShell>
  );
}

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Featured Projects — Kuldeep Dhangad" },
      { name: "description", content: "CABO ride-sharing platform, HealthSenseAI Android app — full-stack projects built with React, Spring Boot, Kotlin, and cloud infrastructure." },
      { property: "og:title", content: "Featured Projects — Kuldeep Dhangad" },
    ],
  }),
});
