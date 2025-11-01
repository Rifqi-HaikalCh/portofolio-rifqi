const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');
const imageExtensions = ['.png', '.jpg', '.jpeg'];

async function convertToWebP() {
  try {
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      if (imageExtensions.includes(ext)) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, file.replace(ext, '.webp'));

        // Skip if WebP already exists
        if (fs.existsSync(outputPath)) {
          console.log(`⏭️  Skipping ${file} - WebP already exists`);
          continue;
        }

        console.log(`🔄 Converting ${file}...`);

        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);

        console.log(`✅ Created ${path.basename(outputPath)}`);
      }
    }

    console.log('\n🎉 All images converted to WebP!');
  } catch (error) {
    console.error('❌ Error converting images:', error);
  }
}

convertToWebP();
