# 📍 Guía de Configuración Oficial: Google Business Profile (GBP)
**Negocio:** IVA Nail Art  
**Titular / Artista Principal:** Ivannía Rodríguez  
**Coherencia NAP:** 100% Alineada con `ivanailartny.com` y metadatos JSON-LD  
**Última Actualización:** 22 de Noviembre, 2026  

---

## 1. Datos Maestros NAP (Nombre, Categoría y Contacto)

| Campo | Valor Oficial y Exacto | Justificación / Política Google |
|---|---|---|
| **Nombre Comercial (Business Name)** | `IVA Nail Art` | Cumple estrictamente las directrices de Google. **NO agregar** palabras clave adicionales (como "Nail Salon Brooklyn") en el nombre para evitar suspensión automática inmediata. |
| **Categoría Principal (Primary Category)** | `Nail salon` | Posicionamiento directo para búsquedas de alta intención (*nail salon near me*, *builder gel*, *nail art*). |
| **Categorías Secundarias (Additional Categories)** | `Beauty salon` | Permite aparecer en búsquedas más amplias de estética y cuidado personal en Brooklyn. |
| **Tipo de Empresa (Business Model)** | **Service Area Business (SAB)** — Empresa de Área de Servicio | **Estudio privado por cita previa.** No tiene letrero comercial exterior en la fachada, por lo que **NO se debe mostrar la dirección residencial al público**. Si muestras la dirección de casa sin local a la calle, Google suspenderá la ficha. |
| **Dirección Pública (Street Address)** | **OCULTA / CLEAR ADDRESS** | Google solicita la dirección postal durante la verificación interna pero debe marcarse la opción: *"No, solo atiendo clientes en sus ubicaciones o por cita sin mostrador público"* para que el mapa muestre el área sombreada. |
| **Áreas de Servicio Configuradas (Service Areas)** | • **Bay Ridge, Brooklyn, NY (11209)** *(Sede principal)*<br>• **Dyker Heights, Brooklyn, NY (11228)**<br>• **Bensonhurst, Brooklyn, NY (11214)**<br>• **Sunset Park, Brooklyn, NY (11220, 11232)** | Cobertura hiperlocal en un radio de 5 a 12 minutos de transporte en el sur de Brooklyn. |
| **Teléfono Oficial** | `+1 (929) 625-7273` | Idéntico al teléfono en la web (`tel:+19296257273`) y en los datos estructurados Schema.org. |
| **Sitio Web Oficial** | `https://ivanailartny.com` | Dominio seguro con HTTPS y DNS oficial en Vercel. |
| **Enlace Oficial de Citas (Appointment URL)** | `https://calendly.com/iva_nailart_nyc` *(o `https://ivanailartny.com`)* | Conecta directo al embudo de reservas sin pasarelas de terceros confusas. |
| **Red Social Oficial** | `https://instagram.com/iva_nailart_nyc` | Handle oficial verificado `@iva_nailart_nyc`. |

---

## 2. Horarios Oficiales de Atención (Operating Hours)

Configurados en base a la disponibilidad real de Iva y coincidentes con `app/layout.tsx` y `LocalSeoSchema.tsx`:

* **Lunes a Viernes:** `5:30 PM – 10:00 PM` (17:30 – 22:00)
* **Sábados y Domingos:** `10:00 AM – 10:00 PM` (10:00 – 22:00)
* **Atributos especiales:**
  * ✅ *Requiere cita previa (Appointment required)*
  * ✅ *Atendido por mujeres (Identifies as women-owned)*
  * ✅ *Sanitización entre clientes (Sanitized between appointments)*
  * ✅ *Pagos aceptados:* Pagos móviles (Zelle, Apple Pay, Venmo) y efectivo. *Sin Stripe en web por ahora.*

---

## 3. Descripción Oficial Aprobada para GBP (750 Caracteres)

Copia y pega este texto exacto en el campo **Descripción de la empresa** de Google Business:

> IVA Nail Art es un estudio privado y exclusivo de manicura y nail art ubicado en Bay Ridge, Brooklyn (11209), atendiendo a clientas de Bay Ridge, Dyker Heights, Bensonhurst y Sunset Park. Especializado en manicura estructurada con Builder Gel (BIAB), extensiones en acrílico esculpido, pedicura rusa en seco y diseños de autor pintados a mano alzada (cromo 3D, micro-french, velvet cat-eye). 
> 
> A diferencia de salones convencionales de alto volumen, aquí disfrutas de una atención 1 a 1 sin prisas, sin esperas y con esterilización de grado hospitalario. Cada servicio se cotiza de forma personalizada con un depósito de $35 que asegura tu horario exclusivo. Reserva tu cita online vía Calendly o contáctanos por Instagram @iva_nailart_nyc o WhatsApp al +1 (929) 625-7273.

