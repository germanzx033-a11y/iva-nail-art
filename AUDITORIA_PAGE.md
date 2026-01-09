# PROMPT DE AUDITORÍA COMPLETA - IVA Nail Art

## INSTRUCCIONES PARA REVISIÓN

Actúa como un **Senior Full-Stack Developer + UX Designer + SEO Expert** y realiza una auditoría completa de la página web de IVA Nail Art.

---

## 1. ERRORES TÉCNICOS A VERIFICAR

### Build & Compilación
- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin warnings críticos
- [ ] TypeScript sin errores de tipos
- [ ] Sin errores en consola del navegador
- [ ] Sin hydration mismatches

### Performance
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Bundle size aceptable (<500KB inicial)
- [ ] First Contentful Paint <2s
- [ ] Largest Contentful Paint <3s
- [ ] No memory leaks en componentes

### Responsive
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Touch targets mínimo 44x44px

---

## 2. UX/UI A REVISAR

### Navegación
- [ ] Header sticky funciona correctamente
- [ ] Links de navegación llevan a secciones correctas
- [ ] Toggle idioma EN/ES cambia toda la página
- [ ] Menú móvil abre/cierra correctamente

### Hero Section
- [ ] Imagen de fondo carga correctamente
- [ ] Texto legible sobre la imagen
- [ ] CTA visible y clickeable
- [ ] Información de ubicación/horario visible

### Servicios
- [ ] Tabs de categorías funcionan
- [ ] Cards muestran información correcta
- [ ] Links a WhatsApp funcionan con mensaje pre-llenado

### Galería
- [ ] Imágenes cargan correctamente
- [ ] Hover effect funciona
- [ ] Link a Instagram funciona

### Booking Wizard
- [ ] Paso 1: Selección de servicio valida antes de continuar
- [ ] Paso 2: Fecha y hora requeridos
- [ ] Paso 3: Nombre, teléfono y checkbox obligatorios
- [ ] Paso 4: Resumen muestra datos correctos
- [ ] Botón WhatsApp genera mensaje correcto

### Footer
- [ ] Logo visible
- [ ] Información de contacto correcta
- [ ] Links a redes sociales funcionan
- [ ] Copyright con año actual

---

## 3. SEO & METADATA

### Head Tags
- [ ] Title único y descriptivo
- [ ] Meta description <160 caracteres
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Favicon configurado
- [ ] Canonical URL

### Contenido
- [ ] H1 único por página
- [ ] Jerarquía de headings correcta (H1 > H2 > H3)
- [ ] Alt text en todas las imágenes
- [ ] Schema markup (LocalBusiness)

### Archivos
- [ ] robots.txt configurado
- [ ] sitemap.xml generado
- [ ] manifest.json para PWA

---

## 4. ACCESIBILIDAD (A11y)

- [ ] Contraste de colores WCAG AA
- [ ] Labels en formularios
- [ ] Aria labels en botones de icono
- [ ] Focus visible en elementos interactivos
- [ ] Skip to content link
- [ ] Navegación por teclado funcional

---

## 5. SEGURIDAD

- [ ] No exponer API keys en frontend
- [ ] Links externos con rel="noopener noreferrer"
- [ ] Inputs sanitizados
- [ ] HTTPS enforced
- [ ] Headers de seguridad configurados

---

## 6. QUÉ AGREGAR (RECOMENDACIONES)

### Alta Prioridad
- [ ] Testimonios de clientes reales
- [ ] Política de privacidad / Términos
- [ ] Google Analytics / Tag Manager
- [ ] Schema LocalBusiness estructurado

### Media Prioridad
- [ ] Sección de FAQ
- [ ] Blog con tips de nail care
- [ ] Newsletter signup
- [ ] Integración con Google Maps

### Baja Prioridad
- [ ] Chat en vivo
- [ ] Sistema de puntos/rewards
- [ ] Gift cards
- [ ] Galería con más fotos de Instagram

---

## 7. QUÉ QUITAR O MEJORAR

### Posibles Mejoras
- [ ] Simplificar si hay demasiadas animaciones
- [ ] Reducir número de colores si no son consistentes
- [ ] Consolidar fuentes (máximo 2 familias)
- [ ] Eliminar código comentado
- [ ] Remover console.logs

---

## 8. CHECKLIST PRE-DEPLOYMENT

### Código
- [ ] Variables de entorno configuradas
- [ ] .env.example actualizado
- [ ] .gitignore correcto
- [ ] README actualizado

### Vercel
- [ ] Proyecto conectado a GitHub
- [ ] Variables de entorno en Vercel
- [ ] Dominio personalizado (opcional)
- [ ] Analytics habilitado

### DNS (si aplica)
- [ ] A records configurados
- [ ] CNAME para www
- [ ] SSL activo

---

## COMANDO PARA EJECUTAR AUDITORÍA

```bash
# Build check
npm run build

# Lint check
npm run lint

# Type check
npx tsc --noEmit

# Bundle analysis (si está configurado)
npm run analyze
```

---

## INFORMACIÓN DEL NEGOCIO PARA VERIFICAR

- **Nombre**: IVA Nail Art
- **WhatsApp**: 19296257273
- **Instagram**: @iva_nailart_ny
- **TikTok**: @iva_nailart_ny
- **Ubicación**: Bay Ridge, Brooklyn, NY 11209
- **Horario**: 9:00 AM – 8:00 PM (Solo cita previa)
- **Depósito**: $35 (no reembolsable)
- **Cancelación**: Mínimo 24 horas
- **Pagos**: Cash, Zelle, Card
