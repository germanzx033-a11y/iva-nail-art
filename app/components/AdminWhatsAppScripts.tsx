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
  Crown,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

export default function AdminWhatsAppScripts() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("Builder Gel Manicure");
  const [dateTime, setDateTime] = useState("Mañana a las 2:00 PM");
  const [clientPhone, setClientPhone] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
      category: "booking",
      title: lang === "es" ? "1. Solicitud de Depósito de $35 (Reserva)" : "1. $35 Deposit Request & Payment Info",
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
      category: "booking",
      title: lang === "es" ? "2. Ubicación, Llegada y Parking Gratuito" : "2. Studio Location, Transit & Free Parking",
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
      category: "booking",
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
      id: "bridal",
      category: "services",
      title: lang === "es" ? "4. Consulta Nupcial & Paquetes de Bodas" : "4. Bridal Nails & Wedding Consultation",
      badge: lang === "es" ? "Novias" : "Bridal",
      icon: Sparkles,
      color: "from-rose-400 to-amber-600",
      content:
        lang === "es"
          ? `¡Felicidades por tu compromiso, ${nameVal}! 💍 Nos encantaría ser parte de tu gran día.

En IVA Nail Art ofrecemos un ritual nupcial exclusivo diseñado para que tus uñas luzcan impecables desde el altar hasta tu luna de miel:
✨ Paquete Novia Solo (Cotización a medida): Manicura rusa completa, nivelación con builder gel europeo, arte nupcial a medida (Glazed Pearl, Micro-French, Velvet Silk) y Garantía de 4 semanas para Luna de Miel.
✨ Paquete Novia & Dama / Mamá (Cotización a medida): Sesión privada y champaña.

👰 Puedes ver nuestra guía de cuenta regresiva y estilos aquí:
https://ivanailartny.com/es/bridal-nails-brooklyn

¿Cuál es la fecha de tu boda? Te ayudamos a programar tu prueba y el set definitivo con la antelación ideal 🤍`
          : `Congratulations on your upcoming wedding, ${nameVal}! 💍 We would be honored to be part of your bridal journey.

At IVA Nail Art, our bridal nail ritual is crafted for timeless elegance and lasting wear:
✨ Solo Bride Ritual (Bespoke Quote): Complete Russian dry cuticle prep, European builder gel apex leveling, bespoke bridal art (Glazed Pearl, Hand-painted Micro-French, Velvet Silk), and our 4-Week Honeymoon Retention Guarantee.
✨ Bride & Maid of Honor Duo (Bespoke Quote): Private salon takeover.

👰 View our complete bridal countdown guide and lookbook here:
https://ivanailartny.com/bridal-nails-brooklyn

What date is your wedding? Let's map out your trial set and final appointment timing! 🤍`,
    },
    {
      id: "winter",
      category: "services",
      title: lang === "es" ? "5. Colección de Invierno y Fiestas de Fin de Año" : "5. Winter & Holiday Nail Art Inquiry",
      badge: lang === "es" ? "Temporada" : "Winter 2025",
      icon: Calendar,
      color: "from-sky-500 to-indigo-700",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! ❄️ Ya lanzamos nuestra Colección Editorial de Invierno y Fin de Año en IVA Nail Art.

Presentamos 6 estilos exclusivos de temporada:
✨ Midnight Emerald Velvet (efecto terciopelo magnético)
✨ Champagne Frost & Láminas de Oro 24K
✨ Bordeaux Glazed Cherry (rojo vino con brillo vítreo)
✨ Gotas y lazos 3D en cromo fundido

❄️ Explora las fotos y tendencias completas aquí:
https://ivanailartny.com/es/winter-collection

*Aviso:* Los cupos para la semana de Navidad y Fin de Año son limitados y se reservan rápido. ¿Te gustaría apartar tu fecha hoy mismo? 💅`
          : `Hi ${nameVal}! ❄️ Our 2025/2026 Winter & Holiday Editorial Lookbook is officially live at IVA Nail Art!

Explore our 6 signature seasonal looks:
✨ Midnight Emerald Velvet (magnetic cat-eye sheen)
✨ Champagne Frost & 24K Gold Leaf
✨ Bordeaux Glazed Cherry (ultra-gloss mirror red)
✨ Sculptural 3D Molten Metallic Ribbons

❄️ View the complete lookbook here:
https://ivanailartny.com/winter-collection

*Note:* Holiday and New Year's Eve appointment slots fill quickly. Would you like to reserve your preferred date and time today? 💅`,
    },
    {
      id: "inspo",
      category: "services",
      title: lang === "es" ? "6. Cotización de Diseño & Envío de Foto Inspo" : "6. Custom Nail Art Inspo & Quote Request",
      badge: lang === "es" ? "Cotización" : "Art Quote",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! 🎨 ¡Me encanta crear diseños personalizados!

Para darte una cotización exacta y apartar el tiempo adecuado en tu cita, por favor envíame:
1. Una foto de referencia o captura de pantalla de lo que tienes en mente (Instagram o Pinterest).
2. Si prefieres hacerlo sobre tus uñas naturales con Builder Gel, o si deseas extensiones Gel-X para mayor longitud.
3. El estado actual de tus uñas (¿tienes acrílico o gel anterior?).

Te responderé en breve con el nivel de arte correspondiente y la disponibilidad. ¡Gracias! ✨`
          : `Hi ${nameVal}! 🎨 I would love to bring your nail art vision to life!

To provide an accurate quote and ensure we book the right amount of time for your appointment, please send over:
1. An inspiration photo or screenshot (from Instagram, Pinterest, etc.).
2. Whether you'd like this over your natural nails with Builder Gel, or with Gel-X extensions for extra length.
3. Your current nail state (do you have previous gel/acrylic that needs safe removal?).

I'll reply promptly with the design tier and available time slots. Can't wait! ✨`,
    },
    {
      id: "refill",
      category: "loyalty",
      title: lang === "es" ? "7. Recordatorio Amigable de Retoque (3-4 semanas)" : "7. 3-4 Week Nail Health Refill Alert",
      badge: lang === "es" ? "Retoque" : "Refill Due",
      icon: RefreshCw,
      color: "from-orange-500 to-amber-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! 🤍 Han pasado casi 4 semanas desde tu última cita en IVA Nail Art. ¡Esperamos que hayas amado tu set!

🌸 Recordatorio de salud de la uña: Cuando el builder gel crece más de 4 semanas, el centro de gravedad (ápice) se desplaza hacia la punta, ejerciendo palanca sobre tu uña natural y aumentando el riesgo de quiebres o levantamientos.

📅 Puedes apartar tu retoque fácilmente desde nuestro calendario:
https://ivanailartny.com/es

¡Nos encantará verte de nuevo para renovar tu brillo y mantener tus uñas fuertes! 💅`
          : `Hi ${nameVal}! 🤍 It's been almost 4 weeks since your last appointment with IVA Nail Art. We hope you've been loving your set!

🌸 Nail Health Reminder: When builder gel grows past 4 weeks, the structural apex shifts toward the free edge, placing extra leverage on your natural nail and increasing the risk of breakage or lifting.

📅 You can easily book your refill session online here:
https://ivanailartny.com

We'd love to refresh your set and keep your natural nails healthy and strong! 💅`,
    },
    {
      id: "vip",
      category: "loyalty",
      title: lang === "es" ? "8. Invitación al Pase Digital VIP & Recompensas" : "8. VIP Loyalty Pass Invitation & Referrals",
      badge: lang === "es" ? "Club VIP" : "Sanctuary Pass",
      icon: Crown,
      color: "from-amber-600 to-yellow-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! ✨ Queremos agradecerte por ser parte de nuestra comunidad en IVA Nail Art.

🎁 Ya está activo tu Pase Digital de Fidelidad del Sanctuary Circle:
• Acumula 1 sello digital en cada visita a nuestro estudio.
• En tu 6ta visita, ¡recibes una manicura de autor de cortesía!
• Comparte tu enlace personal con amigas: ellas reciben $15 de descuento en su primera visita y tú ganas $15 de crédito.

💳 Abre y guarda tu pase digital directamente en tu celular aquí:
https://ivanailartny.com/es/vip-club

¡Gracias por tu lealtad! 🤍`
          : `Hi ${nameVal}! ✨ Thank you for being such a wonderful part of IVA Nail Art.

🎁 Your digital Sanctuary Circle Loyalty Pass is now ready:
• Collect 1 digital stamp at each studio appointment.
• On your 6th visit, receive a complimentary signature nail ritual!
• Share your personal link with friends: they get $15 off their first set, and you get $15 credit.

💳 View and save your digital pass right on your phone here:
https://ivanailartny.com/vip-club

Thank you for your ongoing support! 🤍`,
    },
    {
      id: "aftercare",
      category: "aftercare",
      title: lang === "es" ? "9. Cuidados Posteriores y 3 Reglas de Oro" : "9. Nail Aftercare & Longevity Guide",
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
https://ivanailartny.com/es/aftercare

¡Disfruta mucho tus uñas! 💅`
          : `Hi ${nameVal}! Thank you for coming in today—your nails look absolutely stunning! ✨

Here are 3 golden rules to keep your set looking flawless for 3–4 weeks:
1. Apply cuticle oil daily (keeps builder gel flexible and prevents lifting).
2. Use the pads of your fingers, not your nails, to open cans or boxes.
3. Wear gloves when using harsh household cleaning products.

📖 Check out our complete aftercare guide here:
https://ivanailartny.com/aftercare

Enjoy your fresh set! 💅`,
    },
    {
      id: "review",
      category: "aftercare",
      title: lang === "es" ? "10. Solicitud de Reseña 5 Estrellas en Google" : "10. Post-Appointment 5-Star Review Request",
      badge: lang === "es" ? "Reseñas" : "Google Review",
      icon: Star,
      color: "from-yellow-500 to-amber-600",
      content:
        lang === "es"
          ? `¡Hola ${nameVal}! 🤍 ¡Me encantó consentir tus uñas hoy! Como artista independiente en Bay Ridge, las reseñas de mis clientas son el motor de mi estudio.

Si te encantó tu set, ¿podrías dedicar 60 segundos a dejarnos una reseña de 5 estrellas en Google?
⭐️ Califica aquí: https://ivanailartny.com/es/qr-review

Además, si subes fotos de tus uñas a Instagram, ¡etiquétanos en @iva_nailart_nyc para compartir tu look! ¡Mil gracias por tu apoyo! ✨`
          : `Hi ${nameVal}! 🤍 I loved doing your nails today! As an independent nail artist in Bay Ridge, client reviews mean the world to my small business.

If you loved your experience, would you take 60 seconds to leave a 5-star review on Google?
⭐️ Leave a review here: https://ivanailartny.com/qr-review

Also, if you post a photo of your fresh set on Instagram, tag @iva_nailart_nyc so I can feature you! Thank you so much for your support! ✨`,
    },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory = categoryFilter === "all" || tpl.category === categoryFilter;
    const matchesSearch =
      searchQuery === "" ||
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Language Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EBE8E2]">
        <div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-2xl text-[#1A1A1A]">
              {lang === "es" ? "Centro de Respuestas Rápidas para Ivannía" : "Ivannía's Quick Reply Concierge"}
            </h2>
          </div>
          <p className="text-xs text-[#7A7A7A] mt-1">
            {lang === "es"
              ? "10 plantillas automatizadas: personaliza datos y envía directo a WhatsApp o SMS con 1 clic."
              : "10 automated templates: customize client info and send directly to WhatsApp or SMS in 1 click."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              lang === "es" ? "bg-[#722F37] text-white shadow-sm" : "bg-gray-100 text-[#7A7A7A] hover:bg-gray-200"
            }`}
          >
            Español (ES)
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              lang === "en" ? "bg-[#722F37] text-white shadow-sm" : "bg-gray-100 text-[#7A7A7A] hover:bg-gray-200"
            }`}
          >
            English (EN)
          </button>
        </div>
      </div>

      {/* Live Customizer Controls */}
      <div className="bg-gradient-to-br from-[#FAF9F7] to-white p-5 rounded-2xl border border-[#EBE8E2] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#722F37] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{lang === "es" ? "Personalizar Datos de la Clienta (En tiempo real)" : "Live Client Personalization"}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] block mb-1">
              {lang === "es" ? "Nombre de la clienta:" : "Client Name:"}
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === "es" ? "ej. Camila" : "e.g. Jessica"}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] block mb-1">
              {lang === "es" ? "Teléfono (WhatsApp/SMS):" : "Phone (US 10 digits):"}
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === "es" ? "ej. 929-123-4567" : "e.g. 929-123-4567"}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] block mb-1">
              {lang === "es" ? "Fecha y hora de la cita:" : "Appointment Date & Time:"}
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === "es" ? "ej. Jueves 15 a las 3:00 PM" : "e.g. Thursday 15 at 3:00 PM"}
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7A7A7A] block mb-1">
              {lang === "es" ? "Servicio a realizar:" : "Service Selected:"}
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            >
              <option value="Builder Gel Manicure">Builder Gel Manicure (BIAB)</option>
              <option value="Russian Dry Hardware Manicure">Russian Dry Manicure</option>
              <option value="Bespoke Nail Art Set">Bespoke Nail Art Set</option>
              <option value="Après Gel-X Extensions">Après Gel-X Extensions</option>
              <option value="Luxury Russian Dry Pedicure">Luxury Dry Pedicure</option>
              <option value="Bespoke Bridal Nail Ritual">Bridal Nail Ritual</option>
              <option value="Winter Holiday Lookbook Set">Winter Holiday Set</option>
            </select>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200/60">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {[
              { id: "all", label: lang === "es" ? "Todos (10)" : "All (10)" },
              { id: "booking", label: lang === "es" ? "Depósito & Llegada" : "Deposit & Arrival" },
              { id: "services", label: lang === "es" ? "Novias & Invierno" : "Bridal & Winter" },
              { id: "loyalty", label: lang === "es" ? "Retoques & VIP" : "Refills & VIP" },
              { id: "aftercare", label: lang === "es" ? "Cuidados & Reseñas" : "Aftercare & Reviews" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat.id
                    ? "bg-[#722F37] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === "es" ? "Buscar plantilla..." : "Search templates..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          const isCopied = copiedId === template.id;

          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-[#EBE8E2] p-5 shadow-sm hover:shadow-md transition-shadow space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white shrink-0 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#1A1A1A] font-medium">{template.title}</h3>
                    <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                      {template.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(template.id, template.content)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppLink(template.content)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={getSmsLink(template.content)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-black text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>SMS</span>
                  </a>
                </div>
              </div>

              {/* Message Box */}
              <div className="bg-[#FAF9F7] rounded-xl p-4 border border-[#EBE8E2] text-xs text-[#2A2A2A] font-sans whitespace-pre-line leading-relaxed">
                {template.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
