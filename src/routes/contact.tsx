import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ORCA BPO Islamabad" },
      { name: "description", content: "Get in touch with ORCA BPO Islamabad. Free consultation, custom quotes, and 24/7 support." },
      { property: "og:title", content: "Contact ORCA BPO Islamabad" },
      { property: "og:description", content: "Free consultation and custom quotes for outsourcing services." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thanks — we'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative bg-gradient-hero py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-accent">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Let's talk about your operations</h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Tell us a bit about your business and we'll get back within one working day with a tailored proposal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
              <a href="https://orcabposervices.com" target="_blank" rel="noopener noreferrer">
                Get a Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold">Reach us directly</h2>
            <div className="mt-6 space-y-6">
              {[
                { icon: MapPin, title: "Head Office", body: "Blue Area, Islamabad, Pakistan" },
                { icon: Phone, title: "Phone", body: "+92 51 000 0000" },
                { icon: Mail, title: "Email", body: "hello@orcabposervices.com" },
                { icon: Clock, title: "Hours", body: "24/7 Operations · Sales Mon-Fri 9am-6pm PKT" },
              ].map((c) => (
                <div key={c.title} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-accent text-accent-foreground">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 shadow-elegant">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required className="mt-2" placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="mt-2" placeholder="jane@company.com" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" className="mt-2" placeholder="Acme Inc." />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" className="mt-2" placeholder="+1 555 000 0000" />
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" name="message" required rows={5} className="mt-2" placeholder="Tell us about your project, team size, and timeline…" />
            </div>
            <Button type="submit" disabled={sending} size="lg" className="mt-6 w-full bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90 sm:w-auto">
              {sending ? "Sending…" : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
            <iframe
              title="ORCA BPO Islamabad — Blue Area location"
              src="https://www.google.com/maps?q=Blue+Area,+Islamabad,+Pakistan&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
