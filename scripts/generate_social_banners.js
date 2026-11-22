/**
 * Generates editorial branded marketing assets for Google Business and Instagram
 * Output dimensions:
 * - Google Posts: 1200 x 900 px
 * - Instagram Feed/Carousel: 1080 x 1350 px (4:5 ratio)
 * Palette: #0E0706 (Obsidian), #D4A574 (Champagne Gold), #F4EBE1 (Alabaster)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'social-assets');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const POSTS = [
  {
    id: 'google-post-1-builder-gel',
    title: 'STRUCTURED BUILDER GEL',
    subtitle: 'Russian Cuticle Care · 3-4 Weeks Retention',
    badge: 'BAY RIDGE · PRIVATE STUDIO',
    image: 'gold-wire-pearl-nude.jpg',
    footer: 'Book on Calendly · $35 Deposit · @iva_nailart_nyc'
  },
  {
    id: 'google-post-2-custom-art',
    title: 'BESPOKE NAIL ART',
    subtitle: '3D Chrome · Micro-French · Hand-Painted',
    badge: '1:1 EXCLUSIVE APPOINTMENT',
    image: 'aurora-chrome-gold.jpg',
    footer: 'Personalized Quotes · Bay Ridge, Brooklyn · (929) 625-7273'
  },
  {
    id: 'google-post-3-dyker-bensonhurst',
    title: 'MINUTES FROM DYKER & BENSONHURST',
    subtitle: 'Quiet Sanctuary · Direct via 86th St & B1/B64',
    badge: 'SOUTH BROOKLYN COVERAGE',
    image: 'blush-aura-french.jpg',
    footer: 'Zero Rush · Private Salon Experience · ivanailartny.com'
  },
  {
    id: 'google-post-4-sunset-park',
    title: 'DIRECT VIA R TRAIN',
    subtitle: '8 Min South from Sunset Park (4th Ave)',
    badge: 'BILINGUAL STUDIO (EN/ES)',
    image: 'chocolate-cat-eye.jpg',
    footer: 'Russian Dry Manicure & Pedicure · @iva_nailart_nyc'
  },
  {
    id: 'google-post-5-sanitation',
    title: 'HOSPITAL-GRADE STERILIZATION',
    subtitle: 'Autoclave Sealed Tools · Single-Use Files',
    badge: 'HEALTH & SAFETY FIRST',
    image: 'milky-white-square.jpg',
    footer: 'Medical Cleanliness Standards · Bay Ridge 11209'
  },
  {
    id: 'google-post-6-sculpted-acrylic',
    title: 'SCULPTED EXTENSIONS',
    subtitle: 'Anatomic Apex · Slender, Durable Form',
    badge: 'NO BULKY ACRYLICS',
    image: 'tortoiseshell-french-tips.jpg',
    footer: 'Reserve via Calendly · $35 Holds Your Slot'
  }
];

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function createGooglePost(post) {
  const width = 1200;
  const height = 900;
  const photoPath = path.join(__dirname, '..', 'public', 'gallery', post.image);
  
  // Resize photo for the right-hand showcase (550 x 750)
  const photoBuffer = await sharp(photoPath)
    .resize(520, 720, { fit: 'cover' })
    .toBuffer();

  const titleEsc = escapeXml(post.title);
  const subtitleEsc = escapeXml(post.subtitle);
  const badgeEsc = escapeXml(post.badge);
  const footerEsc = escapeXml(post.footer);

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#140807" />
        <stop offset="50%" stop-color="#0E0706" />
        <stop offset="100%" stop-color="#080302" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4A574" />
        <stop offset="100%" stop-color="#E8C9A8" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    
    <!-- Outer Border -->
    <rect x="25" y="25" width="${width - 50}" height="${height - 50}" fill="none" stroke="#D4A574" stroke-opacity="0.25" stroke-width="1.5" rx="16" />

    <!-- Brand Header -->
    <text x="75" y="105" font-family="sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#F4EBE1">
      IVA <tspan fill="#D4A574" font-weight="300">NAIL ART NY</tspan>
    </text>

    <!-- Badge -->
    <rect x="75" y="145" width="340" height="34" rx="17" fill="#D4A574" fill-opacity="0.12" stroke="#D4A574" stroke-opacity="0.3" stroke-width="1" />
    <text x="95" y="167" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="2" fill="#D4A574">
      ✦ ${badgeEsc}
    </text>

    <!-- Headline -->
    <text x="75" y="270" font-family="sans-serif" font-size="44" font-weight="800" letter-spacing="1" fill="#F4EBE1">
      ${titleEsc}
    </text>

    <!-- Subtitle -->
    <text x="75" y="340" font-family="serif" font-size="26" font-style="italic" fill="#D4A574">
      ${subtitleEsc}
    </text>

    <!-- Bullets -->
    <text x="75" y="440" font-family="sans-serif" font-size="17" fill="#F4EBE1" fill-opacity="0.8">✓ Private 1-on-1 Studio in Bay Ridge (11209)</text>
    <text x="75" y="485" font-family="sans-serif" font-size="17" fill="#F4EBE1" fill-opacity="0.8">✓ No crowds, no rush, medical-grade disinfection</text>
    <text x="75" y="530" font-family="sans-serif" font-size="17" fill="#F4EBE1" fill-opacity="0.8">✓ $35 deposit reserves your exclusive time</text>

    <!-- CTA Button Pill -->
    <rect x="75" y="605" width="280" height="54" rx="27" fill="url(#gold)" />
    <text x="135" y="638" font-family="sans-serif" font-size="16" font-weight="700" letter-spacing="1" fill="#0E0706">
      BOOK ON CALENDLY →
    </text>

    <!-- Footer Bar -->
    <line x1="75" y1="780" x2="${width - 75}" y2="780" stroke="#F4EBE1" stroke-opacity="0.1" stroke-width="1" />
    <text x="75" y="818" font-family="sans-serif" font-size="14" fill="#F4EBE1" fill-opacity="0.6">
      ${footerEsc}
    </text>
  </svg>
  `;

  const outputPath = path.join(OUT_DIR, `${post.id}.jpg`);
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: photoBuffer,
        top: 90,
        left: 605,
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

async function createInstagramPost(post, index) {
  const width = 1080;
  const height = 1350;
  const photoPath = path.join(__dirname, '..', 'public', 'gallery', post.image);
  
  // Top photo cover (980 x 680)
  const photoBuffer = await sharp(photoPath)
    .resize(980, 680, { fit: 'cover' })
    .toBuffer();

  const titleEsc = escapeXml(post.title);
  const subtitleEsc = escapeXml(post.subtitle);
  const badgeEsc = escapeXml(post.badge);

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#120605" />
        <stop offset="100%" stop-color="#0A0303" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4A574" />
        <stop offset="100%" stop-color="#E8C9A8" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect x="25" y="25" width="${width - 50}" height="${height - 50}" fill="none" stroke="#D4A574" stroke-opacity="0.25" stroke-width="1.5" rx="20" />

    <!-- Header -->
    <text x="60" y="80" font-family="sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#F4EBE1">
      IVA <tspan fill="#D4A574" font-weight="300">NAIL ART</tspan>
    </text>
    <text x="${width - 60}" y="80" text-anchor="end" font-family="sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#D4A574">
      @iva_nailart_nyc
    </text>

    <!-- Badge -->
    <rect x="60" y="805" width="280" height="32" rx="16" fill="#D4A574" fill-opacity="0.15" stroke="#D4A574" stroke-opacity="0.4" stroke-width="1" />
    <text x="75" y="826" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="1.5" fill="#D4A574">
      ✦ ${badgeEsc}
    </text>

    <!-- Title -->
    <text x="60" y="900" font-family="sans-serif" font-size="46" font-weight="800" fill="#F4EBE1">
      ${titleEsc}
    </text>

    <!-- Subtitle -->
    <text x="60" y="960" font-family="serif" font-size="28" font-style="italic" fill="#D4A574">
      ${subtitleEsc}
    </text>

    <text x="60" y="1040" font-family="sans-serif" font-size="20" fill="#F4EBE1" fill-opacity="0.85">
      Bay Ridge, Brooklyn · By Appointment Only
    </text>
    <text x="60" y="1080" font-family="sans-serif" font-size="18" fill="#F4EBE1" fill-opacity="0.65">
      Direct MTA: R Train, B1, B64 · 5–10 min from Dyker &amp; Sunset Park
    </text>

    <!-- CTA -->
    <rect x="60" y="1150" width="420" height="60" rx="30" fill="url(#gold)" />
    <text x="110" y="1187" font-family="sans-serif" font-size="17" font-weight="700" letter-spacing="1" fill="#0E0706">
      RESERVE ON CALENDLY ↗
    </text>

    <text x="60" y="1275" font-family="sans-serif" font-size="14" fill="#F4EBE1" fill-opacity="0.5">
      Swipe or visit link in bio @iva_nailart_nyc · $35 Deposit Required
    </text>
  </svg>
  `;

  const outputPath = path.join(OUT_DIR, `instagram-card-${index + 1}.jpg`);
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: photoBuffer,
        top: 105,
        left: 50,
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

async function run() {
  console.log('Generating social marketing banners with sharp...');
  for (let i = 0; i < POSTS.length; i++) {
    await createGooglePost(POSTS[i]);
    await createInstagramPost(POSTS[i], i);
  }
  console.log('All 12 editorial banners successfully generated in public/social-assets/');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
