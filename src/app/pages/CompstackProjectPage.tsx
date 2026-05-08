import { Link } from "react-router-dom";
import SharedNavbar from "../components/SharedNavbar";
import SharedFooter from "../components/SharedFooter";

// NOTE: Figma asset URLs expire ~7 days. Replace with local files when available.
const A = {
  hero: "https://www.figma.com/api/mcp/asset/18f33558-d76e-4e6f-aa95-f0d504d9332c",
  screenshot: "https://www.figma.com/api/mcp/asset/eebcaa6c-3beb-4b76-8a2e-76901ca15f9c",
  generic: "https://www.figma.com/api/mcp/asset/1a5ea9ee-f333-409b-ae04-fe201bcb3ad8",
  insights: "https://www.figma.com/api/mcp/asset/eb47abcf-fd7f-4743-8d5c-8056299ae2ff",
  dashboard: "https://www.figma.com/api/mcp/asset/60ff1880-ba61-4b39-ba85-d82425f271f1",
  employees: "https://www.figma.com/api/mcp/asset/d12de125-3bac-4749-8d43-7164156fdf22",
};

const TOC = [
  "Overview",
  "Problem",
  "Opportunity",
  "Features",
  "Design System",
  "Research",
  "Personas",
  "JTBD",
  "Architecture",
  "Edge Cases",
];

