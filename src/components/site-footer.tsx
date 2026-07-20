import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-accent">
              <span className="font-display text-lg font-bold text-accent-foreground">O</span>
            </div>
            <div className="font-display text-lg font-bold">ORCA BPO</div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Islamabad's trusted business process outsourcing partner — powering 50+ global brands with 24/7 operations.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Customer Support</li>
            <li>Technical Support</li>
            <li>Back Office</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Blue Area, Islamabad, Pakistan</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +92 51 000 0000</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> hello@orcabposervices.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ORCA BPO Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
