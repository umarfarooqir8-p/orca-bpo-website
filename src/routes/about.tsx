import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Heart, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ORCA BPO Islamabad" },
      { name: "description", content: "Learn how ORCA BPO grew into Islamabad's trusted outsourcing partner — mission, values and the team behind 50+ global clients." },
      { property: "og:title", content: "About ORCA BPO Islamabad" },
      { property: "og:description", content: "Our mission, values, and the team powering 50+ global brands from Islamabad." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Outcomes over output", desc: "We measure success by your KPIs — not our headcount." },
  { icon: Heart, title: "Human at the core", desc: "Trained, empowered people that customers actually enjoy talking to." },
  { icon: Sparkles, title: "Continuous improvement", desc: "Weekly ops reviews and QA loops that raise the bar month over month." },
  { icon: ShieldCheck, title: "Security first", desc: "ISO-aligned controls, encrypted infra and strict access policies." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative bg-gradient-hero py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-accent">About ORCA BPO</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Built in Islamabad, trusted across three continents
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Since 2015, we've helped scale-ups, e-commerce brands and enterprises hand off the operations that were
            slowing them down — and get back to what actually grows their business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Our story</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                ORCA BPO started with a small team of nine agents and one bold idea: outsourcing didn't have to feel
                transactional. It could feel like a genuine extension of your business.
              </p>
              <p>
                A decade later, we run 24/7 operations for 50+ global brands from our Islamabad HQ — spanning
                customer support, technical support, back-office and digital marketing.
              </p>
              <p>
                We've grown by staying obsessive about quality, transparent on reporting, and honest when things need
                to change. It's a partnership model our clients keep coming back to.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "10+", l: "Years in operation" },
              { v: "50+", l: "Global clients" },
              { v: "100+", l: "Team members" },
              { v: "5", l: "Countries served" },
              { v: "98%", l: "Client retention" },
              { v: "40%", l: "Avg. client growth" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-accent-foreground/70">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Our values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-accent text-accent-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Let's build something together</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Whether you need a five-agent pilot or a hundred-person operation, we'll design a team that fits your
            business — and starts producing results in weeks.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
            <Link to="/contact">Get in touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
