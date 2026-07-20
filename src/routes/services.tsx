import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, Wrench, FileStack, MessagesSquare, LineChart, Users, Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ORCA BPO Islamabad" },
      { name: "description", content: "Explore ORCA BPO's full range of outsourcing services — customer support, technical support, back office, digital marketing and HR." },
      { property: "og:title", content: "Services — ORCA BPO Islamabad" },
      { property: "og:description", content: "Customer support, technical support, back office, digital marketing and HR — delivered from Islamabad." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Headphones, title: "Customer Support", desc: "24/7 omnichannel voice, chat and email — trained agents that feel like part of your team.", bullets: ["Voice, chat & email", "Multilingual coverage", "CSAT-focused KPIs"] },
  { icon: Wrench, title: "Technical Support", desc: "Tier-1 through Tier-3 technical support with escalation paths and playbook automation.", bullets: ["Tier 1-3 escalation", "SLA-driven response", "Product training included"] },
  { icon: FileStack, title: "Back Office Operations", desc: "Data entry, document management and admin workflows executed with precision and auditability.", bullets: ["Data entry & QA", "Document processing", "Workflow automation"] },
  { icon: MessagesSquare, title: "Chat & Email Support", desc: "Live chat and email response teams that keep customers engaged and conversions high.", bullets: ["<60s chat response", "Email SLAs", "Sentiment tracking"] },
  { icon: LineChart, title: "Digital Marketing", desc: "SEO, PPC and content strategies grounded in data — built to grow pipeline and brand.", bullets: ["SEO & content", "Paid media", "Analytics & reporting"] },
  { icon: Users, title: "HR & Recruitment", desc: "End-to-end recruitment, onboarding and HR operations outsourcing for growing teams.", bullets: ["Talent sourcing", "Onboarding", "HR compliance"] },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative bg-gradient-hero py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-accent">Services</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Outsourcing that moves your business forward</h1>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
            Six specialised practices, one integrated partner. Pick what you need — we'll shape a team around your goals.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {services.map((s) => (
            <div key={s.title} className="rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary p-10 text-center text-primary-foreground shadow-elegant">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Need a custom engagement?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Talk to our team about a blended service that combines multiple practices under a single SLA.
            </p>
            <Button asChild size="lg" className="mt-6 bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
              <Link to="/contact">Book a consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
