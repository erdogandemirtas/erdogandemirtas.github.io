const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convert() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  let input = path.join(assetsDir, 'bird-full.jpg');

  // Fallback to bird-1200.jpg if bird-full.jpg is not present
  if (!fs.existsSync(input)) {
    input = path.join(assetsDir, 'bird-1200.jpg');
    if (!fs.existsSync(input)) {
      throw new Error('No source image found in assets directory (neither bird-full.jpg nor bird-1200.jpg exists).');
    }
    console.log('bird-full.jpg not found, using bird-1200.jpg as source.');
  }

  const sizes = [480, 800, 1200];
  for (const size of sizes) {
    const outWebp = path.join(assetsDir, `bird-${size}.webp`);
    console.log(`Generating: bird-${size}.webp`);
    await sharp(input)
      .resize({ width: size })
      .webp({ quality: 80 })
      .toFile(outWebp);
  }

  // Ensure high quality JPEG fallback exists
  const outJpg = path.join(assetsDir, 'bird-1200.jpg');
  if (input !== outJpg) {
    console.log('Generating: bird-1200.jpg');
    await sharp(input)
      .resize({ width: 1200 })
      .jpeg({ quality: 82 })
      .toFile(outJpg);
  }

  console.log('All bird images successfully generated!');
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