*(Versión en Inglés por si tu cuenta está configurada en idioma inglés):*
> IVA Nail Art is an exclusive private nail atelier in Bay Ridge, Brooklyn (11209), welcoming clients from Bay Ridge, Dyker Heights, Bensonhurst, and Sunset Park. Specializing in European structured Builder Gel (BIAB), sculpted acrylic enhancements, waterless Russian gel pedicures, and bespoke hand-painted nail art (3D chrome, micro-french, velvet cat-eye). 
> 
> Unlike crowded walk-in salons, enjoy an unhurried, 1-on-1 private experience with hospital-grade sterilization. Every set is personally quoted with a $35 deposit securing your dedicated time slot. Book via Calendly or reach out directly on Instagram @iva_nailart_nyc or WhatsApp at +1 (929) 625-7273.

---

## 4. Catálogo de los 5 Servicios Clave en GBP

Configura cada uno en la sección **Servicios (Services)** de Google Business:

1. **Structured Builder Gel Manicure (BIAB)**
   * **Categoría:** Nail salon
   * **Tipo de precio:** Precio a consultar (Free quote) / A partir de depósito de $35
   * **Descripción:** Refuerzo estructural para uñas naturales con gel constructor de alta gama europea. Crea un ápice anatómico perfecto, previene fracturas y garantiza entre 3 y 4 semanas de retención intacta. Incluye manicura rusa con fresas para una limpieza profunda de cutículas.

2. **Bespoke Hand-Painted Nail Art**
   * **Categoría:** Nail salon
   * **Tipo de precio:** Precio a consultar según complejidad
   * **Descripción:** Diseños artísticos personalizados y recreación exacta de referencias de Instagram y Pinterest. Especialidad en efecto cromado 3D, carey, líneas francesas micro-precisas, ojos de gato velvet y arte botánico a mano alzada.

3. **Sculpted Acrylic Full Set & Refills**
   * **Categoría:** Nail salon
   * **Tipo de precio:** Precio a consultar
   * **Descripción:** Extensiones en acrílico esculpido con molde anatómico. Estructura ligera, delgada y resistente sin el aspecto tosco de los salones masivos. Formas almond, coffin, cuadradas y stiletto con equilibrio de curvatura.

4. **Waterless Russian Gel Pedicure**
   * **Categoría:** Nail salon / Spa
   * **Tipo de precio:** Precio a consultar
   * **Descripción:** Pedicura higiénica en seco de nivel podológico. Limpieza detallada del canal ungueal, retiro seguro de durezas y esmaltado en gel de larga duración (hasta 6 semanas) en un entorno 100% estéril.

5. **Nail Art Consultation & Custom Quote**
   * **Categoría:** Beauty salon
   * **Tipo de precio:** Gratis / Cotización previa
   * **Descripción:** Asesoría personalizada 1 a 1 para evaluar el estado de tus uñas naturales, planificar tu diseño ideal y confirmar tu presupuesto exacto antes de tu cita.

---

## 5. Instrucciones para la Verificación sin Suspensión (Paso a Paso)

1. **Crear o Abrir la Ficha:** Ingresa a [google.com/business](https://www.google.com/business) con la cuenta de Gmail del estudio (`germanzx033@gmail.com` o la cuenta de Ivannía).
2. **Seleccionar Modelo SAB:** Cuando pregunte si tienes una tienda física abierta al público, selecciona **"No"** (o "Solo presto servicios en el área local / citas").
3. **Ingresar la Dirección Privada para la Verificación:** Google pedirá una dirección postal para enviarte un código o verificar por video. Ingresa la dirección de Bay Ridge. **No te preocupes:** si marcaste que no atiendes en mostrador, Google NO publicará el número de calle ni el piso en el mapa.
4. **Definir Áreas de Servicio:** Agrega explícitamente:
   * *Bay Ridge, Brooklyn, NY 11209*
   * *Dyker Heights, Brooklyn, NY 11228*
   * *Bensonhurst, Brooklyn, NY 11214*
   * *Sunset Park, Brooklyn, NY 11220*
   * *Sunset Park, Brooklyn, NY 11232*
5. **Subir las Fotos Iniciales:** Sube las fotos de sets reales del estudio (las mismas de la web en `public/images/`).
6. **Publicar el Primer Google Post:** Usa uno de los posts del archivo `docs/GOOGLE_BUSINESS_AND_INSTAGRAM_POSTS.md`.
