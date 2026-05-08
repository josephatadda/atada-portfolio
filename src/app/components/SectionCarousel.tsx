import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";

// Exact arrow paths from the Figma SVG token file
const ARROW_LEFT =
  "M9.00029 3.75021C9.00029 3.84966 8.96079 3.94505 8.89046 4.01537C8.82013 4.0857 8.72475 4.12521 8.62529 4.12521H1.28045L4.01561 6.8599C4.05045 6.89474 4.07809 6.9361 4.09694 6.98162C4.1158 7.02715 4.1255 7.07594 4.1255 7.12521C4.1255 7.17448 4.1158 7.22327 4.09694 7.2688C4.07809 7.31432 4.05045 7.35568 4.01561 7.39052C3.98077 7.42536 3.9394 7.453 3.89388 7.47186C3.84836 7.49071 3.79957 7.50042 3.7503 7.50042C3.70102 7.50042 3.65223 7.49071 3.60671 7.47186C3.56119 7.453 3.51982 7.42536 3.48498 7.39052L0.109982 4.01552C0.0751163 3.98069 0.0474567 3.93934 0.0285851 3.89381C0.0097135 3.84829 0 3.79949 0 3.75021C0 3.70093 0.0097135 3.65213 0.0285851 3.60661C0.0474567 3.56108 0.0751163 3.51972 0.109982 3.4849L3.48498 0.109896C3.55535 0.0395308 3.65078 -7.41418e-10 3.7503 0C3.84981 7.41419e-10 3.94524 0.0395308 4.01561 0.109896C4.08597 0.180261 4.1255 0.275697 4.1255 0.375208C4.1255 0.47472 4.08597 0.570156 4.01561 0.640521L1.28045 3.37521H8.62529C8.72475 3.37521 8.82013 3.41472 8.89046 3.48504C8.96079 3.55537 9.00029 3.65075 9.00029 3.75021Z";
const ARROW_RIGHT =
  "M8.89031 4.01552L5.51531 7.39052C5.44495 7.46089 5.34951 7.50042 5.25 7.50042C5.15049 7.50042 5.05505 7.46089 4.98469 7.39052C4.91432 7.32016 4.87479 7.22472 4.87479 7.12521C4.87479 7.0257 4.91432 6.93026 4.98469 6.8599L7.71984 4.12521H0.375C0.275544 4.12521 0.180161 4.0857 0.109835 4.01537C0.0395089 3.94505 0 3.84966 0 3.75021C0 3.65075 0.0395089 3.55537 0.109835 3.48504C0.180161 3.41472 0.275544 3.37521 0.375 3.37521H7.71984L4.98469 0.640521C4.91432 0.570156 4.87479 0.47472 4.87479 0.375208C4.87479 0.275697 4.91432 0.180261 4.98469 0.109896C5.05505 0.0395308 5.15049 0 5.25 0C5.34951 0 5.44495 0.0395308 5.51531 0.109896L8.89031 3.4849C8.92518 3.51972 8.95284 3.56108 8.97171 3.60661C8.99058 3.65213 9.00029 3.70093 9.00029 3.75021C9.00029 3.79949 8.99058 3.84829 8.97171 3.89381C8.95284 3.93934 8.92518 3.98069 8.89031 4.01552Z";

// Reusable rounded icon button — small, perfectly circular
function IconButton({
  onClick,
  "aria-label": ariaLabel,
  children,
}: {
  onClick: () => void;
  "aria-label": string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-grey-3 hover:bg-grey-4 transition-colors duration-150 shrink-0"
    >
      {children}
    </button>
  );
}

interface SectionCarouselProps {
  images: string[];
  title: string;
}

export default function SectionCarousel({ images, title }: SectionCarouselProps) {
  const [idx, setIdx] = useState(0);
  const [lbIdx, setLbIdx] = useState(-1);
  const n = images.length;

  const prev = () => setIdx((i) => (i - 1 + n) % n);
  const next = () => setIdx((i) => (i + 1) % n);

  return (
    <div className="flex flex-col gap-[16px] items-center w-full">
      {/* Slide image */}
      <div className="relative w-full rounded-[16px] overflow-hidden aspect-[4096/2852]">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${title} — slide ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover rounded-[16px] cursor-zoom-in"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setLbIdx(idx)}
          />
        </AnimatePresence>
      </div>

      {/* Single nav row: [←] [dots] [→] */}
      <div className="flex gap-[20px] items-center">
        <IconButton onClick={prev} aria-label={`Previous ${title} slide`}>
          <svg width="9" height="8" viewBox="0 0 9.00029 7.50042" fill="none">
            <path d={ARROW_LEFT} fill="#222222" />
          </svg>
        </IconButton>

        <div className="flex gap-[8px] items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full size-[8px] transition-colors duration-200 ${
                i === idx ? "bg-accent" : "bg-grey-4"
              }`}
              aria-label={`Go to ${title} slide ${i + 1}`}
            />
          ))}
        </div>

        <IconButton onClick={next} aria-label={`Next ${title} slide`}>
          <svg width="9" height="8" viewBox="0 0 9.00029 7.50042" fill="none">
            <path d={ARROW_RIGHT} fill="#222222" />
          </svg>
        </IconButton>
      </div>

      {/* Lightbox — opens on image click, navigates through section images */}
      <Lightbox
        images={images}
        index={lbIdx}
        onClose={() => setLbIdx(-1)}
        onNext={() => setLbIdx((i) => (i + 1) % n)}
        onPrev={() => setLbIdx((i) => (i - 1 + n) % n)}
      />
    </div>
  );
}
