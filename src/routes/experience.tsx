import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import { Experience as ExperienceSection } from "@/components/Portfolio";

function ExperiencePage() {
  return (
    <PageShell>
      <ExperienceSection />
    </PageShell>
  );
}

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: "Experience & Achievements — Kuldeep Dhangad" },
      { name: "description", content: "Hackathon finalist, dual AWS certification, ServiceNow virtual internship, McKinsey Forward, IEEE involvement, and campus leadership achievements." },
      { property: "og:title", content: "Experience & Achievements — Kuldeep Dhangad" },
    ],
  }),
});
