"use client";

import { useState } from "react";
import {
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Tag,
  Clock,
  Star,
  FileText,
  DollarSign,
  Share2,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function AdminGoogleMapsKit() {
  const [activeSubTab, setActiveSubTab] = useState<"nap" | "services" | "posts" | "replies">("nap");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Ignore
    }
  };

  const napData = {
    businessName: "IVA Nail Art NY",
    recommendedTitle: "IVA Nail Art NY - Russian Manicure & Luxury Nail Art Brooklyn",
    address: "7208 5th Ave, Brooklyn, NY 11209",
    neighborhood: "Bay Ridge, Brooklyn, NY",
    phone: "+1 (929) 625-7273",
    cleanPhone: "9296257273",
    website: "https://www.ivanailartny.com",
    bookingUrl: "https://www.ivanailartny.com",
    primaryCategory: "Nail salon",
    secondaryCategories: ["Manicurist", "Beauty salon", "Spa"],
    serviceAreas: [
      "Bay Ridge, Brooklyn, NY",
      "Bensonhurst, Brooklyn, NY",
      "Dyker Heights, Brooklyn, NY",
      "Sunset Park, Brooklyn, NY",
      "Bath Beach, Brooklyn, NY",
      "Fort Hamilton, Brooklyn, NY",
      "Park Slope, Brooklyn, NY",
    ],
    hours: [
      { days: "Monday - Saturday", hours: "9:00 AM - 7:00 PM (By Appointment Only)" },
      { days: "Sunday", hours: "Closed (VIP Special Events Only)" },
    ],
    shortBio:
      "Private luxury nail sanctuary in Bay Ridge, Brooklyn, founded by artist Ivannía. Specializing in flawless Russian dry manicures, structured European builder gel (BIAB), non-toxic dry pedicures, and bespoke hand-painted nail art. Dedicated 1-on-1 private appointments with medical-grade sterilization.",
  };

  const services = [
    {
      id: "russian-manicure",
      name: "Russian Dry Hardware Manicure",
      price: "$85",
      duration: "90 min",
      description:
        "Precision multi-bit dry diamond e-file cuticle detailing, micro-shearing, and natural nail preparation without soaking. Deep cuticle tucking allows polish to grow out seamlessly for 3 to 4 weeks without lifting.",
    },
    {
      id: "builder-gel",
      name: "Structured Builder Gel (BIAB / Russian Leveling)",
      price: "$110",
      duration: "105 min",
      description:
        "Complete Russian dry manicure followed by apex rebalancing with premium European builder gel. Fortifies natural nails, prevents breakage, and creates a perfectly smooth, mirror-like architectural surface.",
    },
    {
      id: "bespoke-art",
      name: "Bespoke Hand-Painted & 3D Nail Art",
      price: "$135 - $165",
      duration: "120 min",
      description:
        "Custom editorial nail art hand-crafted with fine-line Japanese brushes. Options include glazed chrome, velvet magnetic cat-eye, 3D molten metallic ribbons, pearls, and seasonal collections.",
    },
    {
      id: "gel-x-extensions",
      name: "Après Gel-X Full Set Extensions",
      price: "$130",
      duration: "105 min",
      description:
        "Full-coverage 100% soft gel extensions sculpted with gentle apex alignment. No harsh acrylic powder, no fumes, zero natural nail damage, providing instant lightweight length in custom shapes.",
    },
    {
      id: "dry-pedicure",
      name: "Luxury Russian Dry Pedicure",
      price: "$95",
      duration: "75 min",
      description:
        "Waterless podiatry-grade dry pedicure using diamond disc smoothing and gentle cuticle refinement. Eliminates rough calluses hygienic-safely without blade scraping or foot basin bacteria risks.",
    },
    {
      id: "bridal-ritual",
      name: "Bespoke Bridal & Wedding Nail Ritual",
      price: "$165 - $195",
      duration: "135 min",
      description:
        "Signature bridal treatment including full Russian hardware cuticle prep, builder gel reinforcement, handcrafted bridal art (Glazed Pearl, Micro-French, Velvet Silk), and 4-week honeymoon retention guarantee.",
    },
    {
      id: "winter-collection",
      name: "Winter & Holiday Editorial Lookbook Set",
      price: "$140",
      duration: "120 min",
      description:
        "Seasonal holiday styling featuring Midnight Emerald Velvet, Champagne Frost, Bordeaux Glazed Cherry, and Molten 3D Chrome on structured European gel. Limited seasonal openings.",
    },
    {
      id: "safe-removal",
      name: "Safe Product Removal & Keratin Rehab",
      price: "$35",
      duration: "45 min",
      description:
        "Gentle e-file debulking and Japanese foil soak-off. Never scraped or peeled, finished with organic cold-pressed jojoba keratin oil treatment to maintain natural nail plate integrity.",
    },
  ];

  const gbpPosts = [
    {
      id: "winter-post",
      type: "Offer / Seasonal Event",
      title: "❄️ Winter & Holiday Nail Art Collection 2025/2026",
      cta: "Book Online",
      content:
        "Now live at IVA Nail Art in Bay Ridge! Explore our 6 bespoke holiday looks: Midnight Emerald Velvet, Champagne Frost, and Molten 3D Mirror Chrome. Every set includes precision Russian dry cuticle detailing and unbreakable builder gel leveling. Peak holiday and New Year's Eve slots are filling fast—reserve your private 1-on-1 ritual today at ivanailartny.com/winter-collection 💅✨",
    },
    {
      id: "russian-mani-post",
      type: "Product / Service Spotlight",
      title: "✨ Why Russian Manicures Last 4 Weeks Without Chipping",
      cta: "Learn More",
      content:
        "Tired of polish peeling after 5 days? At IVA Nail Art (Bay Ridge, Brooklyn), our multi-bit dry diamond technique gently tucks cuticle skin without soaking. Combined with structured European builder gel, your nails remain flawless for 3 to 4+ weeks. Zero fumes, zero harsh acrylics. Book your private appointment at ivanailartny.com 🤍",
    },
    {
      id: "bridal-post",
      type: "Speciality / Bridal",
      title: "👰 Brooklyn Brides: Your Bespoke Wedding Nail Ritual",
      cta: "Book Online",
      content:
        "Planning your wedding in Brooklyn or NYC? Discover our 3-phase bridal countdown and signature styles: Glazed Pearl, Velvet Silk, and Handcrafted Micro-French. Every bridal set comes with our 4-Week Honeymoon Durability Guarantee so your hands look immaculate from the altar to the beach. See packages at ivanailartny.com/bridal-nails-brooklyn 💍",
    },
    {
      id: "vip-post",
      type: "Loyalty Program",
      title: "💳 Unlock Your Digital VIP Pass: The Sanctuary Circle",
      cta: "Sign Up",
      content:
        "We love our recurring clients! Join the IVA Sanctuary Circle right from your phone. Collect digital stamps on each appointment and receive a complimentary signature nail ritual on your 6th visit, plus $15 referral credits for your friends. Register free in 30 seconds at ivanailartny.com/vip-club ✨",
    },
  ];

  const reviewReplies = [
    {
      id: "reply-russian",
      scenario: "Review mentioning Russian Manicure & Retention (4+ weeks)",
      text:
        "Thank you so much for the glowing review, [Client Name]! 🤍 I'm so glad you loved the precision of your Russian dry manicure and that your structured builder gel is still holding up flawlessly. It was an absolute pleasure having you in my Bay Ridge studio. Looking forward to your next private ritual! ✨ — Ivannía, IVA Nail Art NY",
    },
    {
      id: "reply-art",
      scenario: "Review praising Hand-Painted Nail Art or 3D Chrome",
      text:
        "Thank you so much, [Client Name]! ✨ Bringing your creative nail art vision to life was such a joy. Every set is hand-crafted with precision, and I'm thrilled you're receiving so many compliments on your design. Can't wait to create your next custom set! 💅 — Ivannía, IVA Nail Art NY (Brooklyn)",
    },
    {
      id: "reply-bridal",
      scenario: "Review from a Bride or Wedding Party",
      text:
        "Congratulations on your wedding, [Client Name]! 💍 It was a true honor to create your bridal nails for your special day. Knowing your glazed set stayed flawless all the way through your honeymoon makes my heart full. Wishing you both a lifetime of happiness! 🤍 — Ivannía, IVA Nail Art NY",
    },
    {
      id: "reply-espanol",
      scenario: "Reseña en Español",
      text:
        "¡Muchísimas gracias por tu reseña y tu confianza, [Nombre de la Clienta]! 🤍 Me alegra profundamente que hayas disfrutado la atención privada y la calidad de tu manicura rusa con builder gel. ¡Será un placer recibirte nuevamente en mi atelier de Bay Ridge para consentir tus uñas! ✨ — Ivannía, IVA Nail Art NY",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Google Business Profile &amp; Local SEO Kit</h2>
                <p className="text-xs text-[#7A7A7A]">
                  Optimiza tu presencia en Google Maps y el Top 3 local de Brooklyn para captar clientas que buscan &quot;nail salon near me&quot;.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://business.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir Google Business Profile</span>
            </a>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-[#EBE8E2] pb-3 overflow-x-auto">
          {[
            { id: "nap", label: "Ficha & Categorías (NAP)", icon: Tag },
            { id: "services", label: "Catálogo de Servicios (8)", icon: Layers },
            { id: "posts", label: "Posts de Novedades (4)", icon: FileText },
            { id: "replies", label: "Respuestas a Reseñas (SEO)", icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white shadow-sm"
                  : "text-[#7A7A7A] hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= TAB 1: NAP & CATEGORIES ================= */}
      {activeSubTab === "nap" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Business Info */}
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] space-y-4">
            <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Datos Oficiales de la Empresa</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Nombre Comercial Oficial:</label>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-semibold text-gray-900">{napData.businessName}</span>
                  <button
                    onClick={() => handleCopy("name", napData.businessName)}
                    className="p-1 hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === "name" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Título Optimizado para Google Maps:</label>
                <div className="flex items-center justify-between p-2.5 bg-amber-50/50 rounded-xl border border-amber-200">
                  <span className="font-medium text-amber-950">{napData.recommendedTitle}</span>
                  <button
                    onClick={() => handleCopy("recTitle", napData.recommendedTitle)}
                    className="p-1 hover:text-amber-800 transition-colors"
                  >
                    {copiedKey === "recTitle" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Incluye &quot;Russian Manicure&quot; y &quot;Brooklyn&quot; para maximizar visibilidad en búsquedas locales.
                </p>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Dirección Física (Bay Ridge):</label>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-900">{napData.address}</span>
                  <button
                    onClick={() => handleCopy("addr", napData.address)}
                    className="p-1 hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === "addr" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Teléfono Directo / WhatsApp:</label>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-900 font-medium">{napData.phone}</span>
                  <button
                    onClick={() => handleCopy("phone", napData.phone)}
                    className="p-1 hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === "phone" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Sitio Web &amp; Enlace de Citas:</label>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-blue-600 truncate">{napData.website}</span>
                  <button
                    onClick={() => handleCopy("web", napData.website)}
                    className="p-1 hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === "web" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories & Service Areas */}
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] space-y-5">
            <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#722F37]" />
              <span>Categorías &amp; Zonas de Servicio</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Categoría Principal de Google:</label>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-semibold flex items-center justify-between">
                  <span>{napData.primaryCategory}</span>
                  <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded-full uppercase">Imprescindible</span>
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Categorías Secundarias (Añadir todas):</label>
                <div className="flex flex-wrap gap-2">
                  {napData.secondaryCategories.map((cat) => (
                    <span key={cat} className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-800 rounded-xl font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Zonas de Servicio (Service Areas):</label>
                <div className="grid grid-cols-2 gap-2">
                  {napData.serviceAreas.map((area) => (
                    <div key={area} className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#722F37]" />
                      <span className="truncate">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1">Descripción del Perfil (Bio para Google):</label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl relative">
                  <p className="text-gray-700 leading-relaxed text-[11px] pr-6">{napData.shortBio}</p>
                  <button
                    onClick={() => handleCopy("bio", napData.shortBio)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {copiedKey === "bio" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SERVICES CATALOG ================= */}
      {activeSubTab === "services" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Cómo agregarlos en Google:</strong> Abre tu perfil de Google Business Profile, ve a <strong>&quot;Editar servicios&quot;</strong> y copia y pega cada uno con su nombre, precio y descripción para que Google te posicione automáticamente cuando alguien busque ese tratamiento.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div key={svc.id} className="bg-white p-5 rounded-2xl border border-[#EBE8E2] space-y-3 relative hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-base text-[#1A1A1A] font-medium">{svc.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#722F37] bg-[#722F37]/10 px-2 py-0.5 rounded-md">
                        <DollarSign className="w-3 h-3" />
                        {svc.price}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        {svc.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(`svc-${svc.id}`, `${svc.name}\nPrecio: ${svc.price}\n${svc.description}`)}
                    className="p-1.5 bg-gray-50 hover:bg-[#722F37]/10 hover:text-[#722F37] rounded-lg transition-colors border border-gray-200 text-gray-500"
                    title="Copiar servicio completo"
                  >
                    {copiedKey === `svc-${svc.id}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: GOOGLE POSTS ================= */}
      {activeSubTab === "posts" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <Share2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p>
              <strong>Estrategia de Actualizaciones:</strong> Publicar 1 novedad a la semana en Google Maps mantiene tu ficha con el status de &quot;Activa y Verificada&quot;, subiendo de posición en el paquete de 3 mapas frente a la competencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {gbpPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-2xl border border-[#EBE8E2] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {post.type}
                    </span>
                    <span className="text-xs font-medium text-blue-600">Botón: {post.cta}</span>
                  </div>
                  <h4 className="font-serif text-base text-[#1A1A1A] font-medium">{post.title}</h4>
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(`post-${post.id}`, post.content)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-100 hover:bg-[#722F37] hover:text-white text-gray-800 text-xs font-semibold transition-all"
                >
                  {copiedKey === `post-${post.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡Copiado para Publicar!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto del Post</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: REVIEW REPLIES ================= */}
      {activeSubTab === "replies" && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
            <Star className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>Por qué importa responder con palabras clave:</strong> Google analiza las respuestas del dueño de la empresa. Al incluir términos como &quot;Russian dry manicure&quot;, &quot;structured builder gel&quot; y &quot;Bay Ridge&quot;, le dices a Google exactamente en qué búsquedas debe recomendarte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {reviewReplies.map((reply) => (
              <div key={reply.id} className="bg-white p-5 rounded-2xl border border-[#EBE8E2] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-serif text-sm text-[#1A1A1A] font-medium">{reply.scenario}</h4>
                  <div className="mt-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 leading-relaxed italic">
                    &quot;{reply.text}&quot;
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(`reply-${reply.id}`, reply.text)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-100 hover:bg-[#722F37] hover:text-white text-gray-800 text-xs font-semibold transition-all"
                >
                  {copiedKey === `reply-${reply.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Plantilla de Respuesta</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
