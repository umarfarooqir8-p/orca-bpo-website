import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Headphones, Wrench, FileStack, MessagesSquare, LineChart, Users,
  ShieldCheck, Globe2, TrendingDown, Zap, ArrowRight, Star, Quote, MapPin,
} from "lucide-react";
import heroPlanet from "@/assets/hero-planet.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";
import { CallButton, WhatsAppButton, EmailButton } from "@/components/call-button";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const services = [
  { icon: Headphones, title: "Customer Support", desc: "24/7 omnichannel voice, chat and email support from trained professionals." },
  { icon: Wrench, title: "Technical Support", desc: "Tier-1 to Tier-3 tech support ensuring fast resolution and high CSAT." },
  { icon: FileStack, title: "Back Office", desc: "Data entry, document management and administrative workflows at scale." },
  { icon: MessagesSquare, title: "Chat & Email", desc: "Real-time chat and responsive email support that keeps customers engaged." },
  { icon: LineChart, title: "Digital Marketing", desc: "Data-driven SEO, PPC and content strategies that grow your presence." },
  { icon: Users, title: "HR & Recruitment", desc: "End-to-end recruitment, onboarding and HR management outsourcing." },
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
    <div className="min-h-screen bg-[#05070a] text-white">
      <SiteHeader />

      {/* Hero — dark space + circuit planet */}
      <section className="relative isolate overflow-hidden bg-[#05070a] text-white">
        {/* Full-bleed planet plane */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={heroPlanet}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-[68%_center] scale-105"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,rgba(5,7,10,0.35)_35%,rgba(5,7,10,0.92)_68%,#05070a_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/85 to-transparent lg:via-[#05070a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/40" />
        </div>

        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-center px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1d4ed8]/90 px-3.5 py-1.5 text-xs font-medium text-white shadow-[0_0_24px_-4px_rgba(59,130,246,0.55)]">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                Trusted by 50+ Global Businesses
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-sky-200 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-sky-300" />
                Blue Area, Islamabad
              </span>
            </div>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              Best <span className="text-[#3b82f6]">BPO Services</span> in Islamabad, Pakistan
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              ORCA BPO is Islamabad&apos;s trusted business process outsourcing partner — delivering 24/7 customer
              support, call center, back-office and digital marketing services to 50+ global clients across the US, UK
              and EU.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" label="Chat on WhatsApp" />
              <EmailButton size="lg" label="Email us" />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/contact">
                  Send a message <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <CallButton size="lg" label="Call (phone only)" variant="outline" />
            </div>
            <p className="mt-4 text-sm text-white/50">
              On a laptop? Use <span className="text-[#25D366]">WhatsApp</span> or{" "}
              <span className="text-[#3b82f6]">Email</span> — Call only works on phones.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-bold text-[#3b82f6] sm:text-4xl">{s.v}</div>
                <div className="mt-1 text-sm text-white/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-b border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-white/45">Trusted by leading companies</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((l) => (
              <span key={l} className="font-display text-lg font-semibold text-white/40">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-[#3b82f6]">What we offer</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Comprehensive BPO Services</h2>
            <p className="mt-4 text-white/65">
              From front-line customer support to complex back-office workflows, our teams integrate seamlessly with your operations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 80}>
                <div className="rounded-2xl border border-white/10 bg-[#0c1118] p-7 transition-all hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_0_40px_-12px_rgba(37,99,235,0.45)]">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#2563eb] text-white">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center text-sm font-medium text-[#3b82f6] hover:text-sky-300">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-white/10 bg-[#080c12] py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#3b82f6]">Why ORCA BPO</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Your growth is our mission</h2>
            <p className="mt-4 text-white/65">
              We don&apos;t just fulfil contracts — we partner with your business to understand your goals and deliver outcomes that matter.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "5", l: "Countries served" },
                { v: "2021", l: "ISO certified since" },
                { v: "100+", l: "Expert team" },
                { v: "40%", l: "Avg. client growth" },
              ].map((s, i) => (
                <FadeIn key={s.l} delay={i * 70}>
                  <div className="rounded-xl border border-white/10 bg-[#0c1118] p-4">
                    <div className="font-display text-2xl font-bold text-[#3b82f6]">{s.v}</div>
                    <div className="text-xs text-white/55">{s.l}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <Button asChild className="mt-8 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
              <Link to="/about">Learn more about us <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whys.map((w, i) => (
              <FadeIn key={w.title} delay={i * 80}>
                <div className="rounded-2xl border border-white/10 bg-[#0c1118] p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#2563eb] text-white">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-[#3b82f6]">Client stories</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What our clients say</h2>
          <FadeIn>
            <div className="mt-10 rounded-3xl border border-white/10 bg-[#0c1118] p-10 shadow-elegant">
              <Quote className="mx-auto h-10 w-10 text-[#3b82f6]" />
              <p className="mt-6 text-xl leading-relaxed text-white/85">
                &quot;Having worked with three agencies before, ORCA BPO stands out as the best. Their contribution improved
                our conversion rates and helped us make broader business strategy changes.&quot;
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#2563eb] text-white">
                  <span className="font-display font-bold">PA</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Paul Andrew</div>
                  <div className="text-sm text-white/55">CEO, Tech Innovations Inc.</div>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-0.5 text-[#3b82f6]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1524] to-[#091018] p-12 text-center shadow-elegant sm:p-16">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2563eb]/30 blur-3xl" />
              <h2 className="relative font-display text-3xl font-bold sm:text-4xl">Ready to scale your business?</h2>
              <p className="relative mx-auto mt-4 max-w-2xl text-white/65">
                Let ORCA BPO handle your operations so you can focus on what you do best. Get a free consultation today.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-[#2563eb] text-white shadow-glow hover:bg-[#1d4ed8]">
                  <Link to="/contact">Get a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
