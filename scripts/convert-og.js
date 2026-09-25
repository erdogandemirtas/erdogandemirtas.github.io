const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function makeOg() {
  const rootDir = path.join(__dirname, '..');
  const input = path.join(rootDir, 'profile-preview.svg');
  const assetsDir = path.join(rootDir, 'assets');

  if (!fs.existsSync(input)) {
    throw new Error('profile-preview.svg not found in root directory.');
  }

  const outWebp = path.join(assetsDir, 'og-1200x630.webp');
  const outPng = path.join(assetsDir, 'og-1200x630.png');

  console.log(`Generating OG WebP: ${outWebp}`);
  await sharp(input)
    .resize(1200, 630, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(outWebp);

  console.log(`Generating OG PNG: ${outPng}`);
  await sharp(input)
    .resize(1200, 630, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(outPng);

  console.log('Open Graph preview images successfully generated (WebP + PNG)!');
}

makeOg().catch(err => {
  console.error(err);
  process.exit(1);
});
