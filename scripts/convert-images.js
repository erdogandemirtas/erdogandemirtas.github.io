const sharp = require('sharp');
const path = require('path');

async function convert() {
  const input = path.join(__dirname, '..', 'assets', 'bird-full.jpg');
  const sizes = [480, 800, 1200];
  for (const size of sizes) {
    const out = path.join(__dirname, '..', 'assets', `bird-${size}.webp`);
    console.log('Generating', out);
    await sharp(input)
      .resize({ width: size })
      .webp({ quality: 80 })
      .toFile(out);
  }
  console.log('Done');
}

convert().catch(err => { console.error(err); process.exit(1); });
