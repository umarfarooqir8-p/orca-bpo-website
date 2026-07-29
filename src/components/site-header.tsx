import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallButton, WhatsAppButton, EmailButton } from "@/components/call-button";
import orcaLogo from "@/assets/orca-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070a]/80 text-white backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="ORCA BPO home">
          <img
            src={orcaLogo}
            alt="ORCA BPO"
            className="h-10 w-auto rounded-md bg-white object-contain p-0.5 sm:h-11"
          />
          <div className="hidden leading-tight min-[380px]:block">
            <div className="text-[10px] uppercase tracking-widest text-white/50">Islamabad</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <WhatsAppButton size="sm" label="WhatsApp" />
          <EmailButton size="sm" label="Email" />
          <Button asChild size="sm" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to="/contact">
              <Phone className="mr-2 h-4 w-4" /> Get a Quote
            </Link>
          </Button>
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#05070a] text-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
            <WhatsAppButton size="default" label="WhatsApp (works on laptop)" className="mt-2" />
            <EmailButton size="default" label="Email us" />
            <CallButton size="default" label="Call (phone only)" alwaysShow />
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
