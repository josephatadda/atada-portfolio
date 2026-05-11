import { motion } from "framer-motion";
import SharedNavbar from "../components/SharedNavbar";
import SharedFooter from "../components/SharedFooter";
import ScrollReveal from "../components/ScrollReveal";

import imgPlaceholder from "../../imports/Frame427321895/d597c2ea7c26c703ee1e731fa5ee054775925887.png";
import imgPlaceholder2 from "../../imports/Frame427321900-1/2b90cef839ed3fe33c8744d975f07ac758f5a7b8.png";
import imgPlaceholder3 from "../../imports/Frame427321895/f48cf34c09e6292bd52a7a80ea81ec16af4fe4ee.png";
import imgPlaceholder4 from "../../imports/Frame427321895/0d63c93f6c9aa222aee576ffcd4bd4cbd8411b0d.png";

interface PlaygroundItem {
  title: string;
  type: string;
  year: string;
  image: string;
  wide?: boolean;
}

const ITEMS: PlaygroundItem[] = [
  {
    title: "UI Components",
    type: "Design System",
    year: "2025",
    image: imgPlaceholder,
    wide: true,
  },
  {
    title: "Motion Experiments",
    type: "Interaction",
    year: "2025",
    image: imgPlaceholder2,
  },
  {
    title: "Typography Play",
    type: "Visual Design",
    year: "2024",
    image: imgPlaceholder3,
  },
  {
    title: "Brand Concepts",
    type: "Branding",
    year: "2024",
    image: imgPlaceholder4,
    wide: true,
  },
];

function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  return (
    <div className="flex flex-col gap-4 items-start w-full group">
      <div className="relative rounded-[24px] w-full h-[496px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        />
      </div>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-1 items-start">
          <p className="font-display text-[24px] tracking-[-0.6px] leading-[1.2] text-black">
            {item.title}
          </p>
          <p className="text-grey-8 text-[15px] tracking-[-0.3px] leading-[1.5]">
            {item.type}
          </p>
        </div>
        <span className="font-sans font-medium text-grey-7 text-[13px] tracking-[-0.2px] leading-5 mt-1">
          {item.year}
        </span>
      </div>
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative inline-block" style={{ width: 8, height: 8 }}>
      <span className="absolute inset-[18.75%] rounded-full border border-accent/40" />
      <span className="absolute inset-[31.25%] rounded-full bg-accent" />
    </span>
  );
}

export default function PlaygroundPage() {
  const row1 = ITEMS.slice(0, 2);
  const row2 = ITEMS.slice(2, 4);

  return (
    <div className="bg-canvas min-h-screen w-full">
      <div className="w-full max-w-[980px] mx-auto px-6">
        <SharedNavbar />
      </div>

      <div className="w-full max-w-[980px] mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-3 items-start pt-[80px] pb-[64px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex gap-[var(--xs)] items-center">
            <StatusDot />
            <span className="font-sans font-medium text-grey-8 text-[18px] tracking-[-0.5px] leading-[1.5]">
              Experiments
            </span>
          </div>
          <div className="flex items-end justify-between w-full">
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-[48px] tracking-[-1.5px] leading-[1.2] text-black">
                Playground
              </h1>
              <p className="font-sans font-medium text-grey-8 text-[18px] tracking-[-0.5px] leading-[1.5]">
                Design exercises, UI experiments &amp; fun ideas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="flex flex-col gap-5 pb-[160px]">
          <ScrollReveal className="w-full">
            <div className="flex gap-5 h-[496px] items-start w-full">
              <div className="relative rounded-[24px] overflow-hidden h-full shrink-0 w-[547px]">
                <img
                  src={row1[0].image}
                  alt={row1[0].title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                <div className="absolute bottom-5 left-5 flex flex-col gap-1">
                  <span className="font-display text-[24px] tracking-[-0.6px] leading-[1.2] text-white drop-shadow">
                    {row1[0].title}
                  </span>
                  <span className="font-sans font-medium text-white/70 text-[13px] tracking-[-0.2px]">
                    {row1[0].type} · {row1[0].year}
                  </span>
                </div>
              </div>
              <div className="relative rounded-[24px] overflow-hidden h-full flex-1 min-w-0">
                <img
                  src={row1[1].image}
                  alt={row1[1].title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                <div className="absolute bottom-5 left-5 flex flex-col gap-1">
                  <span className="font-display text-[24px] tracking-[-0.6px] leading-[1.2] text-white drop-shadow">
                    {row1[1].title}
                  </span>
                  <span className="font-sans font-medium text-white/70 text-[13px] tracking-[-0.2px]">
                    {row1[1].type} · {row1[1].year}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="w-full" delay={0.05}>
            <div className="flex gap-5 h-[496px] items-start w-full">
              <div className="relative rounded-[24px] overflow-hidden h-full flex-1 min-w-0">
                <img
                  src={row2[0].image}
                  alt={row2[0].title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                <div className="absolute bottom-5 left-5 flex flex-col gap-1">
                  <span className="font-display text-[24px] tracking-[-0.6px] leading-[1.2] text-white drop-shadow">
                    {row2[0].title}
                  </span>
                  <span className="font-sans font-medium text-white/70 text-[13px] tracking-[-0.2px]">
                    {row2[0].type} · {row2[0].year}
                  </span>
                </div>
              </div>
              <div className="relative rounded-[24px] overflow-hidden h-full shrink-0 w-[557px]">
                <img
                  src={row2[1].image}
                  alt={row2[1].title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                <div className="absolute bottom-5 left-5 flex flex-col gap-1">
                  <span className="font-display text-[24px] tracking-[-0.6px] leading-[1.2] text-white drop-shadow">
                    {row2[1].title}
                  </span>
                  <span className="font-sans font-medium text-white/70 text-[13px] tracking-[-0.2px]">
                    {row2[1].type} · {row2[1].year}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}
