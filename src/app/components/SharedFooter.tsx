import { Link } from "react-router-dom";
import Container from "./Container";

const navItems = [
  { label: "Home", to: "/", num: "01" },
  { label: "Portfolio", to: "/works", num: "02" },
  { label: "About", to: "/about", num: "03" },
  { label: "Playground", to: "/playground", num: "04" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/josephatada",
    icon: (
      <svg viewBox="0 0 16 16" fill="white" className="w-full h-full">
        <path d="M13.333 2H2.667A.667.667 0 0 0 2 2.667v10.666c0 .369.298.667.667.667h10.666a.667.667 0 0 0 .667-.667V2.667A.667.667 0 0 0 13.333 2ZM5.81 12.16H3.927V6.084H5.81v6.075ZM4.87 5.219a1.092 1.092 0 1 1 0-2.184 1.092 1.092 0 0 1 0 2.184Zm7.296 6.94H10.28V9.21c0-.703-.013-1.608-.98-1.608-.982 0-1.132.766-1.132 1.557v2.999H6.286V6.084h1.808v.83h.026a1.984 1.984 0 0 1 1.785-.98c1.91 0 2.262 1.256 2.262 2.89v3.335Z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/josephatada",
    icon: (
      <svg viewBox="0 0 16 16" fill="white" className="w-full h-full">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm4.293 3a5.475 5.475 0 0 1 1.182 3.434c-.183-.039-2.014-.41-3.86-.178-.044-.108-.083-.21-.131-.32a18.16 18.16 0 0 0-.402-.882c2.01-.819 2.928-1.998 3.211-2.054ZM8 2.539c1.387 0 2.654.52 3.616 1.375-.234.337-1.064 1.443-3.012 2.171a32.34 32.34 0 0 0-2.155-3.34c.5-.13 1.022-.206 1.55-.206ZM4.41 3.156a36.18 36.18 0 0 1 2.149 3.299c-2.51.668-4.733.652-4.972.65a5.515 5.515 0 0 1 2.823-3.95Zm-2.953 4.95v-.169c.234.005 2.85.04 5.527-.764.155.296.295.598.428.9-.07.022-.142.046-.211.07-2.768.892-4.235 3.336-4.358 3.541a5.464 5.464 0 0 1-1.386-3.578Zm6.541 5.36c-1.225 0-2.359-.418-3.252-1.116.097-.198 1.197-2.318 4.226-3.371.011-.005.02-.005.032-.011.755 1.954 1.063 3.59 1.142 4.061-.65.275-1.349.438-2.148.438Zm3.122-.985c-.054-.32-.34-1.882-1.04-3.81 1.738-.275 3.262.18 3.453.241a5.484 5.484 0 0 1-2.413 3.569Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/josephatada",
    icon: (
      <svg viewBox="0 0 16 16" fill="white" className="w-full h-full">
        <path d="M9.232 6.778 14.06 1.5h-1.144L8.722 6.083 5.366 1.5H1.5l5.061 6.911L1.5 14h1.143l4.428-4.84 3.535 4.84H14.5l-5.27-7.222Zm-1.564 1.71-.514-.69-4.084-5.473h1.756l3.299 4.418.514.69 4.286 5.74h-1.755l-3.502-4.685Z" />
      </svg>
    ),
  },
];

export default function SharedFooter() {
  return (
    <footer className="bg-dark-bg w-full">
      <Container>
        <div className="flex flex-col gap-[var(--5xl)] md:gap-[var(--6xl)] py-[var(--5xl)] md:py-[var(--6xl)]">
          {/* Top */}
          <div className="flex flex-col gap-[var(--5xl)] md:flex-row md:items-start md:justify-between md:gap-12 w-full">
            {/* Left */}
            <div className="flex flex-col gap-[32px] md:gap-[50px] w-full md:max-w-[384px]">
              <div className="flex flex-col font-display tracking-[-2px] text-[36px] sm:text-[44px] md:text-[56px] leading-[1.2]">
                <span className="text-white/50">Let's work together&nbsp;&nbsp;</span>
                <a
                  href="mailto:josephatadda@gmail.com"
                  className="text-white hover:opacity-80 transition-opacity break-all"
                >
                  josephatadda@gmail.com
                </a>
              </div>
              <Link
                to="/about"
                className="bg-grey-3 px-[var(--xl)] py-[var(--sm)] rounded-[var(--full-radius)] hover:bg-[#d5d5d5] transition-colors w-fit"
              >
                <span className="font-sans font-medium text-charcoal text-[16px] tracking-[-0.3px] leading-6">
                  About Me
                </span>
              </Link>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-[var(--3xl)] w-full md:w-auto">
              <div className="flex flex-col gap-[10px] w-full md:w-[346px]">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex gap-[var(--xs)] items-end pb-[var(--lg)] border-b border-grey-8 hover:opacity-80 transition-opacity"
                  >
                    <span className="font-sans font-medium text-grey-8 text-[14px] tracking-[-0.2px] leading-5">
                      {item.label}
                    </span>
                    <span className="font-mono font-medium text-white/50 text-[11px] uppercase leading-4">
                      {item.num}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex gap-[var(--xs)]">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="bg-charcoal flex items-center justify-center px-[var(--reg)] py-[var(--sm)] rounded-[var(--full-radius)] hover:bg-[#333] transition-colors"
                  >
                    <span className="block w-5 h-5">{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Year details */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-end sm:justify-between w-full">
            <div className="flex gap-[20px] sm:gap-[32px] items-end">
              <span className="font-sans font-medium text-white text-[14px] sm:text-[16px] tracking-[-0.3px] leading-none">
                © 2025
              </span>
              <div className="hidden sm:flex gap-[9px] items-end">
                {[10, 10, 10, 10, 10, 40, 10, 10, 10, 10, 10].map((h, i) => (
                  <div key={i} className="bg-grey-7 w-px" style={{ height: `${h}px` }} />
                ))}
              </div>
              <span className="font-sans font-medium text-white text-[14px] sm:text-[16px] tracking-[-0.3px] leading-none">
                19'
              </span>
            </div>
            <span className="font-sans font-medium text-grey-8 text-[14px] sm:text-[16px] tracking-[-0.3px] leading-[1.5]">
              Crafted with Claude Code x Figma
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
