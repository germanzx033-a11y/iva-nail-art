import type { Metadata } from "next";
import LegalPage, { type LegalCopy } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | IVA Nail Art",
  description: "How IVA Nail Art collects, uses and protects your personal information when you book an appointment.",
  alternates: { canonical: "/privacy" },
};

const en: LegalCopy = {
  title: "Privacy Policy",
  updated: "Last updated: November 16, 2026",
  intro:
    "IVA Nail Art (“we”, “us”) is a private nail studio in Bay Ridge, Brooklyn, NY. This page explains what personal information we collect when you use this website or book with us, and what we do with it.",
  sections: [
    {
      title: "Information we collect",
      body: [
        "When you book or pay a deposit through the website we collect your name, phone number, email address and the date and time you choose.",
        "When you message us on Instagram, Instagram handles that conversation under its own privacy policy; we only see what you send us.",
        "Like most websites, our hosting provider records basic technical data such as your IP address and browser type to keep the site running and secure.",
      ],
    },
    {
      title: "How we use it",
      body: [
        "To confirm, change or cancel your appointment, to contact you about it, and to prepare the service you asked for.",
        "We do not sell your information and we do not use it for advertising.",
      ],
    },
    {
      title: "Payments",
      body: [
        "Payments are processed by Stripe. Your card details go directly to Stripe and are never stored on our website or seen by us.",
      ],
    },
    {
      title: "Who else handles your data",
      body: [
        "We use trusted service providers to run the site: Vercel (hosting and a short-term booking database) and Stripe (payments). They may process your information only to provide those services.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "Booking details are kept for up to 30 days on the website's system and waitlist entries for up to 7 days. Payment records are kept by Stripe and by us as required for tax and accounting.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "This website does not use advertising or tracking cookies. It may store small technical items on your device (for example your language choice) so the site works properly.",
      ],
    },
    {
      title: "Your choices",
      body: [
        "You can ask us to see, correct or delete the information we hold about you at any time by messaging @iva_nailart_ny on Instagram or calling +1 (929) 625-7273.",
      ],
    },
    {
      title: "Children",
      body: ["Our services and this website are not directed to children under 13, and we do not knowingly collect their information."],
    },
    {
      title: "Changes",
      body: ["If we change this policy we will update the date at the top of this page."],
    },
  ],
};

const es: LegalCopy = {
  title: "Política de Privacidad",
  updated: "Última actualización: 16 de noviembre de 2026",
  intro:
    "IVA Nail Art (“nosotras”) es un estudio privado de uñas en Bay Ridge, Brooklyn, NY. Esta página explica qué datos personales recopilamos cuando usas este sitio o reservas con nosotras, y qué hacemos con ellos.",
  sections: [
    {
      title: "Qué información recopilamos",
      body: [
        "Cuando reservas o pagas un depósito en el sitio recopilamos tu nombre, teléfono, correo electrónico y la fecha y hora que eliges.",
        "Cuando nos escribes por Instagram, esa conversación la maneja Instagram según su propia política de privacidad; nosotras solo vemos lo que nos envías.",
        "Como casi todos los sitios web, nuestro proveedor de alojamiento registra datos técnicos básicos, como tu dirección IP y tipo de navegador, para mantener el sitio funcionando y seguro.",
      ],
    },
    {
      title: "Cómo la usamos",
      body: [
        "Para confirmar, cambiar o cancelar tu cita, contactarte sobre ella y preparar el servicio que pediste.",
        "No vendemos tu información ni la usamos para publicidad.",
      ],
    },
    {
      title: "Pagos",
      body: [
        "Los pagos los procesa Stripe. Los datos de tu tarjeta van directamente a Stripe y nunca se guardan en nuestro sitio ni los vemos nosotras.",
      ],
    },
    {
      title: "Quién más maneja tus datos",
      body: [
        "Usamos proveedores de confianza para operar el sitio: Vercel (alojamiento y una base de datos temporal de reservas) y Stripe (pagos). Solo pueden procesar tu información para prestar esos servicios.",
      ],
    },
    {
      title: "Cuánto tiempo la conservamos",
      body: [
        "Los datos de la reserva se guardan hasta 30 días en el sistema del sitio y los de la lista de espera hasta 7 días. Los registros de pago los conservan Stripe y nosotras según lo exigido para impuestos y contabilidad.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Este sitio no usa cookies de publicidad ni de seguimiento. Puede guardar en tu dispositivo pequeños datos técnicos (por ejemplo tu idioma) para que funcione correctamente.",
      ],
    },
    {
      title: "Tus opciones",
      body: [
        "Puedes pedirnos ver, corregir o borrar la información que tenemos sobre ti en cualquier momento escribiendo a @iva_nailart_ny en Instagram o llamando al +1 (929) 625-7273.",
      ],
    },
    {
      title: "Menores",
      body: ["Nuestros servicios y este sitio no están dirigidos a menores de 13 años y no recopilamos sus datos a sabiendas."],
    },
    {
      title: "Cambios",
      body: ["Si cambiamos esta política, actualizaremos la fecha al inicio de esta página."],
    },
  ],
};

export default function PrivacyPage() {
  return <LegalPage en={en} es={es} />;
}
