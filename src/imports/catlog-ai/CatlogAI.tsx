import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SharedNavbar from "../../app/components/SharedNavbar";
import SharedFooter from "../../app/components/SharedFooter";

// ─── FadeUp — identical to Compstack ─────────────────────────────────────────

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

// ─── StickyNav — identical logic to Compstack, prefix "ca-" ──────────────────

type NavItem = { id: string; label: string };

function slugify(text: string) {
  return "ca-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function StickyNav() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const container = document.getElementById("ca-content");
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
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[120px] flex flex-col gap-[8px] items-start shrink-0 w-[150px]" data-name="List">
      {navItems.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button key={id} onClick={() => scrollTo(id)} className="flex gap-[10px] items-center w-full text-left">
            <div
              className="h-px shrink-0 transition-all duration-200"
              style={{ width: isActive ? "24px" : "16px", backgroundColor: isActive ? "#222222" : "#ababab" }}
            />
            <span
              className="font-['geist:Regular',sans-serif] not-italic text-[15px] tracking-[-0.3px] whitespace-nowrap transition-colors duration-200"
              style={{ color: isActive ? "#222222" : "#7c7c7c", fontWeight: isActive ? 500 : 400, fontFeatureSettings: "'zero'" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Project header — mirrors Frame6 / Frame23 / Frame29 in Compstack ─────────

function StatusRow() {
  return (
    <div className="flex gap-[10px] items-center relative shrink-0">
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Product Design</p>
      </div>
      <div className="w-[4px] h-[4px] rounded-full bg-grey-5 shrink-0" />
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">iOS & Android</p>
      </div>
      <div className="w-[4px] h-[4px] rounded-full bg-grey-5 shrink-0" />
      <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-grey-9 text-[15px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">2025</p>
      </div>
    </div>
  );
}

function TitleBlock() {
  return (
    <div className="flex flex-col gap-[10px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[56px] text-black tracking-[-2px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.2]">Catlog AI Assistant</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 text-[18px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
        <p className="leading-[1.5]">Adding AI-powered conversation assistance to an existing social commerce platform — without undermining the trust-based relationships merchants depend on.</p>
      </div>
    </div>
  );
}

function BackAndTitle() {
  return (
    <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <a href="/" className="flex gap-[6px] items-center justify-center relative rounded-[999px] shrink-0 hover:opacity-70 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-charcoal text-[16px] tracking-[-0.3px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[24px]">Back</p>
        </div>
      </a>
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <StatusRow />
        <TitleBlock />
      </div>
    </div>
  );
}

function MetaRow() {
  return (
    <div className="flex gap-[40px] items-start leading-[0] not-italic relative shrink-0 tracking-[-0.3px] w-full">
      <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-[16px] whitespace-nowrap">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">My Role</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Lead Designer</p>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative text-[16px]">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Team</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-grey-9 w-[min-content]" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">1 PM · 3 Engineers</p>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative text-[16px]">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Timeline</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-grey-9 w-[min-content]" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">2 months (Mar–Apr 2025)</p>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative text-[16px]">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Status</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-grey-9 w-[min-content]" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Pre-launch</p>
        </div>
      </div>
    </div>
  );
}

function ProjectHeader() {
  return (
    <div className="flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <BackAndTitle />
      {/* Hero image — drop catlog-ai-hero.png into /public to replace placeholder */}
      <div className="aspect-[16/9] relative rounded-[16px] shrink-0 w-full overflow-hidden bg-grey-3">
        <img alt="Catlog AI Assistant hero" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src="catlog-ai-hero.png" />
      </div>
      <MetaRow />
    </div>
  );
}

// ─── ASSET: Platform strip ────────────────────────────────────────────────────

function PlatformStrip() {
  const modules = [
    { label: "Store", sub: "Products & store link" },
    { label: "Payments", sub: "Local & global" },
    { label: "Orders", sub: "Track & fulfil" },
    { label: "Analytics", sub: "Sales & records" },
    { label: "AI Assistant", sub: "This project", accent: true },
  ] as const;

  return (
    <div className="flex gap-[8px] items-stretch w-full">
      {modules.map((m) => (
        <div
          key={m.label}
          className={`flex flex-col gap-[4px] flex-1 rounded-[12px] px-[14px] py-[12px] border ${
            m.accent ? "border-accent/30 bg-accent/6" : "border-grey-3 bg-white"
          }`}
        >
          <div
            className={`flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-[14px] tracking-[-0.2px] whitespace-nowrap`}
            style={{ fontFeatureSettings: "'zero'" }}
          >
            <p className={`leading-[1.4] ${m.accent ? "text-accent" : "text-charcoal"}`}>{m.label}</p>
          </div>
          <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-7 text-[13px] tracking-[-0.2px]" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.4]">{m.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ASSET: Research findings ─────────────────────────────────────────────────

function ResearchFindings() {
  const findings = [
    { num: "01", title: "Repetition overload", stat: "~73% of messages", body: "Were variants of the same 4–5 questions. Answered manually, every time." },
    { num: "02", title: "Workflow fragmentation", stat: "5 apps per sale", body: "Instagram, spreadsheet, payment tool, and delivery app. None connected." },
    { num: "03", title: "Manual checkout", stat: "~18 back-and-forths", body: "Checkout happened entirely in messages before money moved." },
  ];

  return (
    <div className="flex gap-[12px] items-start w-full">
      {findings.map((f) => (
        <div key={f.num} className="flex flex-col gap-[12px] flex-1 rounded-[16px] border border-grey-3 bg-grey-2 px-[20px] py-[18px]">
          <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-6 text-[13px] tracking-[0.4px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5] uppercase">{f.num}</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-charcoal text-[16px] tracking-[-0.3px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
              <p className="leading-[1.3]">{f.title}</p>
            </div>
            <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-accent text-[15px] tracking-[-0.3px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
              <p className="leading-[1.4]">{f.stat}</p>
            </div>
          </div>
          <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-8 text-[15px] tracking-[-0.3px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ASSET: Interaction principles ───────────────────────────────────────────

function InteractionPrinciples() {
  const items = [
    { label: "One-handed & mid-task", body: "Merchants use Catlog on their phones while packing orders, at market, between deliveries. The interface had to match that reality." },
    { label: "Confidence stays invisible", body: "High confidence = AI responds silently. Lower = draft for review. The threshold determines the pattern; the merchant sees an action, not a number." },
    { label: "Structured over freeform", body: "Wherever a merchant would type something repetitive, a structured component replaces it. Forms pre-fill from conversation context." },
    { label: "Learning feedback loop", body: "Merchant actions teach the system. Answered handoffs extend the knowledge base. Corrected drafts refine responses for that merchant specifically." },
  ];

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {items.map((item, i) => (
        <div key={i} className="flex gap-[16px] items-start w-full rounded-[12px] border border-grey-3 bg-grey-2 px-[20px] py-[16px]">
          <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-6 text-[13px] tracking-[0.3px] whitespace-nowrap mt-[2px]" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">0{i + 1}</p>
          </div>
          <div className="flex flex-col gap-[4px] w-full">
            <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
              <p className="leading-[1.5]">{item.label}</p>
            </div>
            <div className="flex flex-col font-['geist:Regular',sans-serif] justify-center relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
              <p className="leading-[1.5]">{item.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Image placeholder — used for <!-- IMAGE: --> comments ────────────────────

function ImgPlaceholder({ src, alt, aspect = "16/9" }: { src: string; alt: string; aspect?: string }) {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full overflow-hidden bg-grey-3" style={{ aspectRatio: aspect }}>
      <img alt={alt} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={src} />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function SectionOverview() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Overview</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Catlog is a social commerce platform used by thousands of small businesses across Nigeria and Ghana — store pages, product catalog, payments, order tracking, invoicing, and customer records. Merchants create a store, share their link on Instagram, and manage everything that follows inside Catlog.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">By early 2025, the platform had strong tooling for what happens after a sale. What it hadn't addressed was the conversation layer where most sales begin — Instagram DMs. The AI Assistant was scoped as a new feature module to close that gap, sitting alongside the existing suite.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">The knowledge base needed to pull from Catlog's existing product catalog — not duplicate it. Checkout links sent in DMs needed to create real orders in the order management system. The feature had to feel native, not bolted on.</p>
        </div>
      </div>
      {/* ASSET: Platform strip */}
      <PlatformStrip />
    </div>
  );
}

function SectionWhyNow() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Why This, Why Now</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Catlog's product suite handled operations well — but operations begin after a customer decides to buy. For most merchants, that decision happens inside Instagram DMs through a conversation Catlog had no visibility into.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Competitors like Bumpa had integrated directly with Meta's DM infrastructure. Rather than replicate that, Catlog's direction was to go deeper: use AI to reduce the merchant workload inside that conversation layer, while preserving the human relationship.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="text-[17px]">
            <span className="leading-[1.5]">The strategic bet: </span>
            <span className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>don't replace the conversation — reduce the operational overhead it creates.</span>
            <span className="leading-[1.5]"> Automation in service of the merchant, not in place of them.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionResearch() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Research</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">3 weeks · Competitive analysis (Selar, Bumpa, Paystack Storefront) + contextual sessions · n=6 merchants. I went in expecting a speed problem. What I found was more structural.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">"I wake up to 80 messages every morning. By the time I've answered them all, it's afternoon and I haven't packed a single order." — Lagos fashion merchant, 6 months on Catlog</p>
        </div>
      </div>
      {/* ASSET: Research findings */}
      <ResearchFindings />
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="text-[17px]">
            <span className="leading-[1.5]">Key reframe: </span>
            <span className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>merchants didn't want conversations automated. They wanted operations automated.</span>
            <span className="leading-[1.5]"> That distinction reshaped the entire design direction.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionDesignTension() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Design Tension</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 text-[17px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Nigerian consumers look for signs of a real person behind the brand. A fully autonomous chatbot would answer faster but break the trust that makes social commerce work. This wasn't a UX preference — it was a business constraint.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[17px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">I considered and rejected two approaches:</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <ol className="list-decimal" start={1}>
            <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
              <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>Full chatbot automation</span>
              {" — too risky for a trust-sensitive market where a wrong answer damages the merchant's reputation directly, not just product UX."}
            </li>
          </ol>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <ol className="list-decimal" start={2}>
            <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
              <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>Meta DM integration (Bumpa-style)</span>
              {" — replicating a competitor's approach without a differentiated angle."}
            </li>
          </ol>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="text-[17px]">
            <span className="leading-[1.5]">The direction became: </span>
            <span className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>useful automation with visible merchant control.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionSolution() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">The Solution</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Each research finding mapped to a distinct problem space. The solution addressed all three — integrated with Catlog's existing infrastructure rather than operating alongside it independently.</p>
        </div>
      </div>

      {/* 01 — Onboarding */}
      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">01 — Onboarding: Setup from what already exists</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">Rather than forcing merchants to build a knowledge base from scratch — a guaranteed abandonment point — the system analyses 6 months of existing Instagram content to pre-fill at 70–80% accuracy. Merchants review and correct, not create.</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">The knowledge base maps directly to Catlog's existing product catalog. Post-to-product matching handles how customers actually reference items — "the black dress from Tuesday," not SKU-1847.</p>
          </div>
        </div>
        <ImgPlaceholder src="catlog-onboarding-review.png" alt="Knowledge base review screen" aspect="16/10" />
      </div>

      {/* 02 — Unified chat */}
      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">02 — Unified chat: Commerce actions inside the conversation</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">Quick Actions — product cards, checkout links, invoices, payment requests, delivery forms — are insertable directly from within a DM thread. They pull from the merchant's live Catlog catalog and pre-fill from conversation context.</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">A checkout link sent in DMs creates a real order in Catlog's order management system — not a separate record the merchant has to reconcile. The 5-app switching workflow collapses into one surface.</p>
          </div>
        </div>
        <ImgPlaceholder src="catlog-chat-quickactions.png" alt="Unified chat thread with Quick Actions" aspect="16/10" />
      </div>

      {/* 03 — AI Assistant */}
      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        <div className="flex flex-col font-['geist:Medium',sans-serif] justify-center relative shrink-0 text-grey-10 text-[17px] tracking-[-0.5px] w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">03 — AI Assistant: Assisted responses, not automated conversations</p>
        </div>
        <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">The assistant handles text, images, voice notes, and shared Instagram posts. Designing for text-only would have left most real conversations unhandled.</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <p className="leading-[1.5]">Because customers never know they're talking to AI, a wrong answer isn't an AI error — it's the merchant giving wrong information. That constraint transformed the fallback system from edge case handling into the project's trust architecture.</p>
          </div>
        </div>
        <ImgPlaceholder src="catlog-input-types.png" alt="Input types — text, images, voice notes, Instagram posts" aspect="16/10" />
      </div>
    </div>
  );
}

function SectionCoreDecision() {
  const rows = [
    { scenario: "Auto-respond", confidence: "High ≥75%", trigger: "Known FAQ or confirmed product", experience: "Sent automatically. Merchant notified in summary." },
    { scenario: "Suggest draft", confidence: "Mid 40–74%", trigger: "Partial match — product recognised, spec ambiguous", experience: "Draft surfaced. One tap to send or edit." },
    { scenario: "Merchant input", confidence: "Low <40%", trigger: "Product spec missing from knowledge base", experience: "Flagged with full thread context." },
    { scenario: "Full takeover", confidence: "Manual", trigger: "Complaint, refund, custom order, or sensitive conversation", experience: "AI steps back. Merchant takes full control." },
  ];

  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Core Decision</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">I initially scoped fallbacks as the "error handling" section. As I worked through the implications of invisible AI — where every mistake reads as merchant error, not product error — the framing shifted entirely. The confidence model became the trust foundation the whole feature stands on.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">The thresholds balance two competing risks: too much automation damages trust; too many review prompts make the assistant feel useless.</p>
        </div>
      </div>

      {/* Confidence table */}
      <div className="w-full rounded-[12px] overflow-hidden border border-grey-3 leading-[0] not-italic">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-grey-3 bg-grey-2">
              {["Scenario", "Confidence", "Trigger", "Merchant experience"].map((h) => (
                <th key={h} className="text-left px-[14px] py-[10px] font-['geist:Medium',sans-serif] text-grey-8 text-[14px] tracking-[-0.2px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-grey-3 last:border-0 bg-white">
                <td className="px-[14px] py-[12px] font-['geist:Medium',sans-serif] text-charcoal text-[14px] tracking-[-0.2px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>{r.scenario}</td>
                <td className="px-[14px] py-[12px] font-['geist:Regular',sans-serif] text-grey-8 text-[14px] tracking-[-0.2px] whitespace-nowrap" style={{ fontFeatureSettings: "'zero'" }}>{r.confidence}</td>
                <td className="px-[14px] py-[12px] font-['geist:Regular',sans-serif] text-grey-8 text-[14px] tracking-[-0.2px]" style={{ fontFeatureSettings: "'zero'" }}>{r.trigger}</td>
                <td className="px-[14px] py-[12px] font-['geist:Regular',sans-serif] text-grey-8 text-[14px] tracking-[-0.2px]" style={{ fontFeatureSettings: "'zero'" }}>{r.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">The fallback system gets smarter with use. Every Scenario 1 handoff — where the merchant answers a question the AI couldn't — adds to the knowledge base. Over time, the AI needs fewer handoffs per merchant. Autonomy is earned gradually, the same way a new employee earns it.</p>
        </div>
      </div>

      <div className="flex gap-[12px] w-full">
        <ImgPlaceholder src="catlog-fallback-scenario1.png" alt="Fallback handoff screen — Scenario 1" aspect="9/16" />
        <ImgPlaceholder src="catlog-fallback-takeover.png" alt="AI takeover screen — Scenario 4" aspect="9/16" />
      </div>
    </div>
  );
}

function SectionInteractionSystem() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Interaction System</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">Four message types — customer, merchant, AI auto-reply, and system/fallback notifications — each visually distinct so the state of any thread is readable at a glance.</p>
        </div>
      </div>
      <ImgPlaceholder src="catlog-message-types.png" alt="Message type system" aspect="16/9" />
      {/* ASSET: Interaction principles */}
      <InteractionPrinciples />
    </div>
  );
}

function SectionReflection() {
  const points = [
    { bold: "Setup should start from what merchants already have.", body: "The blank form is the enemy of adoption — and in this case, Catlog's existing catalog was the asset to build on." },
    { bold: "Automation should reduce operational burden, not impersonate the merchant.", body: "The customer relationship is not the thing to automate." },
    { bold: "Fallbacks are a feature, not a failure state.", body: "Merchants trust a system that knows its limits more than one that always has an answer." },
    { bold: "Confidence should stay invisible to the merchant.", body: "The threshold determines the interaction pattern — the merchant sees an action, not a number." },
    { bold: "The feature compounds over time.", body: "Every handoff improves the knowledge base. The AI earns autonomy gradually — the same way trust is earned in any relationship." },
  ];

  return (
    <div className="flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['instrument_serif:Medium',sans-serif] justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-[1.2]">Reflection</p>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-grey-9 text-[17px] tracking-[-0.5px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
          <p className="leading-[1.5]">The biggest shift in this project wasn't a design decision — it was a framing one. Treating the AI assistant as a module inside Catlog (not a standalone product) changed what "done" meant. Integration with the existing catalog, order system, and product infrastructure wasn't a nice-to-have — it was what separated a useful feature from a redundant one.</p>
        </div>
      </div>
      <div className="flex flex-col font-['geist:Regular',sans-serif] gap-[6px] items-start relative shrink-0 text-grey-9 text-[0px] w-full">
        {points.map((p, i) => (
          <div key={i} className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontFeatureSettings: "'zero'" }}>
            <ol className="list-decimal" start={i + 1}>
              <li className="leading-[1.5] ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[17px]">
                <span className="font-['Geist:Medium',sans-serif] font-medium tracking-[-0.5px]" style={{ fontFeatureSettings: "'zero'" }}>{p.bold}</span>
                {" "}{p.body}
              </li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Content column ───────────────────────────────────────────────────────────

function ContentColumn() {
  return (
    <div id="ca-content" className="flex flex-[1_0_0] flex-col gap-[40px] items-start min-w-px relative">
      <FadeUp className="w-full"><ProjectHeader /></FadeUp>

      <div data-section className="w-full"><FadeUp className="w-full"><SectionOverview /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionWhyNow /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionResearch /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionDesignTension /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionSolution /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionCoreDecision /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionInteractionSystem /></FadeUp></div>
      <div data-section className="w-full"><FadeUp className="w-full"><SectionReflection /></FadeUp></div>
    </div>
  );
}

// ─── Root export — mirrors Frame20 / Frame19 / Frame11 / Frame31 ──────────────

export default function CatlogAI() {
  return (
    <div className="bg-canvas flex items-start justify-center relative min-h-screen w-full">
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <SharedNavbar />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center size-full">
            <div className="flex flex-col items-center justify-center pb-[128px] pt-[64px] relative w-full max-w-[980px] mx-auto">
              <div className="flex gap-[80px] items-start justify-center relative shrink-0 w-full">
                <StickyNav />
                <ContentColumn />
              </div>
            </div>
          </div>
        </div>
        <SharedFooter />
      </div>
    </div>
  );
}
