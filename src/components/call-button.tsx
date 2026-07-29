import { Phone, MessageCircle, Mail } from "lucide-react";
import { CONTACT, phoneHref, whatsappHref, emailHref } from "@/lib/contact-info";
import { cn } from "@/lib/utils";

type Size = "sm" | "default" | "lg";

const sizeClass = {
  sm: "h-8 px-3 text-xs",
  default: "h-9 px-4 text-sm",
  lg: "h-10 px-8 text-sm",
} as const;

type BaseProps = {
  className?: string;
  size?: Size;
  label?: string;
};

/** WhatsApp — best option on a laptop (opens in browser / WhatsApp Web). */
export function WhatsAppButton({ className, size = "lg", label = "Chat on WhatsApp" }: BaseProps) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-white transition-colors",
        sizeClass[size],
        "bg-[#25D366] hover:bg-[#1ebe57]",
        className
      )}
      aria-label="Message ORCA BPO on WhatsApp"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

/** Email — works on any laptop with Gmail/Outlook. */
export function EmailButton({ className, size = "lg", label = "Email us" }: BaseProps) {
  return (
    <a
      href={emailHref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors",
        sizeClass[size],
        "bg-[#2563eb] text-white shadow-glow hover:bg-[#1d4ed8]",
        className
      )}
      aria-label={`Email ORCA BPO at ${CONTACT.email}`}
    >
      <Mail className="h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

/** Phone dialer — only useful on a real phone. Hidden on large screens by default. */
export function CallButton({
  className,
  size = "lg",
  variant = "solid",
  label = "Call (phone only)",
  showNumber = false,
  /** Show on desktop too (default: phones only) */
  alwaysShow = false,
}: BaseProps & {
  variant?: "solid" | "outline";
  showNumber?: boolean;
  alwaysShow?: boolean;
}) {
  return (
    <a
      href={phoneHref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors",
        sizeClass[size],
        variant === "solid" && "bg-[#2563eb] text-white shadow-glow hover:bg-[#1d4ed8]",
        variant === "outline" && "border border-white/25 bg-white/5 text-white hover:bg-white/10",
        !alwaysShow && "md:hidden",
        className
      )}
      aria-label={`Call ORCA BPO at ${CONTACT.phoneDisplay}`}
    >
      <Phone className="h-4 w-4 shrink-0" />
      {showNumber ? CONTACT.phoneDisplay : label}
    </a>
  );
}