function StatusDot({ size = 8 }: { size?: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span
        className="absolute inset-[18.75%] rounded-full border border-accent/40"
      />
      <span className="absolute inset-[31.25%] rounded-full bg-accent" />
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[36px] tracking-[-0.72px] leading-[1.2] text-black">
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

function Pagination() {
  return (
    <div className="flex gap-[var(--xl)] items-center">
      <button className="bg-grey-3 px-[var(--lg)] py-[var(--xs)] rounded-[var(--full-radius)]">
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M7.5 2L3.5 6l4 4" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="flex gap-[var(--xs)] items-center">
        <span className="bg-accent rounded-full w-2 h-2" />
        <span className="bg-grey-4 rounded-full w-2 h-2" />
        <span className="bg-grey-4 rounded-full w-2 h-2" />
      </div>
      <button className="bg-grey-3 px-[var(--lg)] py-[var(--xs)] rounded-[var(--full-radius)]">
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2l4 4-4 4" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

function CaseSection({
  title,
  children,
  image,
  withPagination,
}: {
  title: string;
  children: React.ReactNode;
  image?: string;
  withPagination?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[var(--2xl)] items-start w-full">
      <div className="flex flex-col gap-[var(--reg)] w-full">
        <H3>{title}</H3>
        <div className="flex flex-col gap-[var(--sm)] w-full">{children}</div>
      </div>
      {image && (
        <div className="flex flex-col gap-[var(--lg)] items-center justify-center w-full">
          <div
            className="relative rounded-[var(--lg)] w-full overflow-hidden"
            style={{ aspectRatio: "4096/2852" }}
          >
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          {withPagination && <Pagination />}
        </div>
      )}
    </div>
  );
}

export default function CompstackProjectPage() {
  return (
    <div className="bg-canvas flex items-center w-full min-h-screen">
      <div className="flex flex-col items-start w-[1440px] mx-auto">
        <SharedNavbar />

        <main className="flex flex-col items-center justify-center pb-[128px] pt-[var(--6xl)] px-[240px] w-full">
          <div className="flex gap-[var(--7xl)] items-start justify-center w-full">
            {/* TOC sidebar */}
            <aside className="flex flex-col gap-[var(--xs)] items-start w-[150px] sticky top-8 self-start">
              {TOC.map((item, i) => {
                const active = i === TOC.length - 1;
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex gap-[var(--sm)] items-center w-full"
                  >
                    <div
                      className={`h-px ${active ? "bg-charcoal w-6" : "bg-grey-7 w-4"}`}
                    />
                    <span
                      className={`text-[15px] tracking-[-0.3px] leading-6 ${
                        active ? "text-charcoal" : "text-grey-8"
                      }`}
                    >
                      {item}
                    </span>
                  </a>
                );
              })}
            </aside>

            {/* Main content */}
            <article className="flex flex-1 flex-col gap-[var(--4xl)] items-start min-w-0">
              {/* Header */}
              <div className="flex flex-col gap-[var(--3xl)] items-start w-full">
                <Link
                  to="/"
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
                      Mobile
                    </span>
                    <StatusDot />
                    <span className="font-sans font-medium text-grey-9 text-[15px] tracking-[-0.3px] leading-[1.5]">
                      2025
                    </span>
                  </div>
                  <div className="flex flex-col gap-[var(--sm)] items-start w-full">
                    <h1 className="font-display text-[56px] tracking-[-2px] leading-[1.2] text-black">
                      Compstack Redesign
                    </h1>
                    <p className="text-grey-9 text-[18px] tracking-[-0.5px] leading-[1.5] w-full">
                      Redesigning an HRMS platform for HR teams managing
                      payroll, people operations, and reporting
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div
                className="relative rounded-[var(--lg)] w-full overflow-hidden"
                style={{ aspectRatio: "4096/2852" }}
              >
                <img src={A.hero} alt="Compstack" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Meta strip */}
              <div className="flex gap-[var(--4xl)] items-start w-full">
                <div className="flex flex-col gap-[var(--2xs)] items-start">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">My Role</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">Product Designer</p>
                </div>
                <div className="flex flex-1 flex-col gap-[var(--2xs)] items-start min-w-0">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">Team</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">
                    Product Designer, Brand Designer, Front-end Engineer
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[var(--2xs)] items-start min-w-0">
                  <p className="font-sans font-medium text-grey-10 text-[16px] tracking-[-0.3px] leading-[1.5]">Timeline</p>
                  <p className="text-grey-9 text-[16px] tracking-[-0.3px] leading-[1.5]">
                    ~6 weeks <span className="text-grey-9/70">(March–April 2025)</span>
                  </p>
                </div>
              </div>

              {/* Overview */}
              <section id="overview" className="flex flex-col gap-[16px] w-full">
                <H2>Overview</H2>
                <div className="flex flex-col gap-[var(--xs)] w-full">
                  <Body>
                    Compstack is an HRMS platform for the Moroccan market,
                    combining payroll, employee records, time off, recruitment,
                    expenses, reporting, and compliance.
                  </Body>
                  <Body>
                    I joined after the client lost confidence in a previous
                    design direction. The product had grown quickly, but
                    without a consistent structure — patterns were fragmented,
                    workflows felt disconnected, and screens had been designed
                    in isolation.
                  </Body>
                  <Body>My role covered both admin-facing and employee-facing experiences.</Body>
                </div>
              </section>

              {/* Problem */}
              <section id="problem" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>The Problem</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    The platform had strong functionality, but lacked coherence
                    — and that made it feel unreliable.
                  </Body>
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                      Four issues consistently surfaced:
                    </p>
                    <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Navigation didn't scale</Emphasis> — The structure reflected features rather than how HR teams actually work
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Workflows had friction</Emphasis> — Tasks like payroll and approvals lacked clear progression and feedback
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Information lacked hierarchy</Emphasis> — Data was present, but hard to scan and act on
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        <Emphasis>Experiences were misaligned</Emphasis> — Admin and employee flows felt like separate products
                      </li>
                    </ol>
                  </div>
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                      This created two risks:
                    </p>
                    <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        The team couldn't move forward confidently
                      </li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                        Engineering lacked a reusable foundation to build from
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Screenshot */}
              <div
                className="relative rounded-[var(--lg)] w-full overflow-hidden"
                style={{ aspectRatio: "1432/1030" }}
              >
                <img src={A.screenshot} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Challenge */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>The Challenge</H2>
                <div className="flex flex-col gap-[var(--2xs)] w-full">
                  <Body>HRMS platforms are inherently complex — multiple user types, high-stakes actions, and interconnected workflows.</Body>
                  <Body>
                    The goal wasn't to fix individual screens, but to{" "}
                    <Emphasis>create a unified system without oversimplifying the product.</Emphasis>
                  </Body>
                  <Body>
                    With only six weeks and a large surface area, the work
                    required prioritizing{" "}
                    <Emphasis>structural changes with the highest cross-product impact.</Emphasis>
                  </Body>
                </div>
              </section>

              {/* Why It Mattered */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Why It Mattered</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <div className="flex flex-col gap-[var(--2xs)] w-full">
                    <Body>
                      Usability issues in HR software aren't cosmetic — they directly affect operations.
                    </Body>
                    <Body>
                      Unclear workflows can slow payroll, introduce approval errors, and create risk in employee management.
                    </Body>
                  </div>
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">This project was ultimately about confidence:</p>
                    <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">For admins handling sensitive workflows</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">For employees using self-service features</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">For engineers building on a stable system</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Research */}
              <section id="research" className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Research &amp; Insight</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>Without access to live users, I approached the problem from three angles:</Body>
                  <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                    <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Evaluating what existed</li>
                    <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Identifying where workflows broke down</li>
                    <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Understanding expectations from modern HRMS tools</li>
                  </ol>
                  <Body>
                    Methods included heuristic evaluation, competitive analysis (BambooHR, Rippling, Gusto, Deel, Workday), workflow mapping, and regular reviews with stakeholders and engineers.
                  </Body>
                </div>
              </section>

              <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Key Insights */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Key Insights</H2>
                <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                  <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    <Emphasis>Structure over surface</Emphasis> — Fixing architecture would have more impact than refining UI
                  </li>
                  <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    <Emphasis>Overview and detail must coexist</Emphasis> — Users need summary and granular data at the same time
                  </li>
                  <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    <Emphasis>High-stakes actions need review states</Emphasis> — Speed alone isn't enough; verification is critical
                  </li>
                  <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    <Emphasis>Shared patterns multiply impact</Emphasis> — Improving core components improves the entire system
                  </li>
                </ol>
                <div className="relative w-full" style={{ aspectRatio: "1440/1180" }}>
                  <img src={A.insights} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </section>

              {/* Solution */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>The Solution</H2>
                <div className="flex flex-col gap-[var(--2xl)] w-full">
                  <Body>
                    Instead of redesigning modules in isolation, I focused on shared patterns and consistent structures that could scale across the product.
                  </Body>
                  <div className="flex flex-col gap-[var(--5xl)] w-full">
                    <CaseSection title="Dashboard" image={A.dashboard} withPagination>
                      <Body>
                        Redesigned as a purposeful command center. Admins can now see what needs attention at a glance — pending approvals, payroll timing, onboarding activity — and move directly into the right workflow.
                      </Body>
                    </CaseSection>

                    <CaseSection title="Employee Management" image={A.employees} withPagination>
                      <Body>
                        Employee Management became the core area for understanding workforce information across onboarding, active employment, and offboarding.
                      </Body>
                      <Body>
                        The redesign gave this module stronger structure, clearer hierarchy, and more intentional operational actions. Because the work covered both admin-facing and employee-facing surfaces, I also considered how employee information should feel detailed and actionable for HR teams while remaining clear and approachable for employees interacting with their own records.
                      </Body>
                    </CaseSection>

                    <div className="flex flex-col gap-[var(--2xl)] w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <H3>Payroll</H3>
                        <Body>
                          Redesigned payroll as a guided review workflow. Its role was to help teams prepare, verify, and run payroll with confidence. The flow prioritized understanding before action by making it easier to grasp totals, due dates, employee-level details, and compensation changes in a more structured way.
                        </Body>
                        <Body>
                          This shifted payroll away from feeling like a raw data surface and toward feeling like a guided operational process.
                        </Body>
                      </div>
                      <div className="flex gap-6 items-center justify-center w-full overflow-x-auto">
                        {[A.employees, A.employees, A.employees].map((src, i) => (
                          <div
                            key={i}
                            className="relative rounded-[var(--lg)] flex-shrink-0 overflow-hidden"
                            style={{ width: 730, height: 508.291 }}
                          >
                            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[var(--2xl)] w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <H3>Time Off</H3>
                        <Body>
                          Time Off needed to work for both sides of the product. For admins, the redesign improved visibility into leave requests, statuses, and team planning. For employees, it created a clearer path for requesting time off and understanding balances or approval status.
                        </Body>
                        <Body>
                          Bringing both perspectives into the same system helped the module feel more connected and practical.
                        </Body>
                      </div>
                      <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                        <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[var(--2xl)] w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <H3>Recruitment</H3>
                        <Body>
                          Clarified recruitment as a pipeline-management experience. Recruitment was repositioned around tracking progress and making decisions.
                        </Body>
                        <Body>
                          The redesign made it easier to understand openings, candidate stages, and hiring activity, especially when moving between role-level overviews and candidate-level detail. The goal was to make the flow easier to scan, interpret, and act on.
                        </Body>
                      </div>
                      <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                        <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[var(--2xl)] w-full">
                      <div className="flex flex-col gap-[var(--reg)] w-full">
                        <H3>Supporting Modules</H3>
                        <Body>
                          Beyond the platform's core operational areas, I also redesigned supporting modules including Documents, Expenses, Integrations, and Settings.
                        </Body>
                        <Body>
                          I also worked across Documents, Expenses, Integrations, and Settings — supporting areas that were important to the product's completeness, but needed stronger structure and consistency to feel integrated into the overall system.
                        </Body>
                        <Body>
                          The redesign made these modules easier to navigate and manage by clarifying priorities, organizing information more intentionally, and aligning them with shared product patterns. This helped reduce fragmentation across the platform and reinforced a more scalable foundation for future growth.
                        </Body>
                      </div>
                      <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                        <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="relative rounded-[var(--2xl)] w-full h-[492px] overflow-hidden">
                        <img src={A.generic} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Outcome */}
              <section className="flex flex-col gap-[var(--lg)] w-full">
                <H2>Outcome</H2>
                <div className="flex flex-col gap-[var(--reg)] w-full">
                  <Body>
                    The product had not launched by handoff, so I focused outcomes on design and delivery impact rather than live metrics
                  </Body>
                  <div className="flex flex-col gap-[var(--sm)] w-full">
                    <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">The redesign helped the team:</p>
                    <ol className="flex flex-col gap-[var(--2xs)] list-decimal pl-[25px]">
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Restore confidence in the product direction after a previously unsuccessful design phase</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Create a more buildable foundation for engineering through clearer, repeatable patterns</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Reduce inconsistency across modules, lowering the risk of fragmented implementation as the platform grows</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Improve clarity in high-stakes workflows where structure directly supports confidence and accuracy</li>
                      <li className="text-grey-9 text-[17px] tracking-[-0.5px] leading-[1.5]">Align admin-facing and employee-facing experiences into a more cohesive product</li>
                    </ol>
                  </div>
                  <p className="font-sans font-medium text-grey-10 text-[17px] tracking-[-0.5px] leading-[1.5]">
                    In practice, the work did more than improve the interface. It gave the team a clearer system to ship and a more scalable baseline for future modules.
                  </p>
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
