import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SharedNavbar from "../components/SharedNavbar";
import SharedFooter from "../components/SharedFooter";

import imgHero from "../../imports/Frame427321900-1/cbe6561e4e5045f88b8011359f61774c5d1d84d8.png";
import imgOnboarding from "../../imports/Frame427321900-1/2b90cef839ed3fe33c8744d975f07ac758f5a7b8.png";
import imgChat from "../../imports/Frame427321900-1/b2f1e0ac5389c908871a9a20b6778a4baf96b01f.png";
import imgFallback from "../../imports/Frame427321895/d597c2ea7c26c703ee1e731fa5ee054775925887.png";
import imgVisual from "../../imports/Frame427321895/f48cf34c09e6292bd52a7a80ea81ec16af4fe4ee.png";

const TOC = [
  "Situation",
  "Problem",
  "Design Direction",
  "What We Built",
  "Fallback System",
  "Visual System",
  "Results",
  "Reflection",
];

function StatusDot({ size = 8 }: { size?: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span className="absolute inset-[18.75%] rounded-full border border-accent/40" />
      <span className="absolute inset-[31.25%] rounded-full bg-accent" />
    </span>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-[36px] tracking-[-0.72px] leading-[1.2] text-black">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[32px] tracking-[-0.9px] leading-[1.2] text-charcoal">
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5] w-full">
      {children}
    </p>
  );
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="font-medium">{children}</span>;
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[var(--lg)] items-stretch w-full">
      <div className="w-[3px] rounded-full bg-accent/30 shrink-0" />
      <p className="font-display text-[22px] tracking-[-0.5px] leading-[1.4] text-charcoal italic">
        {children}
      </p>
    </div>
  );
}

function ImageBlock({ src, alt, ratio = "4096/2852" }: { src: string; alt: string; ratio?: string }) {
  return (
    <div
      className="relative rounded-[var(--lg)] w-full overflow-hidden"
      style={{ aspectRatio: ratio }}
    >
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}

function TallImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}

function StatCard({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <div className="flex-1 flex flex-col gap-[var(--xs)] items-start p-[var(--2xl)] rounded-[var(--lg)] bg-white min-w-0">
      <span className="font-display text-[40px] tracking-[-1.5px] leading-[1.1] text-black">{value}</span>
      <span className="font-sans font-medium text-grey-10 text-[15px] tracking-[-0.3px] leading-[1.4]">{label}</span>
      {sublabel && (
        <span className="text-grey-8 text-[14px] tracking-[-0.2px] leading-[1.5]">{sublabel}</span>
      )}
    </div>
  );
}

function ConfidenceRow({
  scenario,
  confidence,
  trigger,
  merchantSees,
  accent,
}: {
  scenario: string;
  confidence: string;
  trigger: string;
  merchantSees: string;
  accent: string;
}) {
  return (
    <div className="flex gap-[var(--lg)] items-start p-[var(--xl)] rounded-[var(--reg)] bg-white w-full">
      <div className="flex flex-col gap-[var(--3xs)] items-start shrink-0 w-[140px]">
        <div className="flex gap-[var(--xs)] items-center">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
          <span className="font-sans font-medium text-grey-10 text-[15px] tracking-[-0.3px] leading-[1.4]">
            {scenario}
          </span>
        </div>
        <span className="text-grey-8 text-[13px] tracking-[-0.2px] leading-[1.5] pl-4">{confidence}</span>
      </div>
      <div className="flex-1 flex flex-col gap-[var(--3xs)] min-w-0">
        <span className="text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">{trigger}</span>
        <span className="text-grey-8 text-[13px] tracking-[-0.2px] leading-[1.5]">{merchantSees}</span>
      </div>
    </div>
  );
}

