import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, Wrench, FileStack, MessagesSquare, LineChart, Users, Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ORCA BPO Islamabad" },
      {
        name: "description",
        content:
          "Explore ORCA BPO's full range of outsourcing services — customer support, technical support, back office, digital marketing and HR.",
      },
      { property: "og:title", content: "Services — ORCA BPO Islamabad" },
      {
        property: "og:description",
        content: "Customer support, technical support, back office, digital marketing and HR — delivered from Islamabad.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "24/7 omnichannel voice, chat and email — trained agents that feel like part of your team.",
    bullets: ["Voice, chat & email", "Multilingual coverage", "CSAT-focused KPIs"],
  },
  {
    icon: Wrench,
    title: "Technical Support",
    desc: "Tier-1 through Tier-3 technical support with escalation paths and playbook automation.",
    bullets: ["Tier 1-3 escalation", "SLA-driven response", "Product training included"],
  },
  {
    icon: FileStack,
    title: "Back Office Operations",
    desc: "Data entry, document management and admin workflows executed with precision and auditability.",
    bullets: ["Data entry & QA", "Document processing", "Workflow automation"],
  },
  {
    icon: MessagesSquare,
    title: "Chat & Email Support",
    desc: "Live chat and email response teams that keep customers engaged and conversions high.",
    bullets: ["<60s chat response", "Email SLAs", "Sentiment tracking"],
  },
  {
    icon: LineChart,
    title: "Digital Marketing",
    desc: "SEO, PPC and content strategies grounded in data — built to grow pipeline and brand.",
    bullets: ["SEO & content", "Paid media", "Analytics & reporting"],
  },
  {
    icon: Users,
    title: "HR & Recruitment",
    desc: "End-to-end recruitment, onboarding and HR operations outsourcing for growing teams.",
    bullets: ["Talent sourcing", "Onboarding", "HR compliance"],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(37,99,235,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-[#3b82f6]">Services</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Outsourcing that moves your business forward
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Six specialised practices, one integrated partner. Pick what you need — we&apos;ll shape a team around your
            goals.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 90}>
              <div className="rounded-3xl border border-white/10 bg-[#0c1118] p-8 transition-all hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_0_40px_-12px_rgba(37,99,235,0.45)]">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#2563eb] text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-white/65">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2563eb]/20 text-[#3b82f6]">
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1524] to-[#091018] p-10 text-center shadow-elegant">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Need a custom engagement?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/65">
                Talk to our team about a blended service that combines multiple practices under a single SLA.
              </p>
              <Button asChild size="lg" className="mt-6 bg-[#2563eb] text-white shadow-glow hover:bg-[#1d4ed8]">
                <Link to="/contact">
                  Book a consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
