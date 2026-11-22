"use client";

import { useState } from "react";
import {
  MessageCircle,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Heart,
  Star,
  DollarSign,
  User,
  Calendar,
  Sparkles,
  Phone,
} from "lucide-react";

export default function AdminWhatsAppScripts() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("Builder Gel Manicure");
  const [dateTime, setDateTime] = useState("Mañana a las 2:00 PM");
  const [clientPhone, setClientPhone] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cleanPhone = clientPhone.replace(/\D/g, "");

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const getWhatsAppLink = (text: string) => {
    const encoded = encodeURIComponent(text);
    if (cleanPhone) {
      // If phone starts with 10 digits in US, prefix with 1
      const normalized = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
      return `https://wa.me/${normalized}?text=${encoded}`;
    }
    return `https://wa.me/?text=${encoded}`;
  };

  const getSmsLink = (text: string) => {
    const encoded = encodeURIComponent(text);
    const target = cleanPhone ? cleanPhone : "";
    return `sms:${target}?&body=${encoded}`;
  };

  const nameVal = clientName.trim() || (lang === "es" ? "Hermosa" : "there");
  const dateVal = dateTime.trim() || (lang === "es" ? "tu cita agendada" : "your appointment");
  const serviceVal = service.trim() || (lang === "es" ? "tu servicio" : "your service");

  const templates = [
    {
      id: "deposit",
      title: lang === "es" ? "1. Depósito de $35 e Información de Pago" : "1. $35 Deposit Request & Payment Info",
      badge: lang === "es" ? "Reserva" : "Booking Lock",
      icon: DollarSign,
      color: "from-amber-500 to-amber-700",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! 🤍 Para confirmar y asegurar tu cita de ${serviceVal} para el ${dateVal} en IVA Nail Art (Bay Ridge), se requiere un depósito de $35 (este monto se descuenta del total de tu servicio el día de tu cita).

✨ Opciones de Pago:
• Zelle: 929-625-7273 (Ivannia Rodriguez)
• Apple Pay: 929-625-7273
• Venmo: @iva_nailart_nyc

Por favor envíame una captura de pantalla en las próximas 2 horas para apartar tu horario de forma definitiva. ¡Muchas gracias y nos vemos pronto para consentir tus uñas! 💅`
          : `Hi ${nameVal}! 🤍 To confirm and lock in your ${serviceVal} appointment for ${dateVal} with IVA Nail Art in Bay Ridge, a $35 deposit is required (this is applied toward your total service balance on the day of your appointment).

✨ Payment Options:
• Zelle: 929-625-7273 (Ivannia Rodriguez)
• Apple Pay: 929-625-7273
• Venmo: @iva_nailart_nyc

Please send a quick screenshot once completed within the next 2 hours so I can secure your slot. Thank you, and I can't wait to create your dream set! 💅`,
    },
    {
      id: "location",
      title: lang === "es" ? "2. Ubicación, Llegada y Parking (Bay Ridge)" : "2. Studio Location, Transit & Parking",
      badge: lang === "es" ? "Dirección" : "Studio Arrival",
      icon: MapPin,
      color: "from-blue-500 to-indigo-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! Aquí tienes las indicaciones para tu cita privada en IVA Nail Art:

📍 Ubicación del Estudio:
Bay Ridge, Brooklyn, NY 11209 (cerca de 86th St y Colonial Rd / Ridge Blvd).
*Nota: Es un atelier privado y residencial con atención exclusiva 1 a 1, sin el ruido ni las esperas de un salón convencional.*

🚇 Metro y Transporte:
• Tren R: Estación 86th St (a solo 5 minutos a pie bajando por 86th St).
• Buses: B1, B64, B16 y B63 tienen paradas muy cercanas.

🚗 Estacionamiento:
Hay estacionamiento gratuito en la calle por Colonial Rd, Ridge Blvd y calles 85/86. Te sugerimos llegar con 5–10 minutos de anticipación para parquear cómodamente.

Te enviaré el código exacto de timbre y entrada 15 minutos antes de tu cita. ¡Te esperamos! ✨`
          : `Hi ${nameVal}! Here are the arrival details for your private appointment with IVA Nail Art:

📍 Studio Location:
Bay Ridge, Brooklyn, NY 11209 (near 86th St & Colonial Rd / Ridge Blvd).
*Please note: This is an exclusive, private residential atelier with dedicated 1-on-1 attention—no crowded salon waiting areas.*

🚇 Transit:
• R Train: 86th St station (easy 5-minute walk down 86th St).
• Buses: B1, B64, B16, B63 all stop nearby.

🚗 Driving & Parking:
Free street parking is generally readily available along Colonial Rd, Ridge Blvd, and 85th/86th St. Please allow 5-10 extra minutes for parking.

I will text you the exact building entrance and buzzer code 15 minutes before your appointment. See you soon! ✨`,
    },
    {
      id: "reminder",
      title: lang === "es" ? "3. Recordatorio 24h y Tolerancia (15 min)" : "3. 24-Hour Reminder & 15-Min Grace Period",
      badge: lang === "es" ? "Confirmación" : "24h Notice",
      icon: Clock,
      color: "from-emerald-500 to-teal-700",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! Un recordatorio cariñoso de tu cita en IVA Nail Art:

📅 Fecha y Hora: ${dateVal}
💅 Servicio: ${serviceVal}

Detalles importantes:
• Puntualidad: Contamos con una tolerancia de 15 minutos para garantizar que disfrutes tu tiempo completo sin prisas.
• Preparación: Por favor ven con tus uñas al natural, o avísame con anticipación si traes producto anterior para programar el retiro.

Si necesitas reprogramar, por favor avísanos con al menos 24 horas de antelación. ¡Nos vemos mañana! 🤍`
          : `Hi ${nameVal}! Just a gentle reminder of your upcoming appointment with IVA Nail Art:

📅 Date & Time: ${dateVal}
💅 Service: ${serviceVal}

Studio Reminders:
• Punctuality: We have a 15-minute grace period to ensure we give your nails the full unhurried attention they deserve.
• Nail Prep: Please arrive with bare nails, or let me know in advance if you have acrylic or gel from another salon that requires removal.

If you need to reschedule, please let me know at least 24 hours in advance. Can't wait to see you tomorrow! 🤍`,
    },
    {
      id: "aftercare",
      title: lang === "es" ? "4. Cuidados Posteriores y Durabilidad" : "4. Nail Aftercare & Longevity Guide",
      badge: lang === "es" ? "Cuidado" : "Aftercare",
      icon: Heart,
      color: "from-rose-500 to-pink-700",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! Muchísimas gracias por visitarnos hoy, ¡tus uñas quedaron espectaculares! ✨

Aquí tienes 3 reglas de oro para mantener tu set perfecto por 3 a 4 semanas:
1. Aplica aceite de cutícula a diario (mantiene el builder gel flexible y previene desprendimientos).
2. Usa las yemas de tus dedos, no tus uñas como herramientas para abrir latas o cajas.
3. Usa guantes al limpiar con detergentes o químicos fuertes.

📖 Puedes consultar nuestra guía completa de cuidados aquí:
https://www.ivanailartny.com/es/aftercare

¡Disfruta mucho tus uñas! 💅`
          : `Hi ${nameVal}! Thank you for coming in today—your nails look absolutely stunning! ✨

Here are 3 golden rules to keep your set looking flawless for 3–4 weeks:
1. Apply cuticle oil daily (keeps builder gel flexible and prevents lifting).
2. Use the pads of your fingers, not your nails, to open cans or boxes.
3. Wear gloves when using harsh household cleaning products.

📖 Check out our complete aftercare guide here:
https://www.ivanailartny.com/aftercare

Enjoy your fresh set! 💅`,
    },
    {
      id: "review",
      title: lang === "es" ? "5. Solicitud de Reseña 5 Estrellas en Google" : "5. Post-Appointment 5-Star Review Request",
      badge: lang === "es" ? "Reseñas" : "Google Review",
      icon: Star,
      color: "from-yellow-500 to-amber-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! 🤍 ¡Me encantó consentir tus uñas hoy! Como artista independiente en Bay Ridge, las reseñas de mis clientas son el motor de mi estudio.

Si te encantó tu set, ¿podrías dedicar 60 segundos a dejarnos una reseña de 5 estrellas en Google?
⭐️ Califica aquí: https://www.ivanailartny.com/es/qr-review

Además, si subes fotos de tus uñas a Instagram, ¡etiquétanos en @iva_nailart_nyc para compartir tu look! ¡Mil gracias por tu apoyo! ✨`
          : `Hi ${nameVal}! 🤍 I loved doing your nails today! As an independent nail artist in Bay Ridge, client reviews mean the world to my small business.

If you loved your experience, would you take 60 seconds to leave a 5-star review on Google?
⭐️ Leave a review here: https://www.ivanailartny.com/qr-review

Also, if you post a photo of your fresh set on Instagram, tag @iva_nailart_nyc so I can feature you! Thank you so much for your support! ✨`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Language Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EBE8E2]">
        <div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-2xl text-[#1A1A1A]">
              {lang === "es" ? "Centro de Respuestas Rápidas para Iva" : "Iva's Quick Reply Concierge"}
            </h2>
          </div>
          <p className="text-xs text-[#7A7A7A] mt-1">
            {lang === "es"
              ? "Copia con 1 toque o abre directamente en WhatsApp o SMS para tus clientas."
              : "1-touch copy or open directly in WhatsApp or SMS with customized client info."}
          </p>
        </div>

        {/* Language Pill */}
        <div className="inline-flex p-1 bg-[#FAF9F7] rounded-xl border border-[#EBE8E2] self-start sm:self-auto">
          <button
            onClick={() => setLang("es")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              lang === "es" ? "bg-[#722F37] text-white shadow-sm" : "text-[#7A7A7A] hover:text-[#1A1A1A]"
            }`}
          >
            Español (ES)
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              lang === "en" ? "bg-[#722F37] text-white shadow-sm" : "text-[#7A7A7A] hover:text-[#1A1A1A]"
            }`}
          >
            English (EN)
          </button>
        </div>
      </div>

      {/* Client Customization Bar */}
      <div className="bg-gradient-to-br from-[#FAF9F7] to-white p-6 rounded-2xl border border-[#EBE8E2]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#B76E79]" />
          <h3 className="text-sm font-semibold text-[#1A1A1A]">
            {lang === "es" ? "Personalizar Mensajes (Opcional)" : "Customize Client Information (Optional)"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <User className="w-3 h-3" />
              {lang === "es" ? "Nombre de la Clienta" : "Client Name"}
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Camila"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {lang === "es" ? "Servicio" : "Service"}
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
            >
              <option value="Builder Gel Manicure">Builder Gel Manicure (BIAB)</option>
              <option value="Custom Nail Art Set">Custom Nail Art Set</option>
              <option value="Gel-X Extensions">Gel-X Extensions</option>
              <option value="Russian Dry Manicure">Russian Dry Manicure</option>
              <option value="Luxury Gel Pedicure">Luxury Gel Pedicure</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {lang === "es" ? "Fecha y Hora" : "Date & Time"}
            </label>
            <input
              type="text"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="e.g. Mañana a las 2:00 PM"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {lang === "es" ? "Teléfono (WhatsApp/SMS)" : "Client Phone"}
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="e.g. 929-123-4567"
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
            />
          </div>
        </div>
      </div>

      {/* 5 Template Cards */}
      <div className="space-y-4">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isCopied = copiedId === tpl.id;

          return (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-[#EBE8E2] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#EBE8E2]">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] text-sm sm:text-base">{tpl.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">{tpl.badge}</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopy(tpl.id, tpl.content)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EBE8E2] bg-white text-xs font-medium text-[#1A1A1A] hover:bg-[#FAF9F7] active:scale-95 transition-all shadow-sm"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#7A7A7A]" />}
                    <span>{isCopied ? (lang === "es" ? "¡Copiado!" : "Copied!") : (lang === "es" ? "Copiar" : "Copy")}</span>
                  </button>

                  <a
                    href={getWhatsAppLink(tpl.content)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:brightness-105 active:scale-95 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={getSmsLink(tpl.content)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EBE8E2] bg-[#FAF9F7] text-xs font-medium text-[#1A1A1A] hover:bg-white active:scale-95 transition-all"
                  >
                    <span>SMS</span>
                  </a>
                </div>
              </div>

              {/* Message Box */}
              <div className="bg-[#FAF9F7] rounded-xl p-4 border border-[#EBE8E2] text-xs text-[#2D2D2D] leading-relaxed whitespace-pre-wrap font-sans">
                {tpl.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
