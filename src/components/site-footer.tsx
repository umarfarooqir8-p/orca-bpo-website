import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, phoneHref } from "@/lib/contact-info";
import orcaLogo from "@/assets/orca-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030508] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="inline-block" aria-label="ORCA BPO home">
            <img
              src={orcaLogo}
              alt="ORCA BPO"
              className="h-12 w-auto rounded-md bg-white object-contain p-1"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Islamabad&apos;s trusted business process outsourcing partner — powering 50+ global brands with 24/7
            operations.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/45">Company</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link to="/" className="hover:text-[#3b82f6]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#3b82f6]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#3b82f6]">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#3b82f6]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/45">Services</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link to="/services" className="hover:text-[#3b82f6]">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#3b82f6]">
                Technical Support
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#3b82f6]">
                Back Office
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#3b82f6]">
                Digital Marketing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/45">Contact</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-[#3b82f6]" /> {CONTACT.address}
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-[#3b82f6]" />
              <a href={phoneHref} className="hover:text-[#3b82f6]">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-[#3b82f6]" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[#3b82f6]">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/45 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ORCA BPO Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
