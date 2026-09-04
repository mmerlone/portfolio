import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const width = 1200;
const height = 630;
const projectRoot = process.cwd();
const profilePath = path.join(projectRoot, "public/images/profile/profile.png");
const outputPath = path.join(projectRoot, "public/images/og/og.jpg");

const background = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ebedf3"/>
  <path d="M0 510 C260 440 430 560 650 505 C855 455 1010 385 1200 430 V630 H0 Z" fill="#ffffff" opacity="0.72"/>
  <g opacity="0.28" stroke="#d1d5db" stroke-width="1">
    <path d="M0 82 H1200"/><path d="M0 164 H1200"/><path d="M0 246 H1200"/>
    <path d="M0 328 H1200"/><path d="M0 410 H1200"/><path d="M0 492 H1200"/>
  </g>
  <rect x="72" y="84" width="8" height="352" rx="4" fill="#ea580c"/>
  <text x="116" y="160" fill="#c2410c" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="700">SOFTWARE ENGINEER</text>
  <text x="112" y="249" fill="#111827" font-family="DejaVu Sans, sans-serif" font-size="64" font-weight="700">Marcio Merlone</text>
  <text x="116" y="318" fill="#374151" font-family="DejaVu Sans, sans-serif" font-size="35" font-weight="600">Platform Architect</text>
  <text x="116" y="368" fill="#4b5563" font-family="DejaVu Sans, sans-serif" font-size="27">Resilient platforms. Reliable infrastructure.</text>
  <text x="116" y="406" fill="#4b5563" font-family="DejaVu Sans, sans-serif" font-size="27">Accessible web applications.</text>
  <text x="116" y="548" fill="#7c2d12" font-family="DejaVu Sans, sans-serif" font-size="24" font-weight="700">mmerlone.dev.br</text>
  <circle cx="953" cy="315" r="228" fill="#ffffff" stroke="#ea580c" stroke-width="8"/>
</svg>`);

async function generateOpenGraphImage() {
  const portrait = await sharp(profilePath)
    .resize(420, 420, { fit: "cover" })
    .png()
    .toBuffer();

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(background)
    .composite([{ input: portrait, left: 743, top: 105 }])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);

  console.log(`Generated ${path.relative(projectRoot, outputPath)}`);
}

await generateOpenGraphImage();
