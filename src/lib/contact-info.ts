/** Update these to your real contact details. */
export const CONTACT = {
  phoneDisplay: "0336 5118118",
  phoneLocal: "03365118118",
  phoneIntl: "+923365118118",
  /** Used for Email button on laptop */
  email: "umarfarooqir8@gmail.com",
  address: "Blue Area, Islamabad, Pakistan",
} as const;

/** Phone dialer — phones only. Laptops usually ignore this. */
export const phoneHref = `tel:${CONTACT.phoneLocal}`;

/** WhatsApp Web works on laptop in the browser. */
export const whatsappHref = `https://wa.me/923365118118?text=${encodeURIComponent(
  "Hi ORCA BPO, I’d like to talk about your services."
)}`;

/** Opens Gmail/Outlook compose on a laptop. */
export const emailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "ORCA BPO — inquiry"
)}&body=${encodeURIComponent("Hi ORCA BPO,%0D%0A%0D%0AI’d like to get in touch about your services.%0D%0A")}`;
