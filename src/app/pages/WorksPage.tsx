import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SharedNavbar from "../components/SharedNavbar";
import SharedFooter from "../components/SharedFooter";
import ScrollReveal from "../components/ScrollReveal";

import imgCatlogWebsite from "../../imports/Frame427321895/0d63c93f6c9aa222aee576ffcd4bd4cbd8411b0d.png";
import imgCatlogAI from "../../imports/Frame427321900-1/cbe6561e4e5045f88b8011359f61774c5d1d84d8.png";
import imgCompstack from "../../imports/Frame427321895/f45fc1b82a7e2bbc33afe9f702924cfe2f7948a8.png";

type Tag = "All" | "Mobile" | "Web" | "Branding";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  slug?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Compstack HRMS Redesign",
    description: "Redesigning an HRMS platform from fragmented screens into a coherent product system",
    image: imgCompstack,
    tags: ["Web"],
    year: "2024",
    slug: "compstack",
  },
  {
    title: "Catlog AI Assistant",
    description: "Turning Instagram conversations into a more reliable commerce workflow",
    image: imgCatlogAI,
    tags: ["Mobile"],
    year: "2024",
    slug: "catlog-ai",
  },
  {
    title: "Catlog Website Revamp",
    description: "Redesigning the website to better reflect the product and the brand",
    image: imgCatlogWebsite,
    tags: ["Web"],
    year: "2025",
  },
];

const FILTERS: Tag[] = ["All", "Mobile", "Web"];

function StatusDot() {
  return (
    <span className="relative inline-block" style={{ width: 8, height: 8 }}>
      <span className="absolute inset-[18.75%] rounded-full border border-accent/40" />
      <span className="absolute inset-[31.25%] rounded-full bg-accent" />
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <div className="flex flex-col gap-6 items-start w-full group">
      <div className="h-[714px] relative rounded-[24px] shrink-0 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        />
        {!project.slug && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[24px]">
            <span className="bg-white/90 text-charcoal font-sans font-medium text-[13px] tracking-[-0.2px] px-4 py-2 rounded-full">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2 items-start">
          <p
            className="font-display text-[32px] tracking-[-0.9px] leading-[1.2] text-black"
          >
            {project.title}
          </p>
          <p className="text-grey-8 text-[18px] tracking-[-0.5px] leading-[1.5]">
            {project.description}
          </p>
        </div>

        <div className="flex gap-3 items-center shrink-0 ml-8">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="bg-white flex items-center justify-center px-5 py-3 rounded-full"
            >
              <span className="font-sans font-medium text-grey-10 text-[14px] tracking-[-0.2px] leading-5 uppercase">
                {tag}
              </span>
            </div>
          ))}
          <div className="bg-white flex items-center justify-center px-5 py-3 rounded-full">
            <span className="font-sans font-medium text-grey-10 text-[14px] tracking-[-0.2px] leading-5">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (project.slug) {
    return (
      <Link to={`/project/${project.slug}`} className="w-full cursor-pointer">
        {inner}
      </Link>
    );
  }

  return <div className="w-full cursor-default">{inner}</div>;
}

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<Tag>("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="bg-canvas min-h-screen w-full">
      <div className="w-full max-w-[980px] mx-auto px-6">
        <SharedNavbar />
      </div>

      <div className="w-full max-w-[980px] mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-[64px] items-start pt-[80px] pb-[64px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-end justify-between w-full">
            <div className="flex flex-col gap-3 items-start">
              <div className="flex gap-[var(--xs)] items-center">
                <StatusDot />
                <span className="font-sans font-medium text-grey-8 text-[18px] tracking-[-0.5px] leading-[1.5]">
                  Case Studies
                </span>
              </div>
              <h1 className="font-display text-[48px] tracking-[-1.5px] leading-[1.2] text-black">
                Selected Projects
              </h1>
            </div>
            <p className="font-display text-[40px] tracking-[-1.5px] leading-[1.2] text-black">
              24' - 26'
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 items-center">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-full font-sans font-medium text-[14px] tracking-[-0.2px] leading-5 transition-colors duration-150 ${
                  activeFilter === f
                    ? "bg-charcoal text-white"
                    : "bg-white text-grey-9 hover:bg-grey-3"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col gap-[48px] items-start pb-[160px]">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.title} className="w-full" delay={i * 0.05}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}
