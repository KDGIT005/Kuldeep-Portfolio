import { createFileRoute } from "@tanstack/react-router";
import { Hero, Ticker, About, NavigationCards, Contact, SocialRail } from "@/components/Portfolio";

function LandingPage() {
  return (
    <>
      <div className="relative">
        <SocialRail />
        <Hero />
        <Ticker />
        <About />
        <NavigationCards />
      </div>
      <Contact />
    </>
  );
}

export const Route = createFileRoute("/")(  {
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Kuldeep Dhangad — AI Backend Developer & Full-Stack Engineer" },
      { name: "description", content: "Portfolio of Kuldeep Dhangad, B.Tech CS student at VIT Bhopal building AI-powered full-stack systems with Java, Kotlin, Python, and modern cloud infrastructure." },
      { property: "og:title", content: "Kuldeep Dhangad — AI Backend Developer" },
      { property: "og:description", content: "AI-powered full-stack systems, real-time biometric pipelines, and cloud-native platforms." },
    ],
  }),
});
