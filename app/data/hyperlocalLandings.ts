/**
 * Hyperlocal Landing Pages Data for South Brooklyn Neighborhoods
 * Dyker Heights, Bensonhurst, and Sunset Park (EN / ES)
 *
 * Strict NAP and Studio Standards:
 * - Studio Location: Private Studio in Bay Ridge, Brooklyn (11209)
 * - Booking Engine: Calendly with service prefill
 * - Manual Deposit: $35 holds the dedicated slot (applied to total)
 * - Transit: Real driving and MTA transit routes (R train, B1, B64, B70, B37, B63)
 * - Official Handle: @iva_nailart_nyc | Phone: +1 (929) 625-7273
 */

export type Lang = "en" | "es";

export interface HyperlocalTransit {
  carMinutes: string;
  transitMinutes: string;
  mtaLines: string[];
  directionsSummary: string;
  parkingNote: string;
}

export interface HyperlocalCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1Top: string;
  h1Bottom: string;
  badge: string;
  intro: string;
  transitHeading: string;
  transitBody: string;
  transit: HyperlocalTransit;
  whyTitle: string;
  whyCards: { title: string; desc: string }[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: {
    title: string;
    tagline: string;
    description: string;
    calendlyPrefill: string;
  }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface HyperlocalNeighborhood {
  slug: string;
  neighborhoodEn: string;
  neighborhoodEs: string;
  zipCodes: string[];
  photoOffset: number;
  copy: Record<Lang, HyperlocalCopy>;
}

export const HYPERLOCAL_LANDINGS: HyperlocalNeighborhood[] = [
  {
    slug: "dyker-heights-nail-salon",
    neighborhoodEn: "Dyker Heights",
    neighborhoodEs: "Dyker Heights",
    zipCodes: ["11228"],
    photoOffset: 0,
    copy: {
      en: {
        metaTitle: "Nail Salon near Dyker Heights, Brooklyn | Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Looking for a luxury nail salon near Dyker Heights, Brooklyn (11228)? Private nail studio in neighboring Bay Ridge (5-8 min away). Builder gel, custom nail art & Russian-style precision. Book via Calendly.",
        eyebrow: "PRIVATE NAIL STUDIO · MINUTES FROM DYKER HEIGHTS (11228)",
        h1Top: "LUXURY NAIL ART & BUILDER GEL",
        h1Bottom: "near Dyker Heights, Brooklyn",
        badge: "5–8 Min from Dyker Heights · Private 1:1 Studio",
        intro: "Escape the hurried walk-in chop shops on 13th Avenue and 86th Street. Located just across the neighborhood border in Bay Ridge (11209), IVA Nail Art offers an unhurried, private one-on-one studio experience dedicated to flawless builder gel overlays, Russian-technique cuticle care, and bespoke hand-painted nail art with 3 to 4 weeks of retention.",
        transitHeading: "Getting Here from Dyker Heights",
        transitBody: "Our private studio is situated in Bay Ridge, right next door to Dyker Heights:",
        transit: {
          carMinutes: "5 to 8 minutes",
          transitMinutes: "10 to 15 minutes",
          mtaLines: ["B1 Bus (86th St)", "B64 Bus (Bay Ridge Ave / 13th Ave)", "B4 Bus (Bay Ridge Pkwy)"],
          directionsSummary: "Drive directly down 86th Street, 75th Street (Bay Ridge Parkway), or 84th Street straight into Bay Ridge. If taking public transit, the B1 and B64 buses take you right across 13th and 14th Avenues into the heart of Bay Ridge in just a few stops.",
          parkingNote: "Street parking is readily available around our quiet residential block in Bay Ridge.",
        },
        whyTitle: "Why Dyker Heights Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Private 1-on-1 Studio",
            desc: "Never compete with 10 acrylic stations or inhale toxic fumes. Your appointment is 100% private with Iva in a calm, sanitary luxury atelier.",
          },
          {
            title: "No-Break Builder Gel",
            desc: "Strengthen natural nails with premium European builder gel that maintains its sleek apex and flawless shine for 3–4 full weeks without lifting.",
          },
          {
            title: "Hand-Painted Fine Art",
            desc: "From 3D metallic chrome and French micro-lines to velvet cat-eye and intricate custom murals, bring your photo and get exactly that look.",
          },
          {
            title: "Transparent & Respectful Time",
            desc: "No hidden upcharges at checkout. All services are quoted in advance, starting on time with a dedicated 15-minute grace period.",
          },
        ],
        servicesTitle: "Signature Studio Services",
        servicesSubtitle: "Every service is performed with medical-grade disinfection and unhurried craftsmanship.",
        services: [
          {
            title: "Structured Builder Gel (BIAB)",
            tagline: "Natural nail reinforcement & lasting apex",
            description: "A flexible yet rock-solid gel overlay that shields brittle nails, encourages natural growth, and stays chip-free for up to a month.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Bespoke Hand-Painted Nail Art",
            tagline: "Editorial precision tailored to your style",
            description: "Custom chrome, tortoise shell, textured 3D gel, glazed donut finishes, or delicate line art painted entirely by hand.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Acrílico & Sculpted Extensions",
            tagline: "Lightweight, slender & ultra-durable length",
            description: "Modern acrylic enhancements sculpted with balanced arches and tapered sidewalls for an elegant, natural silhouette.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Luxury Waterless Gel Pedicure",
            tagline: "Podiatry-level hygienic foot care",
            description: "Deep dry cuticle cleansing, calloused skin smoothing, and high-shine gel polish in a sterile, spa-grade environment.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Dyker Heights Clients",
        faq: [
          {
            q: "How far is the studio from Dyker Heights?",
            a: "We are located right next door in Bay Ridge (11209). By car or rideshare, it is an easy 5 to 8-minute trip down 86th Street or Bay Ridge Parkway. The B1 and B64 buses connect Dyker Heights directly to our neighborhood in about 12 minutes.",
          },
          {
            q: "How do I book an appointment?",
            a: "Select your desired service on our Calendly booking calendar to choose your preferred time slot. After scheduling, Iva confirms your appointment and quotes your custom design. A $35 deposit (handled via Zelle, Apple Pay, or Venmo) locks in your time.",
          },
          {
            q: "What makes builder gel better than regular dip or gel?",
            a: "Builder gel adds structural strength and creates a smooth natural arch (apex) that prevents breakage on natural nails. It does not damage nail beds like aggressive e-filing or harsh acetone soaking often found in volume nail salons.",
          },
          {
            q: "Where is the exact studio address?",
            a: "Because IVA Nail Art is an exclusive private studio providing one-on-one attention without walk-in traffic, the exact Bay Ridge address is delivered privately via text/WhatsApp and email upon appointment confirmation.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Dyker Heights, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un estudio de uñas de lujo cerca de Dyker Heights (11228)? Estudio privado en el vecino Bay Ridge (5-8 min). Builder gel, nail art a mano y técnica rusa. Agenda por Calendly.",
        eyebrow: "ESTUDIO PRIVADO DE UÑAS · A MINUTOS DE DYKER HEIGHTS (11228)",
        h1Top: "NAIL ART DE LUJO & BUILDER GEL",
        h1Bottom: "cerca de Dyker Heights, Brooklyn",
        badge: "A 5–8 min de Dyker Heights · Atención 1 a 1",
        intro: "Olvida los salones masivos y apresurados de la 13th Avenue y 86th Street. A solo minutos en Bay Ridge (11209), IVA Nail Art te brinda una experiencia privada uno a uno dedicada al builder gel estructurado, limpieza rusa de cutícula y nail art artístico pintado a mano con 3 a 4 semanas de retención intacta.",
        transitHeading: "Cómo llegar desde Dyker Heights",
        transitBody: "Nuestro estudio privado está en Bay Ridge, justo al lado de Dyker Heights:",
        transit: {
          carMinutes: "5 a 8 minutos",
          transitMinutes: "10 a 15 minutos",
          mtaLines: ["Autobús B1 (por 86th St)", "Autobús B64 (por 13th Ave / Bay Ridge Ave)", "Autobús B4 (por Bay Ridge Pkwy)"],
          directionsSummary: "Conduce directo por 86th Street, 75th Street (Bay Ridge Parkway) o 84th Street hacia Bay Ridge. En transporte público, los autobuses B1 y B64 cruzan desde la 13th y 14th Ave directo al centro de Bay Ridge en pocas paradas.",
          parkingNote: "Estacionamiento disponible en la calle en nuestra tranquila cuadra residencial en Bay Ridge.",
        },
        whyTitle: "Por qué clientas de Dyker Heights eligen IVA Nail Art",
        whyCards: [
          {
            title: "Estudio 1 a 1 Exclusivo",
            desc: "Sin compartir espacio con 10 personas ni respirar químicos molestos. Tu cita es 100% privada con Iva en un espacio higiénico y relajante.",
          },
          {
            title: "Builder Gel sin Quiebres",
            desc: "Fortalece tus uñas naturales con gel constructor europeo que mantiene su ápice y brillo impecable durante 3 a 4 semanas sin levantamientos.",
          },
          {
            title: "Arte a Mano Alzada",
            desc: "Desde efectos cromo 3D y líneas francesas micro hasta ojo de gato y murales detallados: trae tu foto de referencia y sal con ese set exacto.",
          },
          {
            title: "Precios Transparentes",
            desc: "Sin sorpresas al pagar. Cotizamos cada set con anticipación y respetamos tus horarios con 15 minutos de tolerancia.",
          },
        ],
        servicesTitle: "Servicios de Autor",
        servicesSubtitle: "Cada tratamiento se realiza con desinfección de grado médico y atención meticulosa.",
        services: [
          {
            title: "Manicura con Builder Gel (BIAB)",
            tagline: "Refuerzo para uñas naturales y ápice perfecto",
            description: "Capa protectora que permite que tus uñas crezcan fuertes sin romperse, manteniéndose perfecta por un mes completo.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Personalizado",
            tagline: "Diseños editoriales pintados a mano",
            description: "Efectos cromo, carey, textura 3D en gel, glazed donut y trazos artísticos hechos con precisión milimétrica.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Uñas Acrílicas Esculpidas",
            tagline: "Largo elegante, ligero y duradero",
            description: "Extensiones modernas con estructura anatómica, bordes delgados y acabado completamente natural.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Rusa en Seco con Gel",
            tagline: "Cuidado podológico higiénico y spa",
            description: "Limpieza profunda de cutículas, eliminación de durezas y esmaltado en gel de alta durabilidad en ambiente estéril.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Dyker Heights",
        faq: [
          {
            q: "¿A qué distancia está el estudio de Dyker Heights?",
            a: "Estamos en el barrio vecino de Bay Ridge (11209). En auto o taxi toma de 5 a 8 minutos por 86th Street o Bay Ridge Parkway. Los autobuses B1 y B64 te conectan directo en unos 12 minutos.",
          },
          {
            q: "¿Cómo reservo mi horario?",
            a: "Selecciona tu servicio en nuestro calendario de Calendly para elegir la hora que mejor te convenga. Tras agendar, Iva confirma tu diseño y cotización. Un depósito de $35 (por Zelle, Apple Pay o Venmo) aparta tu espacio.",
          },
          {
            q: "¿Por qué el builder gel es mejor que el dip powder o acrílico tradicional?",
            a: "El builder gel aporta flexibilidad y crea un ápice natural que protege la uña de fracturas. No desgasta tu lámina ungueal con limados agresivos ni químicos abrasivos.",
          },
          {
            q: "¿Dónde está la dirección exacta?",
            a: "Al ser un estudio privado sin sala de espera pública, la dirección exacta en Bay Ridge se envía por mensaje/WhatsApp y correo tras confirmar tu cita.",
          },
        ],
        ctaPrimary: "Reservar en Calendly",
        ctaSecondary: "Escribir a @iva_nailart_nyc en Instagram",
      },
    },
  },
  {
    slug: "bensonhurst-nail-salon",
    neighborhoodEn: "Bensonhurst",
    neighborhoodEs: "Bensonhurst",
    zipCodes: ["11214"],
    photoOffset: 6,
    copy: {
      en: {
        metaTitle: "Nail Salon near Bensonhurst, Brooklyn | Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Seeking a high-end nail studio near Bensonhurst, Brooklyn (11214)? Visit IVA Nail Art in neighboring Bay Ridge (10-12 min away). Russian manicure, builder gel BIAB, bespoke nail art. Book on Calendly.",
        eyebrow: "PRIVATE NAIL STUDIO · MINUTES FROM BENSONHURST (11214)",
        h1Top: "BESPOKE NAIL ART & BUILDER GEL",
        h1Bottom: "near Bensonhurst, Brooklyn",
        badge: "10–12 Min from Bensonhurst · 1-on-1 Studio",
        intro: "Tired of noisy, rushed nail salons on 86th Street and Bay Parkway where designs chip in days? Located just a short drive or bus ride away in Bay Ridge (11209), IVA Nail Art offers a serene, private nail atelier. We specialize in precision dry manicures, long-lasting builder gel overlays, and magazine-worthy nail art that stays flawless for 3 to 4 weeks.",
        transitHeading: "Getting Here from Bensonhurst",
        transitBody: "Reaching our Bay Ridge private studio from Bensonhurst is fast and seamless:",
        transit: {
          carMinutes: "10 to 12 minutes",
          transitMinutes: "18 to 22 minutes",
          mtaLines: ["B1 Bus (direct along 86th St)", "B64 Bus (along Bay Ridge Ave / 86th St)", "D Train to 62nd St (transfer to R Train)"],
          directionsSummary: "Drive west down 86th Street or 75th Street (Bay Ridge Parkway) directly into Bay Ridge. For transit riders, the B1 bus runs straight along 86th Street into Bay Ridge without transfers, or take the D train and transfer to the R train at New Utrecht Ave / 62nd St.",
          parkingNote: "Quiet residential neighborhood in Bay Ridge with good street parking options near the studio.",
        },
        whyTitle: "Why Bensonhurst Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Undivided Attention",
            desc: "Only one client in the studio at any time. Enjoy an intimate, hygienic sanctuary with personalized music and refreshments.",
          },
          {
            title: "3–4 Week Durability",
            desc: "Our builder gel and acrylic foundations are anatomically structured to withstand typing, cooking, and daily life with zero lifting.",
          },
          {
            title: "Exact Reference Matching",
            desc: "Send your Pinterest or Instagram reference before your visit. Iva confirms the technique and recreates the artwork with surgical precision.",
          },
          {
            title: "Medical-Grade Hygiene",
            desc: "Autoclave-sterilized steel implements, single-use files and buffers, and hospital-grade surface disinfection between every client.",
          },
        ],
        servicesTitle: "Curated Studio Offerings",
        servicesSubtitle: "Premium formulations from Europe, Japan, and the USA for healthy, resilient nails.",
        services: [
          {
            title: "Builder Gel Overlay (BIAB)",
            tagline: "Natural nail growth shield",
            description: "A thick, flexible protective layer sculpted to balance your nail's arch. Prevents peeling, cracking, and corner breakage.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Custom Nail Art & Chrome",
            tagline: "Hand-crafted micro-painting & textures",
            description: "French ombré, aura airbrush effects, pearl accents, 3D gel droplets, and metallic chrome pigments.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Sculpted Acrylic Enhancements",
            tagline: "Durable length with a graceful taper",
            description: "Full sets and refills created with premium odorless monomer and fine powders. No bulky, thick tips.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Dry Russian Pedicure & Gel",
            tagline: "Hygienic foot smoothing & polish",
            description: "Gentle electronic cuticle cleaning, callus treatment, and high-gloss gel that lasts for up to 6 weeks on toes.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Bensonhurst Clients",
        faq: [
          {
            q: "How fast can I get to Bay Ridge from Bensonhurst?",
            a: "By car, Uber, or Lyft, it is typically a 10 to 12-minute drive down 86th Street. The B1 bus takes you straight into Bay Ridge along 86th Street with no transfers in approximately 20 minutes.",
          },
          {
            q: "Can I bring my own nail art inspiration?",
            a: "Absolutely! Most of our clients bring saved photos from Instagram or Pinterest. Message your idea to @iva_nailart_nyc or attach it to your Calendly notes so Iva can prepare your custom palette.",
          },
          {
            q: "What is your cancellation and deposit policy?",
            a: "A $35 deposit reserves your dedicated time and is deducted from your final bill. We ask for at least 24 hours' notice to reschedule, and we provide a 15-minute grace period on appointment day.",
          },
          {
            q: "Do you accept walk-ins?",
            a: "No, we operate strictly by advance appointment to guarantee every client has Iva's undivided focus without interruptions.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Bensonhurst, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un estudio de uñas de alta gama cerca de Bensonhurst (11214)? Ven a IVA Nail Art en Bay Ridge (10-12 min). Manicura rusa, builder gel y nail art exclusivo. Reserva en Calendly.",
        eyebrow: "ESTUDIO PRIVADO DE UÑAS · A MINUTOS DE BENSONHURST (11214)",
        h1Top: "DISEÑO DE UÑAS EXCLUSIVO & BUILDER GEL",
        h1Bottom: "cerca de Bensonhurst, Brooklyn",
        badge: "A 10–12 min de Bensonhurst · Estudio Privado 1 a 1",
        intro: "¿Cansada de salones ruidosos y con prisas en 86th Street y Bay Parkway donde tus uñas se saltan a los pocos días? Ubicado a muy poca distancia en Bay Ridge (11209), IVA Nail Art ofrece un atelier de uñas sereno y exclusivo. Nos especializamos en manicura rusa en seco, gel estructurado duradero y nail art de revista que se mantiene impecable por 3 a 4 semanas.",
        transitHeading: "Cómo llegar desde Bensonhurst",
        transitBody: "Llegar a nuestro estudio en Bay Ridge desde Bensonhurst es rápido y cómodo:",
        transit: {
          carMinutes: "10 a 12 minutos",
          transitMinutes: "18 a 22 minutos",
          mtaLines: ["Autobús B1 (directo por 86th St)", "Autobús B64 (por 86th St / Bay Ridge Ave)", "Tren D hasta 62nd St (transfer al Tren R)"],
          directionsSummary: "Conduce hacia el oeste por 86th Street o 75th Street (Bay Ridge Parkway) directo a Bay Ridge. En transporte, el autobús B1 va directo por toda la 86th Street sin necesidad de transbordos, o toma el tren D y transborda al tren R en 62nd St / New Utrecht.",
          parkingNote: "Zona residencial tranquila en Bay Ridge con facilidades de estacionamiento en la calle.",
        },
        whyTitle: "Por qué clientas de Bensonhurst prefieren IVA Nail Art",
        whyCards: [
          {
            title: "Atención Exclusiva 1 a 1",
            desc: "Una sola clienta en el estudio a la vez. Disfruta de un ambiente higiénico, relajante y con música a tu gusto.",
          },
          {
            title: "Durabilidad de 3 a 4 Semanas",
            desc: "Nuestras estructuras de builder gel y acrílico están diseñadas anatómicamente para soportar tu rutina sin quebrarse ni levantarse.",
          },
          {
            title: "Recreación Exacta de Diseños",
            desc: "Envía tu diseño de Pinterest o Instagram antes de tu cita. Iva prepara los materiales y replica el arte con exactitud milimétrica.",
          },
          {
            title: "Esterilización Médica",
            desc: "Instrumental de acero esterilizado en autoclave, limas descartables de un solo uso y desinfección profunda entre cada cita.",
          },
        ],
        servicesTitle: "Servicios Destacados",
        servicesSubtitle: "Fórmulas de gama alta de Europa, Japón y EE. UU. para el cuidado de tus uñas.",
        services: [
          {
            title: "Estructura con Builder Gel (BIAB)",
            tagline: "Escudo para el crecimiento natural",
            description: "Capa flexible y resistente que nivela la uña, construye el ápice natural y evita fracturas en las esquinas.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Personalizado & Cromo",
            tagline: "Micro-pintura a mano y texturas modernas",
            description: "Efecto glazed donut, aura con aerógrafo, perlas, detalles 3D y polvos cromo metálicos sobre bases nude.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Extensiones en Acrílico Esculpido",
            tagline: "Largo resistente y estructura fina",
            description: "Sets completos y retoques con monómero de bajo olor y polvos refinados. Sin uñas gruesas ni toscas.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Rusa en Seco con Gel",
            tagline: "Limpieza podológica profunda y esmalte",
            description: "Tratamiento de cutículas y durezas con fresas especializadas y esmaltado en gel que dura hasta 6 semanas.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Bensonhurst",
        faq: [
          {
            q: "¿Cuánto tiempo toma llegar desde Bensonhurst?",
            a: "En auto o Uber toma entre 10 y 12 minutos bajando por 86th Street. El autobús B1 recorre toda la 86th Street y te deja en Bay Ridge en unos 20 minutos sin hacer transbordo.",
          },
          {
            q: "¿Puedo llevar mi propia foto de inspiración?",
            a: "¡Por supuesto! La mayoría de nuestras clientas traen capturas de Instagram o Pinterest. Mándasela a @iva_nailart_nyc o colócala en las notas de Calendly.",
          },
          {
            q: "¿Cuál es la política de depósitos y cancelaciones?",
            a: "Un depósito de $35 reserva tu horario y se descuenta del total de tu servicio. Solicitamos al menos 24 horas de aviso para cambios y ofrecemos 15 minutos de tolerancia el día de tu cita.",
          },
          {
            q: "¿Atienden sin cita previa?",
            a: "No, trabajamos exclusivamente con cita previa para garantizarte privacidad total y cero tiempos de espera.",
          },
        ],
        ctaPrimary: "Reservar en Calendly",
        ctaSecondary: "Escribir a @iva_nailart_nyc en Instagram",
      },
    },
  },
  {
    slug: "sunset-park-nail-salon",
    neighborhoodEn: "Sunset Park",
    neighborhoodEs: "Sunset Park",
    zipCodes: ["11220", "11232"],
    photoOffset: 12,
    copy: {
      en: {
        metaTitle: "Nail Salon near Sunset Park, Brooklyn | Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Looking for a luxury private nail salon near Sunset Park, Brooklyn (11220/11232)? Just a quick R-train ride south to Bay Ridge (8-10 min). Russian manicures, builder gel, custom nail art. Book on Calendly.",
        eyebrow: "PRIVATE NAIL STUDIO · MINUTES SOUTH OF SUNSET PARK (11220/11232)",
        h1Top: "ARTISAN NAIL ART & BUILDER GEL",
        h1Bottom: "near Sunset Park, Brooklyn",
        badge: "8–10 Min via R Train · Private Studio in Bay Ridge",
        intro: "Looking for an elevated, hygienic alternative to the bustling storefront salons on 5th Avenue and 8th Avenue in Sunset Park? Located just a direct 8 to 10-minute subway or car ride south along 4th Avenue in Bay Ridge (11209), IVA Nail Art provides an exclusive one-on-one studio experience with gentle Russian dry manicures, builder gel reinforcement, and artistic hand-painted designs.",
        transitHeading: "Getting Here from Sunset Park",
        transitBody: "Transit between Sunset Park and Bay Ridge is straight and effortless:",
        transit: {
          carMinutes: "8 to 10 minutes",
          transitMinutes: "8 to 12 minutes",
          mtaLines: ["R Train (Direct south down 4th Ave)", "B37 Bus (along 3rd Ave)", "B63 Bus (along 5th Ave)"],
          directionsSummary: "Hop on the R train at 36th St, 45th St, 53rd St, or 59th St and ride just 2 to 4 stops south into Bay Ridge (Bay Ridge Ave, 77th St, or 86th St). By car, drive straight down 4th Avenue or 3rd Avenue south in under 10 minutes.",
          parkingNote: "Easy street parking in a quiet residential area of Bay Ridge.",
        },
        whyTitle: "Why Sunset Park Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Direct & Rapid Transit",
            desc: "Only 8–10 minutes down 4th Avenue on the R train or by car. Enjoy a luxury escape without leaving South Brooklyn.",
          },
          {
            title: "Natural Nail Health Priority",
            desc: "Say goodbye to damaged, paper-thin nails. Our Russian e-file cuticle care and structured builder gel foster strong natural growth.",
          },
          {
            title: "Bilingual Experience (EN/ES)",
            desc: "Consult comfortably in English or Spanish. Iva listens attentively to your design ideas and nail lifestyle needs.",
          },
          {
            title: "Uncompromising Sanitation",
            desc: "Hospital-grade sterilizers and disposable files ensure complete peace of mind, far exceeding standard high-traffic salon standards.",
          },
        ],
        servicesTitle: "Specialized Services",
        servicesSubtitle: "Flawless precision tailored for natural strength, length, and artistic expression.",
        services: [
          {
            title: "Builder Gel Manicure (BIAB)",
            tagline: "Strength, structure & 4-week shine",
            description: "Flawless Russian cuticle prep followed by self-leveling builder gel that restores nail symmetry and stops chipping.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Editorial Hand-Painted Nail Art",
            tagline: "Fine-line designs & custom pigments",
            description: "From minimalist French tips to intricate botanical illustrations, 3D chrome details, and trending velvet effects.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Sculpted Acrylics & Extensions",
            tagline: "Custom shape & enduring resilience",
            description: "Almond, coffin, square, or stiletto extensions shaped with balanced proportions for a sleek, comfortable wear.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Waterless Spa Gel Pedicure",
            tagline: "Deep clinical cleanliness & relaxation",
            description: "Thorough dry cuticle care, heel smoothing, soothing massage, and durable gel polish cured instantly.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Sunset Park Clients",
        faq: [
          {
            q: "How easy is it to take the subway from Sunset Park?",
            a: "It's the easiest trip in Brooklyn! The R train runs directly south down 4th Avenue. From 36th St, 45th St, 53rd St, or 59th St, it takes just 8 to 10 minutes to arrive in Bay Ridge.",
          },
          {
            q: "Do you speak Spanish in the studio?",
            a: "¡Sí, totalmente! Ivannía habla español e inglés con fluidez. Puedes coordinar tu diseño, cotización y cita cómodamente en tu idioma preferido.",
          },
          {
            q: "How does the $35 deposit work?",
            a: "Once you pick your time slot on Calendly, you send a $35 deposit via Zelle, Apple Pay, or Venmo. This deposit guarantees that your time slot is reserved exclusively for you, and the $35 is subtracted from your service total on the day of your appointment.",
          },
          {
            q: "What if I need to cancel or change my time?",
            a: "Simply give us 24 hours' notice by WhatsApp (+1 929-625-7273) or Instagram DM (@iva_nailart_nyc), and we will gladly transfer your deposit to a new available date.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Sunset Park, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un salón de uñas de lujo cerca de Sunset Park (11220/11232)? Toma el tren R hacia el sur hasta Bay Ridge (8-10 min). Manicura rusa, builder gel y nail art exclusivo. Agenda en Calendly.",
        eyebrow: "ESTUDIO PRIVADO DE UÑAS · A MINUTOS AL SUR DE SUNSET PARK (11220/11232)",
        h1Top: "ARTE EN UÑAS DE AUTOR & BUILDER GEL",
        h1Bottom: "cerca de Sunset Park, Brooklyn",
        badge: "A 8–10 min en Tren R · Estudio Privado en Bay Ridge",
        intro: "¿Buscas una alternativa higiénica, elegante y personalizada a los concurridos salones de la 5th Avenue y 8th Avenue en Sunset Park? A solo 8 a 10 minutos bajando en auto o en el tren R por la 4th Avenue hacia Bay Ridge (11209), IVA Nail Art te ofrece una experiencia exclusiva uno a uno con manicura rusa en seco, gel estructurado y diseños artísticos a mano alzada.",
        transitHeading: "Cómo llegar desde Sunset Park",
        transitBody: "El trayecto entre Sunset Park y Bay Ridge es directo y sumamente fácil:",
        transit: {
          carMinutes: "8 a 10 minutos",
          transitMinutes: "8 a 12 minutos",
          mtaLines: ["Tren R (Directo al sur por 4th Ave)", "Autobús B37 (por 3rd Ave)", "Autobús B63 (por 5th Ave)"],
          directionsSummary: "Toma el tren R en 36th St, 45th St, 53rd St o 59th St y viaja solo 2 a 4 paradas hacia el sur hasta Bay Ridge (Bay Ridge Ave, 77th St u 86th St). En auto, baja directamente por 4th Avenue o 3rd Avenue en menos de 10 minutos.",
          parkingNote: "Estacionamiento fácil en la calle en una zona residencial tranquila de Bay Ridge.",
        },
        whyTitle: "Por qué clientas de Sunset Park eligen IVA Nail Art",
        whyCards: [
          {
            title: "Conexión Directa en Tren R",
            desc: "A solo 8–10 minutos por 4th Avenue en metro o auto. Disfruta de un estudio de lujo sin alejarte del sur de Brooklyn.",
          },
          {
            title: "Cuidado de la Salud de la Uña",
            desc: "Dile adiós a las uñas quebradizas y debilitadas. Nuestra limpieza rusa y builder gel permiten que tus uñas crezcan fuertes.",
          },
          {
            title: "Atención Bilingüe (Español / Inglés)",
            desc: "Comunícate cómodamente en español. Iva escucha cada detalle de lo que buscas para que tu diseño sea exactamente lo que soñaste.",
          },
          {
            title: "Higiene Hospitalaria",
            desc: "Esterilización en autoclave y materiales descartables para una tranquilidad total, muy superior a salones de alto tráfico.",
          },
        ],
        servicesTitle: "Servicios de Estudio",
        servicesSubtitle: "Precisión impecable para fuerza natural, extensiones y diseño artístico.",
        services: [
          {
            title: "Manicura con Builder Gel (BIAB)",
            tagline: "Fuerza, estructura y brillo por 4 semanas",
            description: "Limpieza rusa de cutícula y gel nivelador que restaura la simetría de tus uñas y previene desprendimientos.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Editorial a Mano",
            tagline: "Líneas finas y pigmentos personalizados",
            description: "Francesas micro, ilustraciones botánicas, efectos 3D en cromo líquido y acabados velvet cat-eye.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Acrílico Esculpido y Extensiones",
            tagline: "Forma a medida y resistencia duradera",
            description: "Extensiones almond, coffin, cuadradas o stiletto con proporciones armónicas para un uso cómodo y ligero.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Spa en Seco con Gel",
            tagline: "Limpieza clínica profunda y relax",
            description: "Cutículas limpias en seco, talones suaves, masaje relajante y esmalte en gel con secado instantáneo.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Sunset Park",
        faq: [
          {
            q: "¿Qué tan fácil es llegar en metro desde Sunset Park?",
            a: "¡Es el trayecto más directo de Brooklyn! El tren R baja en línea recta por 4th Avenue. Desde 36th St, 45th St, 53rd St o 59th St tardas únicamente de 8 a 10 minutos en llegar a Bay Ridge.",
          },
          {
            q: "¿La atención es en español?",
            a: "¡Sí, totalmente! Ivannía habla español e inglés con fluidez. Puedes coordinar tu diseño, cotización y cita cómodamente en español.",
          },
          {
            q: "¿Cómo funciona el depósito de $35?",
            a: "Al elegir tu horario en Calendly, envías un depósito de $35 por Zelle, Apple Pay o Venmo. Esto garantiza que ese horario sea exclusivamente tuyo y se descuenta del total de tu servicio el día de la cita.",
          },
          {
            q: "¿Qué pasa si necesito reprogramar?",
            a: "Solo avísanos con al menos 24 horas de anticipación por WhatsApp (+1 929-625-7273) o Instagram DM (@iva_nailart_nyc) y transferimos tu depósito a una nueva fecha disponible.",
          },
        ],
        ctaPrimary: "Reservar en Calendly",
        ctaSecondary: "Escribir a @iva_nailart_nyc en Instagram",
      },
    },
  },
];

export function getHyperlocal(slug: string): HyperlocalNeighborhood {
  const match = HYPERLOCAL_LANDINGS.find((l) => l.slug === slug);
  if (!match) throw new Error(`Unknown hyperlocal slug: ${slug}`);
  return match;
}

export function hyperlocalPath(slug: string, lang: Lang): string {
  return lang === "en" ? `/${slug}` : `/es/${slug}`;
}
