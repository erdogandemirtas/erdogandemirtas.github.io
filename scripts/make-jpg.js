const sharp = require('sharp');
const path = require('path');
(async function(){
  const input = path.join(__dirname,'..','assets','bird-full.jpg');
  const out = path.join(__dirname,'..','assets','bird-1200.jpg');
  console.log('Rendering JPG:', out);
  await sharp(input)
    .resize({ width: 1200 })
    .jpeg({ quality: 82 })
    .toFile(out);
  console.log('Done');
})();
