import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/fade-in";
import { CallButton, WhatsAppButton, EmailButton } from "@/components/call-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CONTACT, phoneHref } from "@/lib/contact-info";
import { submitToGoogleSheet } from "@/lib/google-sheets";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ORCA BPO Islamabad" },
      {
        name: "description",
        content: "Get in touch with ORCA BPO Islamabad. Free consultation, custom quotes, and 24/7 support.",
      },
      { property: "og:title", content: "Contact ORCA BPO Islamabad" },
      { property: "og:description", content: "Free consultation and custom quotes for outsourcing services." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [formActive, setFormActive] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/form-status");
        if (!res.ok) throw new Error("no local api");
        const data = (await res.json()) as { ok?: boolean; active?: boolean };
        if (!cancelled) setFormActive(Boolean(data.active));
      } catch {
        // Public / Lovable host has no local API — keep form on
        if (!cancelled) setFormActive(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setSending(true);
    try {
      // Local PC: Notepad + Sheet via /api/contact
      // Public site (Lovable): Sheet only via Apps Script
      let usedLocalApi = false;
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { ok?: boolean; sheet?: boolean; error?: string }
            | null;
          if (data?.ok) {
            usedLocalApi = true;
            toast.success(
              data.sheet
                ? "Sent! Saved to Notepad and your Google Sheet."
                : "Sent! Saved to Notepad on this computer.",
            );
          }
        }
      } catch {
        // fall through to Google Sheet
      }

      if (!usedLocalApi) {
        await submitToGoogleSheet(payload);
        toast.success("Sent! Saved to your Google Sheet.");
      }

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Couldn’t send. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(37,99,235,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-[#3b82f6]">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Let&apos;s talk about your operations</h1>
          <p className="mt-5 max-w-2xl text-white/70">
            On a laptop? Chat on WhatsApp or send an email — no phone needed. Prefer a form? Scroll down and send a
            message.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" label="Chat on WhatsApp" />
            <EmailButton size="lg" label="Email us" />
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <a href="#contact-form">Send a message</a>
            </Button>
            <CallButton size="lg" label="Call (phone only)" variant="outline" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold">Reach us directly</h2>
            <div className="mt-6 space-y-6">
              {[
                { icon: MapPin, title: "Head Office", body: CONTACT.address, href: null as string | null },
                { icon: Phone, title: "Phone — tap to call", body: CONTACT.phoneDisplay, href: phoneHref },
                { icon: Mail, title: "Email", body: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: Clock, title: "Hours", body: "24/7 Operations · Sales Mon-Fri 9am-6pm PKT", href: null },
              ].map((c, i) => (
                <FadeIn key={c.title} delay={i * 70}>
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#2563eb] text-white">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-[#3b82f6] hover:underline">
                          {c.body}
                        </a>
                      ) : (
                        <div className="text-sm text-white/60">{c.body}</div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <p className="text-sm text-white/50">Best for laptop:</p>
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton label="Chat on WhatsApp" />
                <EmailButton label="Email us" />
              </div>
              <CallButton label="Call (phone only)" showNumber alwaysShow variant="outline" className="w-fit" />
            </div>
          </div>

          <FadeIn delay={120} className="lg:col-span-3" id="contact-form">
            {formActive === false ? (
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8">
                <h3 className="font-display text-xl font-semibold text-amber-100">Form is turned off</h3>
                <p className="mt-2 text-sm text-amber-100/70">
                  Activate the contact form from the Stats page so messages can be saved.
                </p>
                <Button asChild className="mt-6 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
                  <Link to="/stats">Go activate form</Link>
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-white/10 bg-[#0c1118] p-8 shadow-elegant"
              >
                <p className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                  Messages open in Notepad and are also saved to your{" "}
                  <a
                    href="https://docs.google.com/spreadsheets/d/1eplrU1eaYzIUN1za9liVdd8bcgUqxKHEJBLaEEaSQ8Q/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    Google Sheet
                  </a>
                  .
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-white/80">
                      Full name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="mt-2 border-white/10 bg-[#080c12] text-white placeholder:text-white/35"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white/80">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 border-white/10 bg-[#080c12] text-white placeholder:text-white/35"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-white/80">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      className="mt-2 border-white/10 bg-[#080c12] text-white placeholder:text-white/35"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/80">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      className="mt-2 border-white/10 bg-[#080c12] text-white placeholder:text-white/35"
                      placeholder="0336 5118118"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Label htmlFor="message" className="text-white/80">
                    How can we help?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 border-white/10 bg-[#080c12] text-white placeholder:text-white/35"
                    placeholder="Tell us about your project, team size, and timeline…"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending || formActive === null}
                  size="lg"
                  className="mt-6 w-full bg-[#2563eb] text-white shadow-glow hover:bg-[#1d4ed8] sm:w-auto"
                >
                  {sending ? (
                    "Sending…"
                  ) : (
                    <>
                      Send message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-elegant">
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
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
