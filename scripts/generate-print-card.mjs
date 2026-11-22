import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import QRCode from 'qrcode';

async function generatePrintCard() {
  const outputDir = path.join(process.cwd(), 'public', 'print');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const reviewUrl = 'https://www.ivanailartny.com/qr-review?source=tabletop_print';
  
  // Generate crisp QR code SVG buffer
  const qrSvg = await QRCode.toString(reviewUrl, {
    type: 'svg',
    width: 440,
    margin: 1,
    color: {
      dark: '#0E0706',
      light: '#FFFFFF'
    }
  });

  const width = 1200;  // 4 inches @ 300 DPI
  const height = 1800; // 6 inches @ 300 DPI

  // SVG Card Template
  const svgTemplate = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D4A574"/>
        <stop offset="50%" stop-color="#F3D5A3"/>
        <stop offset="100%" stop-color="#B8864E"/>
      </linearGradient>
      <linearGradient id="darkBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#140A09"/>
        <stop offset="100%" stop-color="#0E0706"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#darkBg)"/>

    <!-- Outer Gold Border -->
    <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="32" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>

    <!-- Inner Subtle Inset Border -->
    <rect x="60" y="60" width="${width - 120}" height="${height - 120}" rx="24" fill="none" stroke="#D4A574" stroke-opacity="0.3" stroke-width="2"/>

    <!-- Top Corner Accents -->
    <path d="M75 110 L75 75 L110 75" fill="none" stroke="url(#goldGrad)" stroke-width="4"/>
    <path d="M${width - 75} 110 L${width - 75} 75 L${width - 110} 75" fill="none" stroke="url(#goldGrad)" stroke-width="4"/>
    <path d="M75 ${height - 110} L75 ${height - 75} L110 ${height - 75}" fill="none" stroke="url(#goldGrad)" stroke-width="4"/>
    <path d="M${width - 75} ${height - 110} L${width - 75} ${height - 75} L${width - 110} ${height - 75}" fill="none" stroke="url(#goldGrad)" stroke-width="4"/>

    <!-- Studio Header -->
    <text x="600" y="240" font-family="serif, 'Playfair Display'" font-size="52" font-weight="600" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="8">IVA NAIL ART</text>
    <text x="600" y="295" font-family="sans-serif, 'Inter'" font-size="22" font-weight="500" fill="#F4EBE1" fill-opacity="0.65" text-anchor="middle" letter-spacing="6">BAY RIDGE · BROOKLYN</text>

    <!-- Thin Divider -->
    <line x1="450" y1="340" x2="750" y2="340" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.5"/>

    <!-- Headline -->
    <text x="600" y="460" font-family="serif, 'Playfair Display'" font-size="64" font-weight="300" fill="#F4EBE1" text-anchor="middle">Loved Your Nails Today?</text>
    <text x="600" y="525" font-family="sans-serif, 'Inter'" font-size="28" font-weight="300" fill="#D4A574" text-anchor="middle">¿Te encantaron tus uñas?</text>

    <!-- 5 Gold Stars -->
    <g transform="translate(420, 565)">
      <polygon points="25,2 32,18 49,18 35,29 40,46 25,35 9,46 15,29 1,18 18,18" fill="url(#goldGrad)" transform="scale(1.4)"/>
      <polygon points="25,2 32,18 49,18 35,29 40,46 25,35 9,46 15,29 1,18 18,18" fill="url(#goldGrad)" transform="translate(68, 0) scale(1.4)"/>
      <polygon points="25,2 32,18 49,18 35,29 40,46 25,35 9,46 15,29 1,18 18,18" fill="url(#goldGrad)" transform="translate(136, 0) scale(1.4)"/>
      <polygon points="25,2 32,18 49,18 35,29 40,46 25,35 9,46 15,29 1,18 18,18" fill="url(#goldGrad)" transform="translate(204, 0) scale(1.4)"/>
      <polygon points="25,2 32,18 49,18 35,29 40,46 25,35 9,46 15,29 1,18 18,18" fill="url(#goldGrad)" transform="translate(272, 0) scale(1.4)"/>
    </g>

    <!-- QR Code Container White Box -->
    <rect x="360" y="680" width="480" height="480" rx="28" fill="#FFFFFF" stroke="url(#goldGrad)" stroke-width="4"/>

    <!-- Call to Action -->
    <text x="600" y="1240" font-family="sans-serif, 'Inter'" font-size="32" font-weight="600" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1">SCAN TO REVIEW ON GOOGLE</text>
    <text x="600" y="1285" font-family="sans-serif, 'Inter'" font-size="24" font-weight="400" fill="#F4EBE1" fill-opacity="0.75" text-anchor="middle">Escanea para calificar con 5 estrellas</text>

    <!-- Thin Divider -->
    <line x1="380" y1="1350" x2="820" y2="1350" stroke="#D4A574" stroke-width="1" stroke-opacity="0.3"/>

    <!-- Tag & Instagram -->
    <text x="600" y="1430" font-family="sans-serif, 'Inter'" font-size="28" font-weight="600" fill="#F4EBE1" text-anchor="middle" letter-spacing="2">TAG YOUR SET · @iva_nailart_nyc</text>
    <text x="600" y="1485" font-family="sans-serif, 'Inter'" font-size="22" font-weight="300" fill="#F4EBE1" fill-opacity="0.6" text-anchor="middle">Private Studio · Russian Manicure · Builder Gel</text>

    <!-- Footer Gratitude -->
    <text x="600" y="1660" font-family="serif, 'Playfair Display'" font-size="22" font-style="italic" fill="#D4A574" fill-opacity="0.85" text-anchor="middle">Thank you for supporting an independent artist in Brooklyn</text>
  </svg>
  `;

  // Overlay QR code into white box
  const qrBuffer = Buffer.from(qrSvg);
  const cardBuffer = Buffer.from(svgTemplate);

  const finalImage = await sharp(cardBuffer)
    .composite([
      {
        input: qrBuffer,
        top: 700,
        left: 380,
      }
    ])
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'iva-tabletop-review-card-4x6.png'));

  console.log('Successfully generated tabletop review card 4x6 at 300 DPI:', finalImage);
}

generatePrintCard().catch(err => {
  console.error('Failed to generate print card:', err);
  process.exit(1);
});
