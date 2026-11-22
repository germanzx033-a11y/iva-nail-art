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
  {
    slug: "park-slope-nail-salon",
    neighborhoodEn: "Park Slope",
    neighborhoodEs: "Park Slope",
    zipCodes: ["11215", "11217"],
    photoOffset: 3,
    copy: {
      en: {
        metaTitle: "Luxury Nail Salon near Park Slope, Brooklyn | Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Searching for a luxury nail salon near Park Slope, Brooklyn (11215, 11217)? Private atelier in nearby Bay Ridge (12 min on R train). Custom nail art, European builder gel & Russian manicure. Book on Calendly.",
        eyebrow: "PRIVATE NAIL ATELIER · 12 MIN ON THE R TRAIN FROM PARK SLOPE",
        h1Top: "BESPOKE NAIL ART & BUILDER GEL",
        h1Bottom: "near Park Slope, Brooklyn",
        badge: "Direct R Train Down 4th Ave · Private 1:1 Sanctuary",
        intro: "Tired of the hurried, noisy walk-in salons along 5th and 7th Avenues in Park Slope? Just a quick 12-minute direct ride down 4th Avenue brings you to IVA Nail Art in Bay Ridge. Step into an unhurried, serene private studio where your nails receive uninterrupted master craftsmanship—from strengthening European builder gel (BIAB) overlays to delicate hand-painted fine art and Russian dry cuticle care.",
        transitHeading: "Getting Here from Park Slope",
        transitBody: "Our private studio is easily accessible from Park Slope via direct transit or a quick drive:",
        transit: {
          carMinutes: "12 to 15 minutes",
          transitMinutes: "12 to 18 minutes",
          mtaLines: ["R Train (Direct down 4th Ave from Union St, 9th St & Prospect Ave)", "B63 Bus (5th Ave straight to Bay Ridge)", "B37 Bus (3rd Ave)"],
          directionsSummary: "Hop on the R train at Union Street, 9th Street, or Prospect Avenue and ride directly south along 4th Avenue straight into Bay Ridge (86th St or Bay Ridge Ave)—no transfers needed. Driving from Park Slope is a smooth 12 to 15-minute trip down 4th Avenue or via the Gowanus Expressway.",
          parkingNote: "Street parking is significantly more relaxed and available around our quiet Bay Ridge residential block than the busy avenues of Park Slope.",
        },
        whyTitle: "Why Park Slope Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Private 1-on-1 Studio",
            desc: "Escape chaotic multi-chair salons. Enjoy a quiet, private sanctuary dedicated solely to you and your nails with zero toxic acrylic fumes.",
          },
          {
            title: "Zero-Lifting Builder Gel (BIAB)",
            desc: "Reinforce brittle natural nails with premium European structured gel that promotes natural growth and lasts 3–4 weeks without chipping.",
          },
          {
            title: "Editorial Fine Nail Art",
            desc: "Hand-painted micro-French, glazed donut chrome, 3D textures, cat-eye velvets, and custom artwork tailored precisely to your style.",
          },
          {
            title: "Hospital-Grade Hygiene",
            desc: "Sterilized medical-grade implements, Russian dry e-file protocol, and single-use buffers for immaculate nail health.",
          },
        ],
        servicesTitle: "Signature Studio Services",
        servicesSubtitle: "Every service is delivered with medical-grade disinfection and unhurried artisan care.",
        services: [
          {
            title: "Structured Builder Gel (BIAB)",
            tagline: "Natural nail reinforcement & lasting apex",
            description: "A flexible yet durable European gel overlay that shields natural nails, encourages healthy growth, and stays chip-free for up to a month.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Bespoke Fine Nail Art",
            tagline: "Editorial precision tailored to your aesthetic",
            description: "Custom chrome, tortoise shell, textured 3D gel, glazed finishes, or delicate fine lines painted entirely by hand.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Sculpted Extensions & Acrílico",
            tagline: "Lightweight, slender & ultra-durable length",
            description: "Modern extensions sculpted with balanced arches and tapered sidewalls for an elegant, natural silhouette.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Luxury Waterless Gel Pedicure",
            tagline: "Podiatry-level hygienic foot care",
            description: "Deep dry cuticle cleansing, calloused skin smoothing, and high-shine gel polish in a sterile, spa-grade environment.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Park Slope Clients",
        faq: [
          {
            q: "How easy is it to reach the studio from Park Slope?",
            a: "It is one of the easiest trips in Brooklyn! The R train runs directly south along 4th Avenue. From Union St, 4th Ave/9th St, or Prospect Ave, it is a direct 12 to 15-minute ride with no transfers. By car, 4th Avenue takes about 12 minutes.",
          },
          {
            q: "Why do Park Slope clients travel to Bay Ridge for nail art?",
            a: "Commercial salons on 5th and 7th Avenues in Park Slope often rush appointments to meet high volume. At IVA Nail Art, you receive dedicated 1-on-1 private attention, Russian dry cuticle perfection, and 3 to 4-week builder gel retention without feeling rushed.",
          },
          {
            q: "How do I book an appointment and pay the deposit?",
            a: "Select your desired service on our Calendly booking calendar to reserve your time slot. A $35 deposit (handled via Zelle, Apple Pay, or Venmo) locks in your dedicated slot and is applied toward your service total.",
          },
          {
            q: "Can I bring my own design ideas or inspiration photos?",
            a: "Yes! Hand-painted custom nail art is our signature. Bring reference photos from Pinterest or Instagram, or message @iva_nailart_nyc in advance for a personalized quote.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Park Slope, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un salón de uñas exclusivo cerca de Park Slope, Brooklyn (11215, 11217)? Estudio privado en Bay Ridge (a 12 min en tren R). Manicura rusa, builder gel y nail art a mano.",
        eyebrow: "ATELIER PRIVADO DE UÑAS · A 12 MIN EN TREN R DESDE PARK SLOPE",
        h1Top: "NAIL ART EDITORIAL Y BUILDER GEL",
        h1Bottom: "cerca de Park Slope, Brooklyn",
        badge: "Tren R Directo por 4th Ave · Experiencia Privada 1 a 1",
        intro: "¿Cansada del ruido y las prisas de los salones comerciales en 5th y 7th Avenue en Park Slope? A solo 12 minutos en el tren R por 4th Avenue te espera IVA Nail Art en Bay Ridge: un espacio íntimo, privado y relajante donde cada uña se trabaja con precisión artesanal, nivelación con builder gel europeo y diseño personalizado a mano.",
        transitHeading: "Cómo llegar desde Park Slope",
        transitBody: "Nuestro estudio privado en Bay Ridge cuenta con conexión directa y rápida desde Park Slope:",
        transit: {
          carMinutes: "12 a 15 minutos",
          transitMinutes: "12 a 18 minutos",
          mtaLines: ["Tren R (Directo por 4th Ave desde Union St, 9th St y Prospect Ave)", "Bus B63 (5th Ave directo a Bay Ridge)", "Bus B37 (3rd Ave)"],
          directionsSummary: "Toma el tren R en Union St, 9th St o Prospect Ave y viaja en línea recta hacia el sur por 4th Avenue hasta Bay Ridge (86th St o Bay Ridge Ave) sin transbordos. En auto, baja por 4th Avenue o toma la autopista Gowanus en 12 a 15 minutos.",
          parkingNote: "Estacionamiento en la calle mucho más cómodo y accesible que en las congestionadas avenidas de Park Slope.",
        },
        whyTitle: "Por Qué Clientas de Park Slope Eligen IVA Nail Art",
        whyCards: [
          {
            title: "Atelier 100% Privado",
            desc: "Sin ruidos, sin prisas y sin olores químicos agresivos. Tu cita es exclusiva para ti con Ivannía en un ambiente calmo y sofisticado.",
          },
          {
            title: "Builder Gel sin Desprendimientos",
            desc: "Refuerza tus uñas naturales con gel estructurado europeo que estimula el crecimiento y dura de 3 a 4 semanas impecable.",
          },
          {
            title: "Arte a Mano Alçada",
            desc: "Efectos cromo líquido, velvet cat-eye, micro francesas y detalles botánicos o geométricos pintados a mano alzada.",
          },
          {
            title: "Esterilización de Grado Clínico",
            desc: "Protocolo de manicura rusa en seco con instrumental esterilizado en autoclave para proteger la salud de tus cutículas.",
          },
        ],
        servicesTitle: "Servicios Exclusivos de Estudio",
        servicesSubtitle: "Cada cita se realiza con higiene médica rigurosa y dedicación absoluta.",
        services: [
          {
            title: "Manicura con Builder Gel (BIAB)",
            tagline: "Fuerza, estructura y brillo por 4 semanas",
            description: "Cuidado ruso de cutículas y nivelación con gel estructurado que fortalece uñas quebradizas y previene roturas.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Editorial a Mano",
            tagline: "Diseños artísticos a tu medida",
            description: "Efecto cromo, ilustraciones botánicas, textura 3D en gel y acabados glaseados realizados con pincel fino.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Acrílico Esculpido y Extensiones",
            tagline: "Forma estilizada y máxima durabilidad",
            description: "Extensiones almond, coffin o cuadradas con estructura ligera y proporciones armónicas de gran resistencia.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Spa en Seco con Gel",
            tagline: "Limpieza profunda y máxima higiene",
            description: "Tratamiento en seco con instrumental esterilizado, exfoliación suavizante y esmaltado en gel de larga duración.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Park Slope",
        faq: [
          {
            q: "¿Qué tan fácil es llegar en metro desde Park Slope?",
            a: "¡Es un trayecto directo en el tren R! Desde las estaciones Union St, 4th Ave/9th St o Prospect Ave llegas en solo 12 a 15 minutos en línea recta por 4th Avenue sin cambiar de tren.",
          },
          {
            q: "¿Por qué viajar desde Park Slope hasta Bay Ridge para hacerse las uñas?",
            a: "Muchos salones de Park Slope atienden con prisa por el alto volumen de clientes. En IVA Nail Art recibes atención 1 a 1 en un estudio privado, manicura rusa precisa y builder gel que dura hasta 4 semanas intacto.",
          },
          {
            q: "¿Cómo funciona la reserva y el depósito de $35?",
            a: "Eliges tu servicio y horario en nuestro calendario de Calendly. Un depósito de $35 vía Zelle, Apple Pay o Venmo aparta tu cita y se descuenta del total el día del servicio.",
          },
          {
            q: "¿Puedo llevar fotos de inspiración de Pinterest o Instagram?",
            a: "¡Totalmente bienvenida! Ivannía es especialista en arte a mano alzada. Puedes traer tus fotos favoritas o escribirle a @iva_nailart_nyc para cotizar tu diseño.",
          },
        ],
        ctaPrimary: "Reservar en Calendly",
        ctaSecondary: "Escribir a @iva_nailart_nyc en Instagram",
      },
    },
  },
  {
    slug: "fort-hamilton-nail-salon",
    neighborhoodEn: "Fort Hamilton",
    neighborhoodEs: "Fort Hamilton",
    zipCodes: ["11209", "11252"],
    photoOffset: 4,
    copy: {
      en: {
        metaTitle: "Nail Salon near Fort Hamilton, Brooklyn | Luxury Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Looking for the best nail salon near Fort Hamilton, Brooklyn (11209, 11252)? Private nail atelier just 3–5 minutes away in Bay Ridge. Structured builder gel, bespoke nail art & Russian cuticle care. Book online.",
        eyebrow: "EXCLUSIVE PRIVATE NAIL STUDIO · 3–5 MIN FROM FORT HAMILTON",
        h1Top: "LUXURY BUILDER GEL & BESPOKE NAIL ART",
        h1Bottom: "near Fort Hamilton, Brooklyn",
        badge: "Immediate Neighbor · 3–5 Min from Fort Hamilton Pkwy",
        intro: "Located right around the corner in neighboring Bay Ridge (11209), IVA Nail Art is the premier private nail studio for residents and military families of Fort Hamilton. Say goodbye to rushed commercial strip salons and hello to an intimate, odor-free luxury atelier dedicated to flawless builder gel reinforcement, precision dry manicures, and custom hand-painted nail designs.",
        transitHeading: "Getting Here from Fort Hamilton",
        transitBody: "Our studio is just blocks away in the same immediate community:",
        transit: {
          carMinutes: "3 to 5 minutes",
          transitMinutes: "5 to 8 minutes",
          mtaLines: ["B16 Bus (Fort Hamilton Pkwy)", "B63 Bus (5th Ave)", "B70 Bus", "R Train (Bay Ridge - 95th St / 86th St)"],
          directionsSummary: "We are located right next door in the heart of Bay Ridge. Drive down Fort Hamilton Parkway or 4th/5th Avenue in just 3 to 5 minutes. The B16 and B63 buses connect Fort Hamilton directly to our block in minutes, or take a pleasant 10-minute neighborhood walk.",
          parkingNote: "Quiet residential street with convenient, stress-free street parking right by our private entrance.",
        },
        whyTitle: "Why Fort Hamilton Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Immediate 3–5 Min Proximity",
            desc: "Conveniently located within the 11209 district—just a quick 3 to 5-minute trip from the Fort Hamilton Parkway corridor and military base.",
          },
          {
            title: "Private Calming Atmosphere",
            desc: "Zero salon chaos, zero waiting in lines, and zero harsh acrylic smells. Enjoy a relaxing, private 1-on-1 studio experience.",
          },
          {
            title: "4-Week Builder Gel Strength",
            desc: "Natural nail reinforcement that protects your nails during busy workdays and active lifestyles without chipping or lifting.",
          },
          {
            title: "Sterile Medical-Grade Care",
            desc: "Autoclave-sterilized instruments and Russian dry e-file technique ensure your nail beds and cuticles remain healthy.",
          },
        ],
        servicesTitle: "Signature Studio Services",
        servicesSubtitle: "Every service is delivered with medical-grade disinfection and unhurried artisan care.",
        services: [
          {
            title: "Structured Builder Gel (BIAB)",
            tagline: "Natural nail reinforcement & lasting apex",
            description: "A flexible yet durable European gel overlay that shields natural nails, encourages healthy growth, and stays chip-free for up to a month.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Bespoke Fine Nail Art",
            tagline: "Editorial precision tailored to your aesthetic",
            description: "Custom chrome, tortoise shell, textured 3D gel, glazed finishes, or delicate fine lines painted entirely by hand.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Sculpted Extensions & Acrílico",
            tagline: "Lightweight, slender & ultra-durable length",
            description: "Modern extensions sculpted with balanced arches and tapered sidewalls for an elegant, natural silhouette.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Luxury Waterless Gel Pedicure",
            tagline: "Podiatry-level hygienic foot care",
            description: "Deep dry cuticle cleansing, calloused skin smoothing, and high-shine gel polish in a sterile, spa-grade environment.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Fort Hamilton Clients",
        faq: [
          {
            q: "How close is the studio to Fort Hamilton?",
            a: "We are practically neighbors in the 11209 zip code! It is an easy 3 to 5-minute drive down Fort Hamilton Parkway or 4th Avenue, or a quick ride on the B16/B63 bus.",
          },
          {
            q: "Do you offer bilingual consultations?",
            a: "Yes! Ivannía is completely fluent in both English and Spanish (atención 100% bilingüe) and provides warm, personalized care for every client.",
          },
          {
            q: "How does the $35 deposit work?",
            a: "When you schedule your service on Calendly, a $35 deposit via Zelle, Apple Pay, or Venmo reserves your dedicated appointment slot and is credited toward your final service balance.",
          },
          {
            q: "Can builder gel withstand an active or demanding lifestyle?",
            a: "Absolutely! European builder gel is significantly more durable and flexible than traditional gel polish or dip powder, resisting lifting and chipping for 3 to 4 full weeks.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Fort Hamilton, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un salón de uñas exclusivo cerca de Fort Hamilton, Brooklyn (11209, 11252)? Estudio privado a 3–5 min en Bay Ridge. Manicura rusa, builder gel y nail art. Reserva en Calendly.",
        eyebrow: "ATELIER PRIVADO DE UÑAS · A 3–5 MIN DE FORT HAMILTON (11209)",
        h1Top: "MANICURA RUSA Y BUILDER GEL",
        h1Bottom: "cerca de Fort Hamilton, Brooklyn",
        badge: "Vecinas Inmediatas · A 3–5 Min de Fort Hamilton Pkwy",
        intro: "Ubicado a pocas cuadras en Bay Ridge (11209), IVA Nail Art es el estudio privado de referencia para residentes y familias de Fort Hamilton. Olvídate de los salones comerciales ruidosos y disfruta de un atelier privado, libre de olores a acrílico, especializado en nivelación con builder gel europeo, manicura rusa en seco y arte a mano alzada.",
        transitHeading: "Cómo llegar desde Fort Hamilton",
        transitBody: "Estamos a solo unos minutos en el mismo vecindario de South Brooklyn:",
        transit: {
          carMinutes: "3 a 5 minutos",
          transitMinutes: "5 a 8 minutos",
          mtaLines: ["Bus B16 (Fort Hamilton Pkwy)", "Bus B63 (5th Ave)", "Bus B70", "Tren R (Bay Ridge - 95th St / 86th St)"],
          directionsSummary: "Estamos al lado, en el corazón de Bay Ridge. Puedes llegar en solo 3 a 5 minutos en auto bajando por Fort Hamilton Parkway o 4th/5th Avenue. Los buses B16 y B63 te dejan en nuestra cuadra en cuestión de minutos.",
          parkingNote: "Calle residencial tranquila con estacionamiento fácil y cómodo frente al estudio.",
        },
        whyTitle: "Por Qué Clientas de Fort Hamilton Eligen IVA Nail Art",
        whyCards: [
          {
            title: "Proximidad Inmediata (3–5 Min)",
            desc: "Ubicada dentro del código postal 11209, a minutos del corredor de Fort Hamilton Parkway y de la base militar.",
          },
          {
            title: "Ambiente Calmo y 1 a 1",
            desc: "Sin salas de espera llenas ni olores químicos fuertes. Un espacio relajante dedicado exclusivamente a ti y tus manos.",
          },
          {
            title: "Fuerza de 4 Semanas con BIAB",
            desc: "Refuerzo que protege tus uñas naturales contra roturas y mantiene un brillo intacto durante semanas.",
          },
          {
            title: "Higiene y Esterilización Médica",
            desc: "Instrumental quirúrgico esterilizado y técnica rusa en seco para cuidar la salud de tus cutículas sin dolor.",
          },
        ],
        servicesTitle: "Servicios Exclusivos de Estudio",
        servicesSubtitle: "Cada cita se realiza con higiene médica rigurosa y dedicación absoluta.",
        services: [
          {
            title: "Manicura con Builder Gel (BIAB)",
            tagline: "Fuerza, estructura y brillo por 4 semanas",
            description: "Cuidado ruso de cutículas y nivelación con gel estructurado que fortalece uñas quebradizas y previene roturas.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Editorial a Mano",
            tagline: "Diseños artísticos a tu medida",
            description: "Efecto cromo, ilustraciones botánicas, textura 3D en gel y acabados glaseados realizados con pincel fino.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Acrílico Esculpido y Extensiones",
            tagline: "Forma estilizada y máxima durabilidad",
            description: "Extensiones almond, coffin o cuadradas con estructura ligera y proporciones armónicas de gran resistencia.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Spa en Seco con Gel",
            tagline: "Limpieza profunda y máxima higiene",
            description: "Tratamiento en seco con instrumental esterilizado, exfoliación suavizante y esmaltado en gel de larga duración.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Fort Hamilton",
        faq: [
          {
            q: "¿Qué tan cerca está el estudio de Fort Hamilton?",
            a: "¡Estamos en el mismo vecindario (11209)! En auto tardas únicamente de 3 a 5 minutos bajando por Fort Hamilton Parkway o 4th Avenue, y los buses B16 y B63 tienen paradas directas.",
          },
          {
            q: "¿La atención es en español?",
            a: "¡Sí, totalmente! Ivannía es 100% bilingüe (español e inglés) y te atenderá con calidez y dedicación en el idioma de tu preferencia.",
          },
          {
            q: "¿Cómo se confirma la cita?",
            a: "Eliges tu servicio en Calendly. Un depósito de $35 por Zelle, Apple Pay o Venmo aparta tu cita y se descuenta del total el día del servicio.",
          },
          {
            q: "¿El builder gel resiste estilos de vida activos?",
            a: "¡Totalmente! El builder gel estructurado es mucho más flexible y resistente que el esmalte tradicional o el polvo dip, previniendo quiebres y levantamientos por 3 a 4 semanas.",
          },
        ],
        ctaPrimary: "Reservar en Calendly",
        ctaSecondary: "Escribir a @iva_nailart_nyc en Instagram",
      },
    },
  },
  {
    slug: "bath-beach-nail-salon",
    neighborhoodEn: "Bath Beach & Gravesend",
    neighborhoodEs: "Bath Beach y Gravesend",
    zipCodes: ["11214", "11223"],
    photoOffset: 5,
    copy: {
      en: {
        metaTitle: "Nail Salon near Bath Beach & Gravesend, Brooklyn | Builder Gel & Nail Art | IVA Nail Art",
        metaDescription: "Seeking a luxury nail studio near Bath Beach & Gravesend, Brooklyn (11214, 11223)? Private Bay Ridge atelier just 8–10 minutes away. Russian manicure, builder gel overlays & custom nail art. Book via Calendly.",
        eyebrow: "PRIVATE NAIL STUDIO · 8–10 MIN FROM BATH BEACH & GRAVESEND",
        h1Top: "RUSSIAN MANICURE & FINE NAIL ART",
        h1Bottom: "near Bath Beach & Gravesend, Brooklyn",
        badge: "8–10 Min via 86th St or Shore Pkwy · 1:1 Private Atelier",
        intro: "Skip the crowded volume salons along 86th Street and Bath Avenue. Just an 8 to 10-minute trip into neighboring Bay Ridge brings you to IVA Nail Art, an exclusive private studio offering Russian-technique dry cuticle care, strengthening European builder gel (BIAB) overlays, and bespoke editorial nail art with up to 4 weeks of flawless wear.",
        transitHeading: "Getting Here from Bath Beach & Gravesend",
        transitBody: "Our studio is a fast and simple commute from Bath Beach and Gravesend:",
        transit: {
          carMinutes: "8 to 10 minutes",
          transitMinutes: "12 to 16 minutes",
          mtaLines: ["B1 Bus (Direct along 86th St into Bay Ridge)", "B64 Bus (Bath Ave)", "B8 Bus (Cropsey Ave)"],
          directionsSummary: "Drive straight west along 86th Street or Cropsey Avenue, or cruise along Shore Parkway directly into Bay Ridge. By public transit, the B1 bus runs straight along 86th Street from Bath Beach directly to our neighborhood with no transfers needed.",
          parkingNote: "Ample free street parking available around our quiet residential Bay Ridge block.",
        },
        whyTitle: "Why Bath Beach Clients Choose IVA Nail Art",
        whyCards: [
          {
            title: "Private 1-on-1 Sanctuary",
            desc: "Leave the busy Bath Avenue salons behind. Enjoy a peaceful, pristine private studio with zero waiting time and zero rush.",
          },
          {
            title: "No-Chip Builder Gel (BIAB)",
            desc: "Reinforces and balances natural nail arches, delivering high-gloss European durability for 3 to 4 weeks without peeling.",
          },
          {
            title: "Custom Editorial Hand Art",
            desc: "Chrome finishes, glazed textures, 3D gel droplets, and delicate hand-painted fine art tailored to your individual style.",
          },
          {
            title: "Dry Russian Cuticle Precision",
            desc: "Painless electronic cuticle cleaning and medical-grade sterilization for photo-ready, deep, clean nail beds.",
          },
        ],
        servicesTitle: "Signature Studio Services",
        servicesSubtitle: "Every service is delivered with medical-grade disinfection and unhurried artisan care.",
        services: [
          {
            title: "Structured Builder Gel (BIAB)",
            tagline: "Natural nail reinforcement & lasting apex",
            description: "A flexible yet durable European gel overlay that shields natural nails, encourages healthy growth, and stays chip-free for up to a month.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Bespoke Fine Nail Art",
            tagline: "Editorial precision tailored to your aesthetic",
            description: "Custom chrome, tortoise shell, textured 3D gel, glazed finishes, or delicate fine lines painted entirely by hand.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Sculpted Extensions & Acrílico",
            tagline: "Lightweight, slender & ultra-durable length",
            description: "Modern extensions sculpted with balanced arches and tapered sidewalls for an elegant, natural silhouette.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Luxury Waterless Gel Pedicure",
            tagline: "Podiatry-level hygienic foot care",
            description: "Deep dry cuticle cleansing, calloused skin smoothing, and high-shine gel polish in a sterile, spa-grade environment.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Frequently Asked Questions — Bath Beach & Gravesend Clients",
        faq: [
          {
            q: "How far is IVA Nail Art from Bath Beach and Gravesend?",
            a: "We are located in neighboring Bay Ridge (11209). By car, it takes only 8 to 10 minutes straight down 86th Street or via Shore Parkway. The B1 bus runs directly down 86th Street to our block in about 14 minutes.",
          },
          {
            q: "What makes builder gel different from standard gel manicures?",
            a: "Builder gel adds physical structural reinforcement (creating a natural apex arch) that prevents bending and breaking. It stays flawless for 3–4 weeks without chipping, peeling, or damaging natural nail plates.",
          },
          {
            q: "How do I secure an appointment?",
            a: "Choose your preferred service on our Calendly calendar. A $35 deposit (via Zelle, Apple Pay, or Venmo) confirms your appointment and is applied toward your final service cost.",
          },
          {
            q: "Where is the exact studio location?",
            a: "To ensure absolute privacy and dedicated one-on-one attention with zero walk-in traffic, the exact Bay Ridge studio address and entrance details are sent privately upon appointment confirmation.",
          },
        ],
        ctaPrimary: "Book on Calendly",
        ctaSecondary: "Message @iva_nailart_nyc on Instagram",
      },
      es: {
        metaTitle: "Salón de Uñas cerca de Bath Beach y Gravesend, Brooklyn | Builder Gel y Nail Art | IVA Nail Art",
        metaDescription: "¿Buscas un salón de uñas exclusivo cerca de Bath Beach o Gravesend, Brooklyn (11214, 11223)? Estudio privado a 8–10 min en Bay Ridge. Manicura rusa, builder gel y nail art. Reserva en Calendly.",
        eyebrow: "ATELIER PRIVADO DE UÑAS · A 8–10 MIN DE BATH BEACH Y GRAVESEND",
        h1Top: "MANICURA RUSA Y NAIL ART A MANO",
        h1Bottom: "cerca de Bath Beach y Gravesend, Brooklyn",
        badge: "8–10 Min por 86th St o Shore Pkwy · Atelier Privado 1 a 1",
        intro: "Evita los salones masivos y apresurados de 86th Street y Bath Avenue. A solo 8 a 10 minutos en Bay Ridge te espera IVA Nail Art: un exclusivo estudio privado dedicado a la manicura rusa en seco, refuerzo con builder gel europeo (BIAB) y nail art fino a mano con hasta 4 semanas de duración intacta.",
        transitHeading: "Cómo llegar desde Bath Beach y Gravesend",
        transitBody: "El trayecto desde Bath Beach y Gravesend hacia nuestro estudio en Bay Ridge es sumamente rápido:",
        transit: {
          carMinutes: "8 a 10 minutos",
          transitMinutes: "12 a 16 minutos",
          mtaLines: ["Bus B1 (Directo por 86th St a Bay Ridge)", "Bus B64 (Bath Ave)", "Bus B8 (Cropsey Ave)"],
          directionsSummary: "Conduce hacia el oeste por 86th Street, Cropsey Avenue o toma Shore Parkway directamente hacia Bay Ridge. En transporte público, el bus B1 sube en línea recta por 86th Street hasta nuestro vecindario sin transbordos.",
          parkingNote: "Estacionamiento en la calle accesible y cómodo en nuestra cuadra residencial.",
        },
        whyTitle: "Por Qué Clientas de Bath Beach Eligen IVA Nail Art",
        whyCards: [
          {
            title: "Atelier 100% Privado",
            desc: "Deja atrás los salones ruidosos y disfruta de un espacio íntimo y exclusivo sin prisas ni esperas.",
          },
          {
            title: "Builder Gel sin Quiebres",
            desc: "Nivelación y refuerzo estructural con gel europeo de alta gama que no se levanta por 3 a 4 semanas.",
          },
          {
            title: "Nail Art Personalizado",
            desc: "Líneas francesas micro, efectos cromo, velvet cat-eye y figuras detalladas dibujadas totalmente a mano.",
          },
          {
            title: "Precisión Rusa en Seco",
            desc: "Limpieza profunda de cutículas con torno e instrumental esterilizado en autoclave para un acabado limpio y duradero.",
          },
        ],
        servicesTitle: "Servicios Exclusivos de Estudio",
        servicesSubtitle: "Cada cita se realiza con higiene médica rigurosa y dedicación absoluta.",
        services: [
          {
            title: "Manicura con Builder Gel (BIAB)",
            tagline: "Fuerza, estructura y brillo por 4 semanas",
            description: "Cuidado ruso de cutículas y nivelación con gel estructurado que fortalece uñas quebradizas y previene roturas.",
            calendlyPrefill: "Builder Gel Manicure",
          },
          {
            title: "Nail Art Editorial a Mano",
            tagline: "Diseños artísticos a tu medida",
            description: "Efecto cromo, ilustraciones botánicas, textura 3D en gel y acabados glaseados realizados con pincel fino.",
            calendlyPrefill: "Custom Nail Art",
          },
          {
            title: "Acrílico Esculpido y Extensiones",
            tagline: "Forma estilizada y máxima durabilidad",
            description: "Extensiones almond, coffin o cuadradas con estructura ligera y proporciones armónicas de gran resistencia.",
            calendlyPrefill: "Acrylic Full Set",
          },
          {
            title: "Pedicura Spa en Seco con Gel",
            tagline: "Limpieza profunda y máxima higiene",
            description: "Tratamiento en seco con instrumental esterilizado, exfoliación suavizante y esmaltado en gel de larga duración.",
            calendlyPrefill: "Gel Pedicure",
          },
        ],
        faqTitle: "Preguntas Frecuentes — Clientas de Bath Beach y Gravesend",
        faq: [
          {
            q: "¿A qué distancia está el estudio desde Bath Beach?",
            a: "Estamos justo al lado en Bay Ridge (11209). En auto tardas únicamente de 8 a 10 minutos subiendo por 86th Street o por Shore Parkway, y el bus B1 conecta ambos vecindarios directamente en unos 14 minutos.",
          },
          {
            q: "¿En qué se diferencia el builder gel del esmalte en gel común?",
            a: "El builder gel crea un ápice natural que refuerza el centro de la uña para evitar que se quiebre. Dura de 3 a 4 semanas con brillo perfecto sin maltratar tus uñas naturales.",
          },
          {
            q: "¿Cómo se reserva y se envía el depósito?",
            a: "Eliges tu horario en nuestro calendario de Calendly. Un depósito de $35 vía Zelle, Apple Pay o Venmo asegura tu turno exclusivo y se deduce de tu cuenta final el día de la cita.",
          },
          {
            q: "¿Dónde se encuentra la dirección exacta del estudio?",
            a: "Para asegurar la máxima privacidad y un ambiente relajado sin clientas esperando de pie, la dirección exacta en Bay Ridge se envía de forma privada por WhatsApp y correo al confirmar la cita.",
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
