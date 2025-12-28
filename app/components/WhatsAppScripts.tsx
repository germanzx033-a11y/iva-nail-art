"use client";

import { useState } from "react";
import { MessageCircle, Copy, Check, ChevronDown, ChevronUp, Phone, Clock, DollarSign, Heart, Shield } from "lucide-react";

interface Script {
  id: string;
  title: string;
  titleEs: string;
  scenario: string;
  scenarioEs: string;
  script: string;
  scriptEs: string;
  tips: string[];
  tipsEs: string[];
  icon: React.ElementType;
}

const WHATSAPP_SCRIPTS: Script[] = [
  {
    id: "price-objection",
    title: "Price Objection Handler",
    titleEs: "Manejo de Objeción de Precio",
    scenario: "Client asks: 'Why is it so expensive compared to others?'",
    scenarioEs: "Clienta pregunta: '¿Por qué es tan caro comparado con otros?'",
    script: `Hi [Name]! I totally understand. Brooklyn has many options, but IVA Nail Art isn't a conventional salon.

As a private studio that only receives 2 clients per day, we guarantee:
- Hospital-grade HEPA filtered air
- Medical-level sterilization between each client
- 10-Free breathable, non-toxic polishes

We apply the 'Pregnancy-Standard': if it's safe enough for a baby, it's the best for your health. Here you don't just pay for the design—you're investing in the certainty that no toxic chemicals or bacteria will enter your body.

Would you like to reserve one of the 2 spots available this week?`,
    scriptEs: `Hola [Nombre]! Te entiendo perfectamente. En Brooklyn hay muchas opciones, pero en IVA Nail Art no somos un salón convencional.

Al ser un estudio privado que solo recibe a 2 clientas por día, garantizamos:
- Aire filtrado HEPA de grado hospitalario
- Esterilización médica completa entre cada clienta
- Esmaltes 10-Free respirables y no tóxicos

Aplicamos el 'Pregnancy-Standard': si es lo suficientemente seguro para un bebé, es lo mejor para tu salud. Aquí no pagas solo por el diseño, sino por la seguridad de que ningún químico tóxico o bacteria entrará en tu cuerpo.

¿Te gustaría reservar uno de los 2 espacios de esta semana?`,
    tips: [
      "Never apologize for the price",
      "Always reinforce the biological value, not just aesthetic",
      "End with a clear call to action with scarcity",
    ],
    tipsEs: [
      "Nunca pidas disculpas por el precio",
      "Siempre refuerza el valor biológico, no solo estético",
      "Termina con un llamado a la acción con escasez",
    ],
    icon: DollarSign,
  },
  {
    id: "new-client-intro",
    title: "New Client Price Inquiry",
    titleEs: "Nueva Clienta Preguntando Precios",
    scenario: "New client asking about prices for the first time",
    scenarioEs: "Clienta nueva preguntando precios por primera vez",
    script: `Hi! So happy you reached out. At IVA we specialize in Health & Conscious Beauty Rituals.

Our main services range from $105 (The Purest Ritual - Signature) to $155 (The Maternity Sanctuary Protocol).

These are private 60-90 minute experiences where the studio is exclusively yours, guaranteeing:
- Zero cross-contamination
- Hospital-grade sterilized tools
- 10-Free products (toxin-free)
- HEPA filtered pure air

Are you looking for everyday care, or are you in a special stage like pregnancy or postpartum?`,
    scriptEs: `Hola! Qué alegría que nos contactes. En IVA nos especializamos en Rituales de Salud y Belleza Consciente.

Nuestros servicios principales van desde los $105 (Ritual Más Puro - Signature) hasta los $155 (Protocolo Santuario de Maternidad).

Son experiencias privadas de 60-90 minutos donde el estudio es solo para ti, garantizando:
- Cero contaminación cruzada
- Herramientas esterilizadas a nivel hospitalario
- Productos 10-Free (libres de tóxicos)
- Aire puro filtrado HEPA

¿Buscas algo para el cuidado diario o estás en una etapa especial como embarazo o post-parto?`,
    tips: [
      "Position as 'Rituals' not just 'services'",
      "Always mention what makes us different first",
      "Ask about their stage of life to personalize",
    ],
    tipsEs: [
      "Posiciona como 'Rituales' no solo 'servicios'",
      "Siempre menciona primero lo que nos hace diferentes",
      "Pregunta sobre su etapa de vida para personalizar",
    ],
    icon: Phone,
  },
  {
    id: "scarcity-close",
    title: "Scarcity Close",
    titleEs: "Cierre con Escasez",
    scenario: "Client is interested but hasn't committed yet",
    scenarioEs: "Clienta interesada pero no ha confirmado",
    script: `Since we only open 2 spots per day to ensure maximum air purity and complete disinfection between appointments, our calendar fills up quickly.

For this week I only have [Day] at [Time] available.

Shall we reserve it for you? I'd love to create something beautiful that also protects your health.`,
    scriptEs: `Como solo abrimos 2 espacios al día para asegurar la máxima pureza del aire y desinfección total entre citas, nuestra agenda se llena rápido.

Para esta semana solo me queda [Día] a las [Hora].

¿Lo reservamos para ti? Me encantaría crear algo hermoso que también proteja tu salud.`,
    tips: [
      "Be specific with day and time - creates urgency",
      "Always mention WHY there's scarcity (air purity, sterilization)",
      "End with emotional connection to health",
    ],
    tipsEs: [
      "Sé específica con día y hora - crea urgencia",
      "Siempre menciona POR QUÉ hay escasez (pureza del aire, esterilización)",
      "Termina con conexión emocional a la salud",
    ],
    icon: Clock,
  },
  {
    id: "pregnant-client",
    title: "Pregnant Client Inquiry",
    titleEs: "Clienta Embarazada",
    scenario: "Client mentions they're pregnant and looking for safe nail care",
    scenarioEs: "Clienta menciona que está embarazada y busca cuidado seguro",
    script: `Congratulations on your pregnancy! This is exactly why I created IVA Nail Art.

As a mother myself, I know how important it is to protect you and your baby from anything harmful. Our Maternity Sanctuary Protocol ($155-$170) was designed specifically for expecting mothers:

- Every single product is pregnancy-certified safe
- Hospital-grade air filtration captures 99.97% of particles
- Gentle lymphatic drainage to help with swelling
- Elevated positioning for your comfort
- Complimentary herbal tea throughout

If it's safe enough for your miracle in formation, it's the best care you can give yourself.

We only have 2 appointments per day—would you like me to save a spot for you this week?`,
    scriptEs: `Felicidades por tu embarazo! Es exactamente por esto que creé IVA Nail Art.

Como madre, sé lo importante que es protegerte a ti y a tu bebé de cualquier cosa dañina. Nuestro Protocolo Santuario de Maternidad ($155-$170) fue diseñado específicamente para futuras mamás:

- Cada producto está certificado como seguro para el embarazo
- Filtración de aire hospitalaria captura 99.97% de partículas
- Drenaje linfático suave para ayudar con la hinchazón
- Posición elevada para tu comodidad
- Té herbal de cortesía durante toda la sesión

Si es lo suficientemente seguro para tu milagro en formación, es el mejor cuidado que puedes darte.

Solo tenemos 2 citas por día—¿te guardo un espacio para esta semana?`,
    tips: [
      "Lead with empathy and shared experience as a mother",
      "List specific pregnancy benefits",
      "Use 'miracle' language - very emotional for expecting moms",
    ],
    tipsEs: [
      "Lidera con empatía y experiencia compartida como madre",
      "Lista beneficios específicos para el embarazo",
      "Usa el lenguaje de 'milagro' - muy emocional para futuras mamás",
    ],
    icon: Heart,
  },
  {
    id: "health-conscious",
    title: "Health-Conscious Client",
    titleEs: "Clienta Consciente de Salud",
    scenario: "Client mentions health concerns or sensitivity",
    scenarioEs: "Clienta menciona preocupaciones de salud o sensibilidad",
    script: `I completely understand your health concerns. Many of my clients come to me specifically because they've had reactions or just want to avoid unnecessary chemical exposure.

Our Recovery & Health Ritual ($135-$155) is perfect for sensitive systems:

- Hypoallergenic, fragrance-free protocol
- Extra-gentle techniques for sensitive skin
- Breathable formulas that don't trap toxins
- Post-treatment care kit included

Your biology deserves this level of care. Since we keep the studio to just 2 clients daily, we maintain clinical-level cleanliness throughout.

What specific concerns would you like me to address for your appointment?`,
    scriptEs: `Entiendo completamente tus preocupaciones de salud. Muchas de mis clientas vienen específicamente porque han tenido reacciones o simplemente quieren evitar exposición química innecesaria.

Nuestro Ritual de Recuperación y Salud ($135-$155) es perfecto para sistemas sensibles:

- Protocolo hipoalergénico, sin fragancias
- Técnicas extra-suaves para piel sensible
- Fórmulas respirables que no atrapan toxinas
- Kit de cuidado post-tratamiento incluido

Tu biología merece este nivel de cuidado. Como mantenemos el estudio a solo 2 clientas diarias, mantenemos limpieza de nivel clínico todo el tiempo.

¿Qué preocupaciones específicas te gustaría que abordara para tu cita?`,
    tips: [
      "Validate their concerns - don't dismiss",
      "Position as solution to their specific problem",
      "Ask follow-up to personalize their experience",
    ],
    tipsEs: [
      "Valida sus preocupaciones - no las descartes",
      "Posiciónate como solución a su problema específico",
      "Pregunta seguimiento para personalizar su experiencia",
    ],
    icon: Shield,
  },
];

