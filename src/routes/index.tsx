import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Kuldeep Dhangad — AI Backend Developer & Full-Stack Engineer" },
      { name: "description", content: "Portfolio of Kuldeep Dhangad, B.Tech CS student at VIT Bhopal building AI-powered full-stack systems with Java, Kotlin, Python, and modern cloud infrastructure." },
      { property: "og:title", content: "Kuldeep Dhangad — AI Backend Developer" },
      { property: "og:description", content: "AI-powered full-stack systems, real-time biometric pipelines, and cloud-native platforms." },
    ],
  }),
});
