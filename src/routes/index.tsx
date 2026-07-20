import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Headphones, Wrench, FileStack, MessagesSquare, LineChart, Users,
  ShieldCheck, Globe2, TrendingDown, Zap, ArrowRight, Star, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-bpo.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const services = [
  { icon: Headphones, title: "Customer Support", desc: "24/7 omnichannel voice, chat and email support from trained professionals.", tint: "bg-sky-100 text-sky-700" },
  { icon: Wrench, title: "Technical Support", desc: "Tier-1 to Tier-3 tech support ensuring fast resolution and high CSAT.", tint: "bg-amber-100 text-amber-700" },
  { icon: FileStack, title: "Back Office", desc: "Data entry, document management and administrative workflows at scale.", tint: "bg-emerald-100 text-emerald-700" },
  { icon: MessagesSquare, title: "Chat & Email", desc: "Real-time chat and responsive email support that keeps customers engaged.", tint: "bg-violet-100 text-violet-700" },
  { icon: LineChart, title: "Digital Marketing", desc: "Data-driven SEO, PPC and content strategies that grow your presence.", tint: "bg-rose-100 text-rose-700" },
  { icon: Users, title: "HR & Recruitment", desc: "End-to-end recruitment, onboarding and HR management outsourcing.", tint: "bg-teal-100 text-teal-700" },
];

const whys = [
  { icon: TrendingDown, title: "Cost Reduction", desc: "Cut operational costs by up to 60% without sacrificing quality." },
  { icon: Zap, title: "Scalable Teams", desc: "Ramp up or down in days — not months. We flex with your business." },
  { icon: ShieldCheck, title: "Quality Assurance", desc: "ISO-aligned processes and real-time monitoring ensure excellence." },
  { icon: Globe2, title: "Global Coverage", desc: "Round-the-clock operations across every major time zone." },
];

const stats = [
  { v: "50+", l: "Global Clients" },
  { v: "10+", l: "Years Experience" },
  { v: "100+", l: "Team Members" },
  { v: "98%", l: "Client Retention" },
];

const logos = ["TechNova", "GlobalSync", "PrimeSoft", "E-CommHub", "DataBridge", "CloudVentures", "MarketPeak", "SwiftOps"];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImg} alt="" width={1600} height={1100} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Trusted by 50+ Global Businesses
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Best BPO Services in <span className="bg-gradient-accent bg-clip-text text-transparent">Islamabad</span>, Pakistan
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              ORCA BPO is Islamabad's trusted business process outsourcing partner — delivering 24/7 customer support,
              call center, back-office and digital marketing services to 50+ global clients across the US, UK and EU.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Based in Blue Area, Islamabad
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
                <a href="https://orcabposervices.com" target="_blank" rel="noopener noreferrer">
                  Get a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-accent/20 blur-3xl" />
            <img
              src={heroImg}
              alt="ORCA BPO Islamabad team of customer support agents at work"
              width={1600}
              height={1100}
              className="relative rounded-3xl border border-primary-foreground/10 shadow-elegant"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-primary-foreground/10 bg-primary/50 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.v}</div>
                <div className="text-sm text-primary-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-b border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by leading companies</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {logos.map((l) => (
              <span key={l} className="font-display text-lg font-semibold text-foreground/60">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-accent-foreground/70">What we offer</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Comprehensive BPO Services</h2>
            <p className="mt-4 text-muted-foreground">
              From front-line customer support to complex back-office workflows, our teams integrate seamlessly with your operations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border-4 border-black bg-card p-7 shadow-[6px_6px_0_0_#000] transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000]">
                <div className="relative">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl border-2 border-black ${s.tint}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-accent">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent-foreground/70">Why ORCA BPO</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Your growth is our mission</h2>
            <p className="mt-4 text-muted-foreground">
              We don't just fulfil contracts — we partner with your business to understand your goals and deliver outcomes that matter.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "5", l: "Countries served" },
                { v: "2021", l: "ISO certified since" },
                { v: "100+", l: "Expert team" },
                { v: "40%", l: "Avg. client growth" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-4">
                  <div className="font-display text-2xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary-glow">
              <Link to="/about">Learn more about us <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whys.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-accent text-accent-foreground">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-accent-foreground/70">Client stories</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What our clients say</h2>
          <div className="mt-10 rounded-3xl border border-border bg-card p-10 shadow-elegant">
            <Quote className="mx-auto h-10 w-10 text-accent" />
            <p className="mt-6 text-xl leading-relaxed text-foreground/90">
              "Having worked with three agencies before, ORCA BPO stands out as the best. Their contribution improved
              our conversion rates and helped us make broader business strategy changes."
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-hero text-primary-foreground">
                <span className="font-display font-bold">PA</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Paul Andrew</div>
                <div className="text-sm text-muted-foreground">CEO, Tech Innovations Inc.</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center text-primary-foreground shadow-elegant sm:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-accent opacity-30 blur-3xl" />
            <h2 className="relative font-display text-3xl font-bold sm:text-4xl">Ready to scale your business?</h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Let ORCA BPO handle your operations so you can focus on what you do best. Get a free consultation today.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
                <a href="https://orcabposervices.com" target="_blank" rel="noopener noreferrer">Get a Consultation</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
