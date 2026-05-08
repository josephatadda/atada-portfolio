import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const navItems = [
  { num: "01/", label: "Home", to: "/" },
  { num: "02/", label: "Works", to: "/works" },
  { num: "03/", label: "About", to: "/about" },
  { num: "04/", label: "Playground", to: "/playground" },
];

export default function SharedNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-canvas w-full relative z-20">
      <Container>
        <div className="flex items-center justify-between py-[var(--lg)] sm:py-[var(--xl)] md:py-[var(--2xl)]">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <p className="font-sans font-semibold text-charcoal text-[22px] sm:text-[24px] md:text-[28px] tracking-[-0.5px] leading-[1.5]">
              Atada®
            </p>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-[24px] lg:gap-[40px] items-center">
            <div className="flex gap-[20px] lg:gap-[32px] items-center">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex gap-[var(--3xs)] items-start hover:opacity-75 transition-opacity duration-150"
                >
                  <span className="font-sans text-grey-7 text-[10px] leading-3">{item.num}</span>
                  <span
                    className="font-medium text-grey-9 text-[14px] tracking-[-0.2px] leading-5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              className="bg-charcoal flex items-center justify-center px-[var(--xl)] py-[var(--sm)] rounded-[var(--full-radius)] hover:bg-[#333] transition-colors"
            >
              <span className="font-sans font-medium text-white text-[15px] lg:text-[16px] tracking-[-0.3px] leading-6">
                Resume
              </span>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          >
            <span className={`w-6 h-px bg-charcoal transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`w-6 h-px bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-px bg-charcoal transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-6 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex gap-2 items-baseline py-2 hover:opacity-75 transition-opacity duration-150"
              >
                <span className="font-sans text-grey-7 text-[12px]">{item.num}</span>
                <span className="font-medium text-grey-9 text-[18px] tracking-[-0.3px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download
              className="bg-charcoal mt-2 inline-flex items-center justify-center px-[var(--xl)] py-[var(--reg)] rounded-[var(--full-radius)] hover:bg-[#333] transition-colors w-fit"
            >
              <span className="font-sans font-medium text-white text-[16px] tracking-[-0.3px] leading-6">Resume</span>
            </a>
          </div>
        )}
      </Container>
    </nav>
  );
}
