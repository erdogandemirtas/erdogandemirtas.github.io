const sharp = require('sharp');
const path = require('path');

async function makeOg() {
  const input = path.join(__dirname, '..', 'profile-preview.svg');
  const output = path.join(__dirname, '..', 'assets', 'og-1200x630.webp');
  console.log('Rendering', input, '->', output);
  await sharp(input)
    .resize(1200, 630, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(output);
  console.log('OG image created:', output);
}

makeOg().catch(err => { console.error(err); process.exit(1); });
