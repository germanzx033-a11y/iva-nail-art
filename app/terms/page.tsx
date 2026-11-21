import type { Metadata } from "next";
import LegalPage, { type LegalCopy } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Booking, deposit, cancellation and service terms for IVA Nail Art in Bay Ridge, Brooklyn.",
  alternates: { canonical: "/terms" },
};

const en: LegalCopy = {
  title: "Terms & Conditions",
  updated: "Last updated: November 16, 2026",
  intro:
    "By booking with IVA Nail Art or using this website you agree to these terms. They are meant to keep appointments fair and smooth for everyone.",
  sections: [
    {
      title: "Appointments",
      body: [
        "We work by appointment only. Book by sending us a direct message on Instagram (@iva_nailart_nyc) or through the booking options on this site. Your appointment is confirmed only once we reply to confirm it.",
      ],
    },
    {
      title: "Prices",
      body: [
        "Prices depend on the design, length and complexity and are confirmed in our conversation before your appointment. Prices shown on the site are a guide and may vary.",
      ],
    },
    {
      title: "Deposits and payments",
      body: [
        "A $35 deposit is required to hold your time. Payments are processed securely by Stripe. Unless we tell you otherwise, a deposit is applied toward the cost of your service.",
      ],
    },
    {
      title: "Cancellations and rescheduling",
      body: [
        "Please let us know at least 24 hours before your appointment if you need to cancel or move it. Late cancellations and missed appointments may forfeit the deposit.",
        "There is a 15-minute grace period for late arrivals. After that we may need to shorten or reschedule your service so the next client is not affected.",
      ],
    },
    {
      title: "Health and safety",
      body: [
        "Please tell us about allergies, skin or nail conditions and anything else we should know before we start. We may decline or adjust a service if it could harm you. Our studio follows professional sterilization and hygiene practices.",
      ],
    },
    {
      title: "Satisfaction",
      body: [
        "If something is not right with your set, contact us within 7 days and we will do our best to fix it. Damage caused by normal wear and tear or by not following aftercare advice may not be covered.",
      ],
    },
    {
      title: "Photos",
      body: [
        "We may photograph finished nails to show our work. We do not publish photos that show your face, and we will not post any photo you ask us not to.",
      ],
    },
    {
      title: "Website use",
      body: [
        "The photos, designs and texts on this site belong to IVA Nail Art and may not be copied or reused without our permission.",
      ],
    },
    {
      title: "Contact",
      body: ["Questions about these terms: @iva_nailart_nyc on Instagram or +1 (929) 625-7273."],
    },
  ],
};

const es: LegalCopy = {
  title: "Términos y Condiciones",
  updated: "Última actualización: 16 de noviembre de 2026",
  intro:
    "Al reservar con IVA Nail Art o usar este sitio aceptas estos términos. Están pensados para que las citas sean justas y fluidas para todas.",
  sections: [
    {
      title: "Citas",
      body: [
        "Trabajamos solo con cita. Reserva enviándonos un mensaje directo en Instagram (@iva_nailart_nyc) o con las opciones de reserva de este sitio. Tu cita queda confirmada solo cuando te respondemos para confirmarla.",
      ],
    },
    {
      title: "Precios",
      body: [
        "El precio depende del diseño, el largo y la complejidad y se confirma en nuestra conversación antes de tu cita. Los precios del sitio son una guía y pueden variar.",
      ],
    },
    {
      title: "Depósitos y pagos",
      body: [
        "Se pide un depósito de $35 para apartar tu horario. Los pagos se procesan de forma segura con Stripe. Salvo que te digamos otra cosa, el depósito se descuenta del costo de tu servicio.",
      ],
    },
    {
      title: "Cancelaciones y cambios",
      body: [
        "Avísanos al menos 24 horas antes si necesitas cancelar o mover tu cita. Las cancelaciones tardías y las citas no asistidas pueden perder el depósito.",
        "Hay 15 minutos de tolerancia si llegas tarde. Después de ese tiempo, quizá tengamos que acortar o reprogramar tu servicio para no afectar a la siguiente clienta.",
      ],
    },
    {
      title: "Salud y seguridad",
      body: [
        "Cuéntanos sobre alergias, condiciones de la piel o las uñas y cualquier otra cosa importante antes de empezar. Podemos rechazar o ajustar un servicio si pudiera dañarte. Nuestro estudio sigue prácticas profesionales de esterilización e higiene.",
      ],
    },
    {
      title: "Satisfacción",
      body: [
        "Si algo no está bien con tu set, escríbenos dentro de los 7 días y haremos lo posible por arreglarlo. El daño por desgaste normal o por no seguir los cuidados indicados puede no estar cubierto.",
      ],
    },
    {
      title: "Fotos",
      body: [
        "Podemos fotografiar las uñas terminadas para mostrar nuestro trabajo. No publicamos fotos donde se vea tu rostro y no subiremos ninguna foto que nos pidas no subir.",
      ],
    },
    {
      title: "Uso del sitio",
      body: [
        "Las fotos, diseños y textos de este sitio pertenecen a IVA Nail Art y no pueden copiarse ni reutilizarse sin nuestro permiso.",
      ],
    },
    {
      title: "Contacto",
      body: ["Preguntas sobre estos términos: @iva_nailart_nyc en Instagram o +1 (929) 625-7273."],
    },
  ],
};

export default function TermsPage() {
  return <LegalPage en={en} es={es} />;
}
