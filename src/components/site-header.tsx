import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero shadow-elegant">
            <span className="font-display text-lg font-bold text-primary-foreground">O</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">ORCA BPO</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Islamabad</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="outline">
            <Link to="/contact">
              <Phone className="mr-2 h-4 w-4" /> Get a Quote
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
            <a href="https://orcabposervices.com" target="_blank" rel="noopener noreferrer">
              Get a Consultation
            </a>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <Button asChild variant="outline" className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-accent text-accent-foreground">
              <a href="https://orcabposervices.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                Get a Consultation
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