function MetricRow({ label, before, target }: { label: string; before: string; target: string }) {
  return (
    <div className="flex items-center gap-[var(--lg)] py-[var(--lg)] border-b border-grey-4/50 last:border-0 w-full">
      <span className="flex-1 font-sans font-medium text-grey-10 text-[15px] tracking-[-0.3px] leading-[1.5] min-w-0">
        {label}
      </span>
      <span className="text-grey-8 text-[15px] tracking-[-0.3px] leading-[1.5] w-[140px] text-right">{before}</span>
      <svg className="w-4 h-4 shrink-0 text-grey-7" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans font-medium text-accent text-[15px] tracking-[-0.3px] leading-[1.5] w-[140px] text-right">
        {target}
      </span>
    </div>
  );
}

function StickyTOC({ items, activeId }: { items: string[]; activeId: string }) {
  return (
    <aside className="flex flex-col gap-[var(--xs)] items-start w-[150px] sticky top-8 self-start">
      {items.map((item) => {
        const slug = item.toLowerCase().replace(/\s+/g, "-");
        const active = slug === activeId;
        return (
          <a
            key={item}
            href={`#${slug}`}
            className="flex gap-[var(--sm)] items-center w-full"
          >
            <div
              className={`h-px transition-all duration-200 ${active ? "bg-charcoal w-6" : "bg-grey-7 w-4"}`}
            />
            <span
              className={`text-[15px] tracking-[-0.3px] leading-6 transition-colors duration-200 ${
                active ? "text-charcoal" : "text-grey-8"
              }`}
            >
              {item}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

export default function CatlogAIProjectPage() {
  const [activeId, setActiveId] = useState(TOC[0].toLowerCase().replace(/\s+/g, "-"));

  useEffect(() => {
    const slugs = TOC.map((t) => t.toLowerCase().replace(/\s+/g, "-"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    slugs.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-canvas flex items-center w-full min-h-screen">
      <div className="flex flex-col items-start w-[1440px] mx-auto">
        <SharedNavbar />

        <main className="flex flex-col items-center justify-center pb-[128px] pt-[var(--6xl)] px-[240px] w-full">
          <div className="flex gap-[var(--7xl)] items-start justify-center w-full">
            <StickyTOC items={TOC} activeId={activeId} />

            <article className="flex flex-1 flex-col gap-[var(--4xl)] items-start min-w-0">
              {/* Header */}
              <motion.div
                className="flex flex-col gap-[var(--3xl)] items-start w-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  to="/works"
                  className="flex gap-[var(--2xs)] items-center justify-center rounded-[var(--full-radius)] hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M11 5L7 9.5l4 4.5M7.5 9.5h7"
                      stroke="#222"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-sans font-medium text-charcoal text-[16px] tracking-[-0.3px] leading-6">
                    Back
                  </span>
                </Link>

                <div className="flex flex-col w-full">
                  <div className="flex gap-[var(--sm)] items-center">
                    <span className="font-sans font-medium text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">
                      Product Design
                    </span>
                    <StatusDot />
                    <span className="font-sans font-medium text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">
                      iOS &amp; Android
                    </span>
                    <StatusDot />
                    <span className="font-sans font-medium text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">
                      2025
                    </span>
                  </div>
                  <div className="flex flex-col gap-[var(--sm)] items-start w-full">
                    <h1 className="font-display text-[56px] tracking-[-2px] leading-[1.2] text-black">
                      Catlog AI Assistant
                    </h1>
                    <p className="text-grey-9 text-[18px] tracking-[-0.5px] leading-[1.5] w-full">
                      Turning DM volume into a design problem — reducing the operational
                      burden of social commerce without making it feel less human
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hero image */}
              <ImageBlock src={imgHero} alt="Catlog AI Assistant" />

              {/* Meta strip */}
              <div className="flex gap-[var(--4xl)] items-start w-full">
                <div className="flex flex-col gap-[var(--2xs)] items-start">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">My Role</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">Lead Designer</p>
                </div>
                <div className="flex flex-1 flex-col gap-[var(--2xs)] items-start min-w-0">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">Team</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">
                    1 PM, 3 Engineers
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[var(--2xs)] items-start min-w-0">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">Timeline</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">
                    2 months <span className="text-grey-9/70">(Mar–Apr 2025)</span>
                  </p>
                </div>
                <div className="flex flex-col gap-[var(--2xs)] items-start">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">Status</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">Pre-launch</p>
                </div>
              </div>

              {/* ── Situation ── */}
              <section id="situation" className="flex flex-col gap-[16px] w-full">
                <H2>Situation</H2>
                <div className="flex flex-col gap-[var(--xs)] w-full">
                  <Body>
                    Catlog is a social commerce platform built for African small businesses — the kind that sell
                    primarily through Instagram before they ever build a website. Merchants get a product catalog,
                    storefront link, payment tools, order tracking, and invoicing, all in one place.
                  </Body>
                  <Body>
                    By early 2025, Catlog had solid coverage of what happens after a sale. What it hadn't touched
                    was where most sales actually begin — the DM thread.
                  </Body>
                  <Body>
                    Buyers never interact with Catlog at all. From their side, it looks exactly like a normal
                    Instagram DM conversation. The merchant is the only one with access to the app. Any AI feature
                    we built would be a merchant-side tool — an invisible capability that makes the merchant faster
                    and smarter, while the buyer experiences nothing but a natural, human conversation.
                  </Body>
                </div>
              </section>

              {/* ── Problem ── */}
              <section id="problem" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Understanding the Problem</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                      What the research showed
                    </p>
                    <Body>
                      With a 2-month timeline and a small team, we didn't run a formal research programme. I combined
                      secondary research — existing literature on social commerce behaviour in West Africa, competitive
                      analysis, and publicly available data on Instagram commerce patterns — with informal conversations
                      with merchants who sell on Instagram.
                    </Body>
                  </div>

                  {/* Research stats */}
                  <div className="flex gap-[var(--lg)] items-stretch w-full">
                    <StatCard value="~70%" label="DM volume was repeat questions" sublabel="Price, availability, sizing, delivery" />
                    <StatCard value="5+" label="Tools switched per sale" sublabel="Instagram, spreadsheets, payment, delivery, orders" />
                    <StatCard value="15–20" label="Messages to checkout" sublabel="From 'I'm interested' to 'payment sent'" />
                  </div>

                  <Body>
                    Merchants running higher-volume accounts described spending the majority of their morning just
                    clearing DMs before they could start fulfilling orders.
                  </Body>
                </div>
              </section>

              <TallImage src={imgOnboarding} alt="Research synthesis" />

              {/* The reframe */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>The Reframe</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    The brief coming in was about automation — give merchants a way to reply faster. But the research
                    kept pointing somewhere else. The problem wasn't that replies were slow. It was that the entire
                    operational workflow surrounding each conversation was fragmented, manual, and exhausting.
                  </Body>

                  <Blockquote>
                    How might we reduce the operational burden of social commerce without making it feel less human?
                  </Blockquote>

                  <Body>
                    Social commerce in Nigeria runs on trust. Buyers aren't transacting with a brand — they're
                    transacting with a person. The DM thread is where that trust is built and tested. A merchant who
                    starts sounding automated erodes exactly the thing that was making the business work.
                  </Body>

                  <Blockquote>
                    Merchants didn't want their conversations automated. They wanted their operations automated.
                  </Blockquote>

                  <Body>That distinction reshaped every decision that followed.</Body>
                </div>
              </section>

              {/* ── Design Direction ── */}
              <section id="design-direction" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Defining the Design Direction</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    Once the reframe was clear, I mapped the research findings to distinct problem spaces rather
                    than jumping straight to solutions. Three kept surfacing as the most structurally significant:
                  </Body>

                  {/* Problem space cards */}
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    {[
                      {
                        title: "Repetition",
                        desc: "Most DM volume was low-value repeated questions. The merchant was the bottleneck, not because they were slow, but because they were the only one who could answer.",
                        response: "Needed intelligence",
                      },
                      {
                        title: "Fragmentation",
                        desc: "The workflow around a sale was spread across too many tools. Each context switch added friction and increased the chance of errors or dropped conversations.",
                        response: "Needed integration",
                      },
                      {
                        title: "Checkout",
                        desc: "There was no structured path from interest to payment. It was improvised through messages every single time.",
                        response: "Needed structure",
                      },
                    ].map((ps) => (
                      <div key={ps.title} className="flex gap-[var(--xl)] items-start p-[var(--2xl)] rounded-[var(--lg)] bg-white w-full">
                        <div className="flex flex-col gap-[var(--xs)] flex-1 min-w-0">
                          <span className="font-sans font-medium text-black text-[17px] tracking-[-0.5px] leading-[1.5]">
                            {ps.title}
                          </span>
                          <span className="text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">{ps.desc}</span>
                        </div>
                        <span className="font-sans font-medium text-accent text-[13px] tracking-[-0.2px] leading-[1.5] shrink-0 mt-0.5">
                          {ps.response}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                      The design tension
                    </p>
                    <Body>
                      Because buyers never know they're interacting with an AI-assisted merchant, every response
                      carries the merchant's name on it. A wrong answer isn't an AI mistake — it's the merchant
                      giving wrong information. That raised the stakes considerably. The AI couldn't just be optimised
                      for coverage — it had to be optimised for knowing when{" "}
                      <Emphasis>not</Emphasis> to respond.
                    </Body>
                  </div>
                </div>
              </section>

              {/* ── What We Built ── */}
              <section id="what-we-built" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>What We Built</H2>
                <div className="flex flex-col gap-[var(--2xl)] w-full">
                  <Body>
                    Three targeted responses to three distinct root causes — not three arbitrary features,
                    but a unified system designed to work together.
                  </Body>

                  <div className="flex flex-col gap-[var(--5xl)] w-full">
                    {/* 01 · Intelligent Onboarding */}
                    <div className="flex flex-col gap-[var(--2xl)] items-start w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <div className="flex gap-[var(--sm)] items-center">
                          <span className="font-mono font-medium text-accent text-[13px] tracking-[0.5px]">01</span>
                          <H3>Intelligent Onboarding</H3>
                        </div>
                        <div className="flex flex-col gap-[var(--sm)] w-full">
                          <Body>
                            Getting merchants to manually build an AI knowledge base from scratch was never going to
                            work — the upfront cost would cause abandonment before the feature proved any value.
                          </Body>
                          <Body>
                            We inverted the model. The system analyses the merchant's existing Instagram posts, captions,
                            and message patterns to pre-fill the knowledge base — pricing, delivery policies, common
                            questions, product details — at an estimated 70–80% accuracy. Merchants review and correct
                            what's there. They're not creating, they're curating.
                          </Body>
                          <Body>
                            The knowledge base also maps directly to the merchant's existing Catlog product catalog.
                            Because customers rarely refer to products by catalog-style names — they say "the black dress
                            from Tuesday," not SKU-1847 — post-to-product matching handles Instagram-native references.
                          </Body>
                        </div>
                      </div>
                      <ImageBlock src={imgOnboarding} alt="Knowledge base review screen" />
                    </div>

                    {/* 02 · Unified Chat Interface */}
                    <div className="flex flex-col gap-[var(--2xl)] items-start w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <div className="flex gap-[var(--sm)] items-center">
                          <span className="font-mono font-medium text-accent text-[13px] tracking-[0.5px]">02</span>
                          <H3>Unified Chat Interface</H3>
                        </div>
                        <div className="flex flex-col gap-[var(--sm)] w-full">
                          <Body>
                            From the merchant's side, the chat interface is where day-to-day work happens. Buyers see
                            a DM thread. Merchants see a thread plus a full set of commerce tools they can trigger
                            without leaving the conversation.
                          </Body>
                          <Body>
                            Quick Actions — product cards, checkout links, invoices, payment requests, delivery forms —
                            are accessible directly from within the thread. They pull from the live Catlog catalog and
                            pre-fill from conversation context. If the buyer mentioned a size 12 and said they're in
                            Lagos Island, the checkout link knows that already.
                          </Body>
                          <Body>
                            When a merchant sends a checkout link, it creates a real order inside Catlog's order management
                            system. The sale is captured and tracked from the moment the link is sent. No reconciliation.
                            No double-entry. The 5-app workflow becomes one surface.
                          </Body>
                        </div>
                      </div>
                      <ImageBlock src={imgChat} alt="Merchant chat interface" />
                    </div>

                    {/* 03 · AI Assistant */}
                    <div className="flex flex-col gap-[var(--2xl)] items-start w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <div className="flex gap-[var(--sm)] items-center">
                          <span className="font-mono font-medium text-accent text-[13px] tracking-[0.5px]">03</span>
                          <H3>AI Assistant</H3>
                        </div>
                        <div className="flex flex-col gap-[var(--sm)] w-full">
                          <Body>
                            The assistant works across the input types buyers actually use: text, images, voice notes,
                            forwarded posts. "How much is this one?" sent alongside a forwarded Instagram post is a real
                            and common query pattern. Designing only for clean text input would have left most real
                            conversations unhandled.
                          </Body>
                          <Body>
                            What the assistant does with those inputs depends on how confident it is — and that's where
                            most of the design thinking in this project lives.
                          </Body>
                        </div>
                      </div>
                      {/* Input types strip */}
                      <div className="flex gap-[var(--sm)] w-full">
                        {[
                          { icon: "Aa", label: "Text" },
                          { icon: "◻", label: "Image" },
                          { icon: "◉", label: "Voice" },
                          { icon: "↗", label: "Shared Post" },
                        ].map((t) => (
                          <div key={t.label} className="flex-1 flex flex-col gap-[var(--xs)] items-center p-[var(--xl)] rounded-[var(--lg)] bg-white">
                            <span className="font-mono text-[20px] text-grey-7">{t.icon}</span>
                            <span className="font-sans font-medium text-grey-10 text-[14px] tracking-[-0.2px]">{t.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Fallback System ── */}
              <section id="fallback-system" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>The Fallback System</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    The most important design decision
                  </p>
                  <Body>
                    When I first scoped this project, fallbacks were the last section — error handling. By the time
                    I finished, they were the foundation everything else stood on.
                  </Body>
                  <Body>
                    Because buyers never know there's an AI involved, the system's ability to recognise the limits of
                    its own knowledge is just as important as its ability to respond correctly. A confident wrong answer
                    causes real damage — to the buyer's trust in the merchant, and to the merchant's reputation.
                  </Body>

                  {/* Confidence model */}
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                      The confidence model
                    </p>
                    <div className="flex flex-col gap-[var(--xs)] w-full rounded-[var(--lg)] bg-grey-3/40 p-[var(--lg)]">
                      <ConfidenceRow
                        scenario="Auto-respond"
                        confidence="≥ 75%"
                        trigger="Known FAQ, product confirmed in knowledge base"
                        merchantSees="Response sent. Merchant notified in a summary, not in real time."
                        accent="#22c55e"
                      />
                      <ConfidenceRow
                        scenario="Suggest draft"
                        confidence="40–74%"
                        trigger="Partial match — product recognised, detail ambiguous"
                        merchantSees="Draft shown for review. One tap to send or edit."
                        accent="#E96B24"
                      />
                      <ConfidenceRow
                        scenario="Merchant input"
                        confidence="< 40%"
                        trigger="Spec missing, question outside the knowledge base"
                        merchantSees="Flagged with full context. Merchant answers directly."
                        accent="#f59e0b"
                      />
                      <ConfidenceRow
                        scenario="Full takeover"
                        confidence="Manual"
                        trigger="Complaint, refund, sensitive or high-value conversation"
                        merchantSees="AI steps back entirely. Merchant takes over with full thread history."
                        accent="#ef4444"
                      />
                    </div>
                  </div>

                  <Body>
                    The thresholds — 75% for auto-respond, 40% for merchant input — were a starting hypothesis
                    informed by internal discussion and existing approaches to human-in-the-loop AI systems. Set to
                    be validated and adjusted post-launch based on real merchant behaviour.
                  </Body>
                </div>
              </section>

              <TallImage src={imgFallback} alt="Fallback system states" />

              {/* Why it gets better */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Why It Gets Better Over Time</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    Every time a merchant answers a flagged question, that answer can be added to the knowledge base.
                    The same question won't surface again. Over time, the AI learns each merchant's specific
                    business — their products, their policies, their language — and needs fewer handoffs as a result.
                  </Body>
                  <Body>Autonomy is earned gradually. The same way trust is built in any working relationship.</Body>

                  <Blockquote>
                    In merchant feedback sessions, the fallback system — not the auto-reply — was what made the AI
                    feel trustworthy. Knowing it would pause and check, rather than answer confidently and wrongly,
                    was what made merchants comfortable turning it on.
                  </Blockquote>
                </div>
              </section>

              {/* ── Visual System ── */}
              <section id="visual-system" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Visual &amp; Interaction System</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    The interface was designed entirely for the merchant — mobile-first, one-handed, built for someone
                    mid-task. Merchants use Catlog while packing orders, at the market, between deliveries.
                  </Body>

                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Four message types</Emphasis> give the thread a clear visual language — buyer messages,
                        merchant replies, AI auto-replies, and system notifications. Each is visually distinct.
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Confidence stays invisible</Emphasis> — the merchant never sees a percentage. High
                        confidence means the AI responded and they're notified later. Lower confidence means a draft
                        appears. Low means a handoff card.
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Structured over freeform</Emphasis> — wherever a merchant would otherwise type something
                        repetitive, a structured component replaces it. Forms pre-fill from conversation context.
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>The interface learns</Emphasis> — merchant actions feed back into the system. Answered
                        handoffs extend the knowledge base. The product gets more useful the more it's used.
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <ImageBlock src={imgVisual} alt="Message type system" />

              {/* ── Results ── */}
              <section id="results" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Results</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    The feature was in active development at the time of writing. These targets were defined based
                    on research baselines and merchant feedback — not post-launch measurement.
                  </Body>

                  {/* Metrics table */}
                  <div className="flex flex-col w-full rounded-[var(--lg)] bg-white p-[var(--2xl)]">
                    <div className="flex items-center gap-[var(--lg)] pb-[var(--reg)] border-b border-grey-4 mb-[var(--xs)] w-full">
                      <span className="flex-1 font-sans font-medium text-grey-8 text-[13px] tracking-[-0.2px] uppercase">Metric</span>
                      <span className="font-sans font-medium text-grey-8 text-[13px] tracking-[-0.2px] uppercase w-[140px] text-right">Before</span>
                      <span className="w-4" />
                      <span className="font-sans font-medium text-grey-8 text-[13px] tracking-[-0.2px] uppercase w-[140px] text-right">Target</span>
                    </div>
                    <MetricRow label="Time spent on repeat DMs" before="~3–4 hrs/day" target="< 30 mins/day" />
                    <MetricRow label="Tools switched per sale" before="5+" target="1 (Catlog)" />
                    <MetricRow label="Messages to checkout" before="~15–20" target="< 6" />
                    <MetricRow label="Knowledge base setup time" before="N/A" target="< 15 mins" />
                  </div>

                  <Body>
                    Beyond the merchant-side targets, this feature gives Catlog something it didn't have before:
                    visibility into the conversation layer where purchasing decisions actually happen. For the first
                    time, the platform has a presence at the top of the funnel — not just at the point of fulfilment.
                  </Body>
                </div>
              </section>

              {/* ── Reflection ── */}
              <section id="reflection" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Reflection</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>Three things stayed with me from this project.</Body>
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <ol className="flex flex-col gap-[var(--reg)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>The reframe was the actual design work.</Emphasis> "Operations, not conversations"
                        sounds obvious in hindsight. Getting there required sitting with research long enough to
                        question the original brief — and being willing to redirect the project before a single screen
                        was designed.
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Designing for invisible capability is a different kind of problem.</Emphasis> The
                        merchant's tooling never surfaces to the buyer. That means the quality of the merchant's
                        experience is what determines the quality of the buyer's experience — indirectly, invisibly,
                        every time.
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>The fallback system is a product strategy, not a safety net.</Emphasis> I came into
                        this treating fallbacks as error handling. I left it understanding them as the mechanism through
                        which the product earns trust — and the mechanism through which it gets smarter over time.
                      </li>
                    </ol>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </main>

        <SharedFooter />
      </div>
    </div>
  );
}
