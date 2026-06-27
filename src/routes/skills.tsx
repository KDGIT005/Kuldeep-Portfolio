import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import { Skills as SkillsSection } from "@/components/Portfolio";

function SkillsPage() {
  return (
    <PageShell>
      <SkillsSection />
    </PageShell>
  );
}

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
  head: () => ({
    meta: [
      { title: "Technical Skills — Kuldeep Dhangad" },
      { name: "description", content: "Java, Kotlin, Python, React, Spring Boot, AWS, Docker, PostgreSQL, Gemini API — explore the full technical stack of Kuldeep Dhangad." },
      { property: "og:title", content: "Technical Skills — Kuldeep Dhangad" },
    ],
  }),
});
