import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(new URL("..", import.meta.url).pathname);
const outDir = join(root, "base-submission");
const W = 1284;
const H = 2778;

const c = {
  bg: "#f1ead9",
  paper: "#fff8ed",
  label: "#f7f1e5",
  ink: "#171717",
  red: "#d37f2a",
  gold: "#f2c14e",
  green: "#e8efe2",
  olive: "#4d6549",
  brown: "#8b6327",
};

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function frame(content) {
  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${c.bg}"/>
    <rect x="0" y="0" width="${W}" height="224" fill="${c.ink}"/>
    <path d="M72 378H1212M72 748H1212M72 1118H1212M72 1488H1212M72 1858H1212M72 2228H1212" stroke="rgba(23,23,23,0.08)" stroke-width="4"/>
    <circle cx="1120" cy="2500" r="230" fill="${c.gold}" opacity="0.28"/>
    ${content}
  </svg>`;
}

function header(title, subtitle) {
  return `
    <text x="72" y="102" font-family="Courier New, monospace" font-size="30" font-weight="900" fill="${c.gold}">PAPER BULLETIN</text>
    <text x="72" y="198" font-family="Arial, sans-serif" font-size="78" font-weight="900" fill="${c.paper}">${esc(title)}</text>
    <text x="78" y="314" font-family="Arial, sans-serif" font-size="33" font-weight="800" fill="${c.brown}">${esc(subtitle)}</text>
  `;
}

function bulletinCard(x, y, title, category, body) {
  const lines = wrap(body, 34).slice(0, 5);
  return `
    <rect x="${x}" y="${y}" width="1060" height="1040" rx="24" fill="${c.paper}" stroke="${c.ink}" stroke-width="6"/>
    <rect x="${x}" y="${y}" width="1060" height="34" rx="17" fill="${c.red}"/>
    <text x="${x + 58}" y="${y + 102}" font-family="Courier New, monospace" font-size="25" font-weight="900" fill="${c.brown}">BULLETIN</text>
    <text x="${x + 58}" y="${y + 218}" font-family="Arial, sans-serif" font-size="82" font-weight="900" fill="${c.ink}">${esc(title)}</text>
    <rect x="${x + 58}" y="${y + 296}" width="300" height="138" rx="18" fill="${c.ink}"/>
    <text x="${x + 86}" y="${y + 352}" font-family="Courier New, monospace" font-size="22" font-weight="900" fill="${c.gold}">CATEGORY</text>
    <text x="${x + 86}" y="${y + 410}" font-family="Arial, sans-serif" font-size="42" font-weight="900" fill="${c.paper}">${esc(category)}</text>
    <rect x="${x + 384}" y="${y + 296}" width="250" height="138" rx="18" fill="${c.gold}" stroke="${c.ink}" stroke-width="4"/>
    <text x="${x + 412}" y="${y + 352}" font-family="Courier New, monospace" font-size="22" font-weight="900" fill="#6f4b06">CHAIN</text>
    <text x="${x + 412}" y="${y + 410}" font-family="Arial, sans-serif" font-size="42" font-weight="900" fill="${c.ink}">Base</text>
    <rect x="${x + 58}" y="${y + 520}" width="944" height="320" rx="18" fill="${c.label}" stroke="${c.ink}" stroke-width="4"/>
    <text x="${x + 90}" y="${y + 584}" font-family="Courier New, monospace" font-size="22" font-weight="900" fill="${c.red}">MESSAGE</text>
    ${lines.map((line, i) => `<text x="${x + 90}" y="${y + 648 + i * 44}" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="${c.ink}">${esc(line)}</text>`).join("")}
    <rect x="${x + 58}" y="${y + 900}" width="944" height="76" rx="18" fill="${c.ink}"/>
    <text x="${x + 90}" y="${y + 949}" font-family="Courier New, monospace" font-size="23" font-weight="900" fill="${c.gold}">WALLET + TIMESTAMP STORED ON BASE</text>
  `;
}

function feature(x, y, title, body, fill) {
  return `
    <rect x="${x}" y="${y}" width="540" height="220" rx="22" fill="${fill}" stroke="${c.ink}" stroke-width="5"/>
    <text x="${x + 34}" y="${y + 78}" font-family="Arial, sans-serif" font-size="38" font-weight="900" fill="${c.ink}">${esc(title)}</text>
    ${wrap(body, 30).slice(0, 3).map((line, i) => `<text x="${x + 34}" y="${y + 132 + i * 34}" font-family="Arial, sans-serif" font-size="27" font-weight="800" fill="${c.brown}">${esc(line)}</text>`).join("")}
  `;
}

function screenshot1() {
  return frame(`
    ${header("Post a short bulletin.", "Turn a brief announcement into a public Base record.")}
    ${bulletinCard(112, 500, "Open call for builders", "Announcement", "Share a concise note, request, or update. The bulletin reads like a wall sheet, but it lives on Base.")}
    ${feature(72, 1710, "Write it once", "Title, category, and body are enough.", c.paper)}
    ${feature(672, 1710, "Save to Base", "Wallet and timestamp stay public.", c.green)}
  `);
}

function screenshot2() {
  return frame(`
    ${header("A chain notice board.", "Each post gets an ID you can reopen later.")}
    ${feature(72, 430, "Bulletin ID", "Reload records by number.", c.gold)}
    ${feature(672, 430, "Wallet author", "See who published it.", c.paper)}
    ${bulletinCard(112, 800, "Weekly update", "Update", "The page stays simple: a title, a short body, and the wallet that signed it. Nothing extra gets in the way.")}
  `);
}

function screenshot3() {
  return frame(`
    ${header("A public wall, trimmed down.", "Built for mobile viewing and quick posting.")}
    ${bulletinCard(112, 430, "Launch note", "Note", "Today the board goes live. Short text is the point: fast to write, easy to scan, and visible onchain.")}
    ${feature(72, 1650, "BaseScan link", "Check the transaction after posting.", c.green)}
    ${feature(672, 1650, "Minimal UI", "No clutter between the post and the record.", c.gold)}
  `);
}

function iconSvg() {
  return `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" fill="${c.bg}"/>
    <rect x="124" y="132" width="776" height="760" rx="52" fill="${c.paper}" stroke="${c.ink}" stroke-width="28"/>
    <rect x="124" y="132" width="776" height="96" rx="48" fill="${c.red}"/>
    <path d="M296 364H724M296 492H618M296 620H710" stroke="${c.ink}" stroke-width="40" stroke-linecap="round"/>
    <rect x="294" y="722" width="438" height="76" rx="20" fill="${c.gold}" stroke="${c.ink}" stroke-width="18"/>
  </svg>`;
}

function thumbnailSvg() {
  return `
  <svg width="1910" height="1000" viewBox="0 0 1910 1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1910" height="1000" fill="${c.bg}"/>
    <rect x="0" y="0" width="1910" height="176" fill="${c.ink}"/>
    <text x="96" y="128" font-family="Arial, sans-serif" font-size="104" font-weight="900" fill="${c.paper}">Paper Bulletin</text>
    <text x="104" y="250" font-family="Arial, sans-serif" font-size="42" font-weight="800" fill="${c.brown}">Publish a short bulletin on Base.</text>
    ${feature(106, 370, "Public notice", "Short title and text.", c.paper)}
    ${feature(106, 635, "Onchain record", "Wallet and timestamp saved.", c.green)}
    ${bulletinCard(760, 244, "Open call for builders", "Announcement", "Share a concise note, request, or update. The bulletin reads like a wall sheet, but it lives on Base.")}
  </svg>`;
}

async function writePng(name, svg, width = W, height = H) {
  const file = join(outDir, name);
  await sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toFile(file);
  return file;
}

async function writeJpg(name, svg, width, height) {
  const file = join(outDir, name);
  await sharp(Buffer.from(svg)).resize(width, height).jpeg({ quality: 88, mozjpeg: true }).toFile(file);
  return file;
}

await mkdir(outDir, { recursive: true });

const files = [
  await writeJpg("app-icon.jpg", iconSvg(), 1024, 1024),
  await writeJpg("app-thumbnail.jpg", thumbnailSvg(), 1910, 1000),
  await writePng("screenshot-1.png", screenshot1()),
  await writePng("screenshot-2.png", screenshot2()),
  await writePng("screenshot-3.png", screenshot3()),
];

await writeFile(join(outDir, "asset-manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2), "utf8");
await writeFile(
  join(outDir, "submission-copy.md"),
  [
    "# Paper Bulletin",
    "",
    "App Name: Paper Bulletin",
    "Tagline: Post a short bulletin",
    "Description: Publish a short bulletin with title, category, wallet, and timestamp on Base.",
    "",
    "Domain: https://paper-bulletin.vercel.app",
    "",
    "Assets:",
    "- app-icon.jpg",
    "- app-thumbnail.jpg",
    "- screenshot-1.png",
    "- screenshot-2.png",
    "- screenshot-3.png",
  ].join("\n"),
  "utf8",
);

for (const file of files) console.log(file);
