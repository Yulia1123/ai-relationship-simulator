import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const htmlPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Inline CSS via base64 data URI
const cssMatch = html.match(/href="([^"]+\.css)"/);
if (cssMatch) {
  const cssPath = path.join(distDir, cssMatch[1]);
  const css = fs.readFileSync(cssPath);
  const b64 = css.toString('base64');
  html = html.replace(
    /<link[^>]*\.css[^>]*>/,
    `<link rel="stylesheet" href="data:text/css;base64,${b64}">`
  );
}

// Inline JS via base64 data URI
const jsMatch = html.match(/src="([^"]+\.js)"/);
if (jsMatch) {
  const jsPath = path.join(distDir, jsMatch[1]);
  const js = fs.readFileSync(jsPath);
  const b64 = js.toString('base64');
  html = html.replace(
    /<script[^>]*\.js[^>]*><\/script>/,
    `<script type="module" src="data:text/javascript;base64,${b64}"></script>`
  );
}

// Inline favicon as data URI
const faviconMatch = html.match(/href="([^"]*favicon\.svg)"/);
if (faviconMatch) {
  const faviconPath = path.join(distDir, faviconMatch[1]);
  if (fs.existsSync(faviconPath)) {
    const favicon = fs.readFileSync(faviconPath, 'utf8');
    const b64 = Buffer.from(favicon).toString('base64');
    html = html.replace(faviconMatch[1], `data:image/svg+xml;base64,${b64}`);
  }
}

const outPath = path.join(distDir, 'standalone.html');
fs.writeFileSync(outPath, html);
console.log(`Created ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