interface WhatsAppScriptsProps {
  language: "en" | "es";
}

export default function WhatsAppScripts({ language }: WhatsAppScriptsProps) {
  const [expandedScript, setExpandedScript] = useState<string | null>("price-objection");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isEn = language === "en";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleScript = (id: string) => {
    setExpandedScript(expandedScript === id ? null : id);
  };

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#0D0D0D]">
              {isEn ? "WhatsApp Sales Scripts" : "Scripts de Ventas WhatsApp"}
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              {isEn ? "Copy-paste responses for common client situations" : "Respuestas listas para copiar en situaciones comunes"}
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-xl p-4 mb-6 border border-[#25D366]/20">
          <p className="text-sm font-medium text-[#128C7E] mb-2">
            {isEn ? "Golden Rules:" : "Reglas de Oro:"}
          </p>
          <ul className="text-sm text-[#3D3D3D] space-y-1">
            <li>• {isEn ? "Never apologize for prices - reinforce value" : "Nunca pidas disculpas por los precios - refuerza el valor"}</li>
            <li>• {isEn ? "Always mention scarcity (2 slots daily)" : "Siempre menciona la escasez (2 espacios diarios)"}</li>
            <li>• {isEn ? "Lead with health benefits, not just aesthetics" : "Lidera con beneficios de salud, no solo estética"}</li>
          </ul>
        </div>

        {/* Scripts Accordion */}
        <div className="space-y-3">
          {WHATSAPP_SCRIPTS.map((script) => {
            const Icon = script.icon;
            const isExpanded = expandedScript === script.id;
            const isCopied = copiedId === script.id;
            const scriptText = isEn ? script.script : script.scriptEs;

            return (
              <div
                key={script.id}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden
                  ${isExpanded ? "border-[#25D366] shadow-lg" : "border-[#EDE9E3] hover:border-[#25D366]/50"}`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleScript(script.id)}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${isExpanded ? "bg-gradient-to-br from-[#25D366] to-[#128C7E]" : "bg-[#F5F3F0]"}`}
                    >
                      <Icon className={`w-5 h-5 ${isExpanded ? "text-white" : "text-[#6B6B6B]"}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-[#0D0D0D]">
                        {isEn ? script.title : script.titleEs}
                      </p>
                      <p className="text-xs text-[#6B6B6B]">
                        {isEn ? script.scenario : script.scenarioEs}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#25D366]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4">
                    {/* Script Text */}
                    <div className="bg-[#FAF9F7] rounded-lg p-4 mb-4 relative">
                      <pre className="text-sm text-[#3D3D3D] whitespace-pre-wrap font-sans">
                        {scriptText}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(scriptText, script.id)}
                        className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all
                          ${isCopied
                            ? "bg-[#25D366] text-white"
                            : "bg-white text-[#6B6B6B] hover:text-[#25D366] border border-[#EDE9E3]"}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            {isEn ? "Copied!" : "Copiado!"}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            {isEn ? "Copy" : "Copiar"}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Tips */}
                    <div className="bg-[#FFF9E6] rounded-lg p-3 border border-[#FFE066]/30">
                      <p className="text-xs font-medium text-[#B8860B] mb-2">
                        {isEn ? "Pro Tips:" : "Consejos Pro:"}
                      </p>
                      <ul className="text-xs text-[#8B7355] space-y-1">
                        {(isEn ? script.tips : script.tipsEs).map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Phrases */}
        <div className="mt-8 p-4 bg-gradient-to-br from-[#722F37]/5 to-[#B76E79]/5 rounded-xl border border-[#B76E79]/20">
          <p className="font-medium text-[#722F37] mb-3">
            {isEn ? "Quick Power Phrases:" : "Frases de Poder Rápidas:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              isEn ? '"Only 2 spots available this week"' : '"Solo 2 espacios disponibles esta semana"',
              isEn ? '"Safe for miracles, essential for you"' : '"Seguro para milagros, esencial para ti"',
              isEn ? '"Healthcare for your hands"' : '"Cuidado de salud para tus manos"',
              isEn ? '"Your biology deserves this"' : '"Tu biología merece esto"',
            ].map((phrase, i) => (
              <button
                key={i}
                onClick={() => copyToClipboard(phrase.replace(/"/g, ''), `phrase-${i}`)}
                className="text-left px-3 py-2 bg-white rounded-lg text-sm text-[#3D3D3D] hover:bg-[#B76E79]/10 transition-colors border border-[#EDE9E3]"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
