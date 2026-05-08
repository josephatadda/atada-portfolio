import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import svgPaths from "./svg-kabdf78a5m";
import imgImage326 from "./cbe6561e4e5045f88b8011359f61774c5d1d84d8.png";
import imgScreenshot20260506At0411221 from "./366851bab98850436018980d31f8e11e226bc883.png";
import imgImage from "./ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgImage26 from "./b5f6728afb66f698185b3638fcf240b3fadf82ee.png";
import imgImage327 from "./2b90cef839ed3fe33c8744d975f07ac758f5a7b8.png";
import imgImage328 from "./b2f1e0ac5389c908871a9a20b6778a4baf96b01f.png";
import SharedNavbar from "../../app/components/SharedNavbar";
import SharedFooter from "../../app/components/SharedFooter";
import Lightbox from "../../app/components/Lightbox";

// Lightbox context
const LightboxContext = createContext<((src: string) => void) | null>(null);
const useLbOpen = () => useContext(LightboxContext)!;

// FadeUp animation component
function FadeUp({ children, className = "w-full", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Dynamic side nav — builds itself from data-section elements in #cs-content
type NavItem = { id: string; label: string };

function slugify(text: string) {
  return "cs-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function StickyNav() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const container = document.getElementById("cs-content");
    if (!container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>("[data-section]"));
    const items: NavItem[] = sections.flatMap((el) => {
      const allDivs = Array.from(el.querySelectorAll("div"));
      const headingDiv = allDivs.find((d) =>
        d.className.includes("instrument_serif") &&
        (d.className.includes("36px") || d.className.includes("32px"))
      );
      const label = headingDiv?.querySelector("p")?.textContent?.trim() ?? "";
      if (!label) return [];
      const id = slugify(label);
      el.id = id;
      return [{ id, label }];
    });

    setNavItems(items);
    if (items.length) setActiveId(items[0].id);
  }, []);

  useEffect(() => {
    if (!navItems.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[120px] flex flex-col gap-[8px] items-start shrink-0 w-[150px]" data-name="List">
      {navItems.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex gap-[10px] items-center w-full text-left"
          >
            <div
              className="h-px shrink-0 transition-all duration-200"
              style={{ width: isActive ? "24px" : "16px", backgroundColor: isActive ? "#222222" : "#ababab" }}
            />
            <span
              className="font-['geist:Regular',sans-serif] not-italic text-[15px] tracking-[-0.3px] whitespace-nowrap transition-colors duration-200"
              style={{
                color: isActive ? "#222222" : "#7c7c7c",
                fontWeight: isActive ? 500 : 400,
                fontFeatureSettings: "'zero'",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}


function Frame28() {
  return (
    <div className="flex gap-[10px] items-center relative shrink-0">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Product Design</p>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Bottom Status [1.1]">
        <div className="absolute inset-[18.75%]" data-name="Stroke">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p1ebfe500} fill="var(--fill-0, #C0C0C0)" id="Stroke" />
          </svg>
        </div>
        <div className="absolute inset-[31.25%]" data-name="Ellipse">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p3d92b780} fill="var(--fill-0, #C0C0C0)" id="Ellipse" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Mobile</p>
      </div>
      <div className="relative shrink-0 size-[8px]" data-name="Bottom Status [1.1]">
        <div className="absolute inset-[18.75%]" data-name="Stroke">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p1ebfe500} fill="var(--fill-0, #C0C0C0)" id="Stroke" />
          </svg>
        </div>
        <div className="absolute inset-[31.25%]" data-name="Ellipse">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p3d92b780} fill="var(--fill-0, #C0C0C0)" id="Ellipse" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">2025</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="flex flex-col gap-[10px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[56px] text-black tracking-[-2px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Compstack Redesign</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 text-[18px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Redesigning an HRMS platform for HR teams managing payroll, people operations, and reporting</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="flex flex-col items-start relative shrink-0 w-full">
      <Frame28 />
      <Frame27 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="flex gap-[6px] items-center justify-center relative rounded-[999px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[20px]" data-name="ArrowBendUpLeft">
          <div className="absolute inset-[18.75%_9.38%_18.75%_9.37%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2505 12.5003">
              <path d={svgPaths.p3eea7500} fill="var(--fill-0, #222222)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-charcoal text-[16px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[24px]">Back</p>
        </div>
      </div>
      <Frame29 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">My Role</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Product Designer</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative text-[16px]">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Team</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-grey-9 w-[min-content]" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Product Designer, Brand Designer, Front-end Engineer</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[16px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Timeline</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-grey-9 text-[0px] w-[min-content]" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] whitespace-pre-wrap">
          <span className="leading-[1.5] text-grey-9" style={{ fontFeatureSettings: "'zero'" }}>
            ~6 weeks
          </span>
          <span className="leading-[1.5]" style={{ fontFeatureSettings: "'zero'" }}>{`  (March–April 2025)`}</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex gap-[40px] items-start leading-[0] not-italic relative shrink-0 tracking-[-0.3px] w-full" data-name="Container">
      <Frame8 />
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame6() {
  const open = useLbOpen();
  return (
    <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame23 />
      <div
        className="aspect-[4096/2852] relative rounded-[16px] shrink-0 w-full cursor-pointer"
        data-name="image 326"
        onClick={() => open(imgImage326)}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage326} />
      </div>
      <Container />
    </div>
  );
}

function Frame26() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Compstack is an HRMS platform for the Moroccan market, combining payroll, employee records, time off, recruitment, expenses, reporting, and compliance.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">I joined after the client lost confidence in a previous design direction. The product had grown quickly, but without a consistent structure — patterns were fragmented, workflows felt disconnected, and screens had been designed in isolation.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">My role covered both admin-facing and employee-facing experiences.</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Overview</p>
      </div>
      <Frame26 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 text-[0px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Navigation didn't scale
            </span>
            {` — The structure reflected features rather than how HR teams actually work`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Workflows had friction
            </span>
            {` — Tasks like payroll and approvals lacked clear progression and feedback`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="3">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Information lacked hierarchy
            </span>
            {` — Data was present, but hard to scan and act on`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="4">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Experiences were misaligned
            </span>
            {` — Admin and employee flows felt like separate products`}
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[17px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Four issues consistently surfaced:</p>
      </div>
      <Frame34 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">The team couldn't move forward confidently</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Engineering lacked a reusable foundation to build from</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="flex flex-col gap-[10px] items-start relative shrink-0 text-[17px] w-full">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">This created two risks:</p>
      </div>
      <Frame36 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="flex flex-col gap-[12px] items-start relative shrink-0 tracking-[-0.5px] w-full">
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 text-[17px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The platform had strong functionality, but lacked coherence — and that made it feel unreliable.</p>
      </div>
      <Frame33 />
      <Frame35 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">The Problem</p>
      </div>
      <Frame32 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Frame37() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 text-[17px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">HRMS platforms are inherently complex — multiple user types, high-stakes actions, and interconnected workflows.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="text-[17px]">
          <span className="leading-[1.5]">{`The goal wasn't to fix individual screens, but to `}</span>
          <span className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
            create a unified system without oversimplifying the product.
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="text-[17px]">
          <span className="leading-[1.5]">{`With only six weeks and a large surface area, the work required prioritizing `}</span>
          <span className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
            structural changes with the highest cross-product impact.
          </span>
        </p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">The Challenge</p>
      </div>
      <Frame37 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Usability issues in HR software aren't cosmetic — they directly affect operations.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Unclear workflows can slow payroll, introduce approval errors, and create risk in employee management.</p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">For admins handling sensitive workflows</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">For employees using self-service features</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="3">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">For engineers building on a stable system</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">This project was ultimately about confidence:</p>
      </div>
      <Frame41 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="flex flex-col gap-[12px] items-start relative shrink-0 text-[17px] tracking-[-0.5px] w-full">
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Why It Mattered</p>
      </div>
      <Frame38 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Evaluating what existed</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Identifying where workflows broke down</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="3">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Understanding expectations from modern HRMS tools</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Without access to live users, I approached the problem from three angles:</p>
      </div>
      <Frame44 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="flex flex-col gap-[12px] items-start relative shrink-0 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Without access to live users, I approached the problem from three angles:</p>
      </div>
      <Frame43 />
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Methods included heuristic evaluation, competitive analysis (BambooHR, Rippling, Gusto, Deel, Workday), workflow mapping, and regular reviews with stakeholders and engineers.</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">{`Research & Insight`}</p>
      </div>
      <Frame42 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Frame45() {
  return (
    <div className="flex flex-col gap-[6px] items-start leading-[0] not-italic relative shrink-0 text-grey-9 text-[0px] tracking-[-0.5px] w-full">
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Structure over surface
            </span>
            {` — Fixing architecture would have more impact than refining UI`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              Overview and detail must coexist
            </span>
            {` — Users need summary and granular data at the same time`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="3">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              High-stakes actions need review states
            </span>
            {` — Speed alone isn't enough; verification is critical`}
          </li>
        </ol>
      </div>
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="4">
          <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
            {`Shared patterns multiply impact `}
            <span className="font-['Geist:Regular',sans-serif] font-normal tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>
              — Improving core components improves the entire system
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame16() {
  const open = useLbOpen();
  return (
    <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Key Insights</p>
      </div>
      <Frame45 />
      <div
        className="aspect-[1440/1180] relative shrink-0 w-full cursor-pointer"
        data-name="image 26"
        onClick={() => open(imgImage26)}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage26} />
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Dashboard</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Redesigned as a purposeful command center. Admins can now see what needs attention at a glance — pending approvals, payroll timing, onboarding activity — and move directly into the right workflow.</p>
      </div>
    </div>
  );
}

function Frame53() {
  return <div className="bg-accent relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame54() {
  return <div className="bg-grey-4 relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame55() {
  return <div className="bg-grey-4 relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame52() {
  return (
    <div className="flex gap-[8px] items-center relative shrink-0">
      <Frame53 />
      <Frame54 />
      <Frame55 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="flex gap-[20px] items-center relative shrink-0">
      <div className="bg-grey-3 flex items-center justify-center px-[16px] py-[8px] relative rounded-[999px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[12px]" data-name="ArrowLeft">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00029 7.50042">
              <path d={svgPaths.p253b3300} fill="var(--fill-0, #222222)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame52 />
      <div className="bg-grey-3 flex items-center justify-center px-[16px] py-[8px] relative rounded-[999px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[12px]" data-name="ArrowRight">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00029 7.50042">
              <path d={svgPaths.p16cdfaf0} fill="var(--fill-0, #222222)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  const open = useLbOpen();
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full">
      <div
        className="aspect-[4096/2852] relative rounded-[16px] shrink-0 w-full cursor-pointer"
        data-name="image 327"
        onClick={() => open(imgImage327)}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage327} />
      </div>
      <Frame51 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame49 />
      <Frame50 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[10px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Employee Management became the core area for understanding workforce information across onboarding, active employment, and offboarding.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The redesign gave this module stronger structure, clearer hierarchy, and more intentional operational actions. Because the work covered both admin-facing and employee-facing surfaces, I also considered how employee information should feel detailed and actionable for HR teams while remaining clear and approachable for employees interacting with their own records.</p>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Employee Management</p>
      </div>
      <Frame58 />
    </div>
  );
}

function Frame62() {
  return <div className="bg-accent relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame63() {
  return <div className="bg-grey-4 relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame64() {
  return <div className="bg-grey-4 relative rounded-[999px] shrink-0 size-[8px]" />;
}

function Frame61() {
  return (
    <div className="flex gap-[8px] items-center relative shrink-0">
      <Frame62 />
      <Frame63 />
      <Frame64 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="flex gap-[20px] items-center relative shrink-0">
      <div className="bg-grey-3 flex items-center justify-center px-[16px] py-[8px] relative rounded-[999px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[12px]" data-name="ArrowLeft">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00029 7.50042">
              <path d={svgPaths.p253b3300} fill="var(--fill-0, #222222)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame61 />
      <div className="bg-grey-3 flex items-center justify-center px-[16px] py-[8px] relative rounded-[999px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[12px]" data-name="ArrowRight">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00029 7.50042">
              <path d={svgPaths.p16cdfaf0} fill="var(--fill-0, #222222)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  const open = useLbOpen();
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full">
      <div
        className="aspect-[4096/2852] relative rounded-[16px] shrink-0 w-full cursor-pointer"
        data-name="image 328"
        onClick={() => open(imgImage328)}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage328} />
      </div>
      <Frame60 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame57 />
      <Frame59 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[10px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Redesigned payroll as a guided review workflow. Its role was to help teams prepare, verify, and run payroll with confidence. The flow prioritized understanding before action by making it easier to grasp totals, due dates, employee-level details, and compensation changes in a more structured way.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">This shifted payroll away from feeling like a raw data surface and toward feeling like a guided operational process.</p>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Payroll</p>
      </div>
      <Frame67 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="flex gap-[24px] items-center justify-center relative shrink-0 w-full">
      <div className="h-[508.291px] relative rounded-[16px] shrink-0 w-[730px]" data-name="image 328">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage328} />
      </div>
      <div className="h-[508.291px] relative rounded-[16px] shrink-0 w-[730px]" data-name="image 329">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage328} />
      </div>
      <div className="h-[508.291px] relative rounded-[16px] shrink-0 w-[730px]" data-name="image 330">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage328} />
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame66 />
      <Frame68 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[10px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Time Off needed to work for both sides of the product. For admins, the redesign improved visibility into leave requests, statuses, and team planning. For employees, it created a clearer path for requesting time off and understanding balances or approval status.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Bringing both perspectives into the same system helped the module feel more connected and practical.</p>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Time Off</p>
      </div>
      <Frame71 />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Frame69() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame70 />
      <Image2 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[10px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Clarified recruitment as a pipeline-management experience. Recruitment was repositioned around tracking progress and making decisions.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The redesign made it easier to understand openings, candidate stages, and hiring activity, especially when moving between role-level overviews and candidate-level detail. The goal was to make the flow easier to scan, interpret, and act on.</p>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Recruitment</p>
      </div>
      <Frame74 />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Frame72() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame73 />
      <Image3 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[10px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Beyond the platform's core operational areas, I also redesigned supporting modules including Documents, Expenses, Integrations, and Settings.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">I also worked across Documents, Expenses, Integrations, and Settings — supporting areas that were important to the product's completeness, but needed stronger structure and consistency to feel integrated into the overall system</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The redesign made these modules easier to navigate and manage by clarifying priorities, organizing information more intentionally, and aligning them with shared product patterns. This helped reduce fragmentation across the platform and reinforced a more scalable foundation for future growth.</p>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[32px] tracking-[-0.9px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Supporting Modules</p>
      </div>
      <Frame77 />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Image5() {
  return (
    <div className="h-[492px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Frame75() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame76 />
      <Image4 />
      <Image5 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="flex flex-col gap-[48px] items-start relative shrink-0 w-full">
      <Frame48 />
      <Frame56 />
      <Frame65 />
      <Frame69 />
      <Frame72 />
      <Frame75 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Instead of redesigning modules in isolation, I focused on shared patterns and consistent structures that could scale across the product.</p>
      </div>
      <Frame47 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">The Solution</p>
      </div>
      <Frame46 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-grey-9 w-full">
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="1">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Restore confidence in the product direction after a previously unsuccessful design phase</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="2">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Create a more buildable foundation for engineering through clearer, repeatable patterns</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="3">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Reduce inconsistency across modules, lowering the risk of fragmented implementation as the platform grows</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="4">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Improve clarity in high-stakes workflows where structure directly supports confidence and accuracy</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <ol className="list-decimal" start="5">
          <li className="ms-[25.5px]">
            <span className="leading-[1.5]">Align admin-facing and employee-facing experiences into a more cohesive product</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="flex flex-col font-['geist:Medium',sans-serif] gap-[10px] items-start relative shrink-0 w-full">
      <div className="flex flex-col justify-center relative shrink-0 text-grey-10 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The redesign helped the team:</p>
      </div>
      <Frame80 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="flex flex-col gap-[12px] items-start relative shrink-0 text-[17px] tracking-[-0.5px] w-full">
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">The product had not launched by handoff, so I focused outcomes on design and delivery impact rather than live metrics</p>
      </div>
      <Frame79 />
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">In practice, the work did more than improve the interface. It gave the team a clearer system to ship and a more scalable baseline for future modules.</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Outcome</p>
      </div>
      <Frame78 />
    </div>
  );
}

function ProcessScreenshot() {
  const open = useLbOpen();
  return (
    <FadeUp className="w-full">
      <img
        alt="Compstack dashboard screenshot"
        className="w-full h-auto rounded-[16px] block cursor-pointer"
        src={imgScreenshot20260506At0411221}
        onClick={() => open(imgScreenshot20260506At0411221)}
      />
    </FadeUp>
  );
}

function Frame30() {
  return (
    <div id="cs-content" className="flex flex-[1_0_0] flex-col gap-[40px] items-start min-w-px relative">
      {/* Project header — excluded from nav */}
      <FadeUp><Frame6 /></FadeUp>

      <div data-section><FadeUp><Frame7 /></FadeUp></div>
      <div data-section><FadeUp><Frame12 /></FadeUp></div>

      {/* Process image — no heading, not in nav */}
      <ProcessScreenshot />

      {/* Design System placeholder */}
      <FadeUp className="w-full">
        <div className="h-[492px] rounded-[24px] w-full bg-grey-4 flex items-center justify-center">
          <span className="text-grey-7 font-mono text-sm tracking-wider">Design System</span>
        </div>
      </FadeUp>

      <div data-section><FadeUp><Frame13 /></FadeUp></div>
      <div data-section><FadeUp><Frame14 /></FadeUp></div>
      <div data-section><FadeUp><Frame15 /></FadeUp></div>

      {/* Architecture placeholder */}
      <FadeUp className="w-full">
        <div className="h-[492px] rounded-[24px] w-full bg-grey-4 flex items-center justify-center">
          <span className="text-grey-7 font-mono text-sm tracking-wider">Architecture</span>
        </div>
      </FadeUp>

      <div data-section><FadeUp><Frame16 /></FadeUp></div>
      <div data-section><FadeUp><Frame17 /></FadeUp></div>
      <div data-section><FadeUp><Frame18 /></FadeUp></div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="flex gap-[80px] items-start justify-center relative shrink-0 w-full">
      <StickyNav />
      <Frame30 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center pb-[128px] pt-[64px] relative w-full max-w-[980px] mx-auto">
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  const [lbIndex, setLbIndex] = useState(-1);
  const realImages = [
    imgImage326,
    imgScreenshot20260506At0411221,
    imgImage26,
    imgImage327,
    imgImage328,
  ];

  const openLightbox = (src: string) => {
    const idx = realImages.indexOf(src);
    if (idx >= 0) setLbIndex(idx);
  };

  return (
    <LightboxContext.Provider value={openLightbox}>
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <SharedNavbar />
        <Frame11 />
        <SharedFooter />
        <Lightbox
          images={realImages}
          index={lbIndex}
          onClose={() => setLbIndex(-1)}
          onNext={() => setLbIndex((i) => (i + 1) % realImages.length)}
          onPrev={() => setLbIndex((i) => (i - 1 + realImages.length) % realImages.length)}
        />
      </div>
    </LightboxContext.Provider>
  );
}

export default function Frame20() {
  return (
    <div className="bg-canvas flex items-start justify-center relative min-h-screen w-full">
      <Frame19 />
    </div>
  );
}
