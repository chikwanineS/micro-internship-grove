import { createFileRoute } from "@tanstack/react-router";
import { SkillBridge } from "@/components/skillbridge/SkillBridge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillBridge — Micro-internships for emerging developers" },
      { name: "description", content: "Complete real micro-tasks from local businesses and build a verified portfolio." },
      { property: "og:title", content: "SkillBridge — Micro-internships for emerging developers" },
      { property: "og:description", content: "Complete real micro-tasks from local businesses and build a verified portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillBridge,
});
