/**
 * Image Optimization Script
 *
 * This script converts all images in the public/assets directory to:
 * 1. WebP format (better compression, wide browser support)
 * 2. AVIF format (best compression, modern browsers)
 * 3. Multiple sizes for responsive srcset (320w, 640w, 768w, 1024w, 1280w, 1920w)
 *
 * Usage:
 *   node scripts/optimize-images.js
 *
 * Requirements:
 *   npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/assets'),
  outputDir: path.join(__dirname, '../public/assets/optimized'),
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1280, 1920], // Responsive breakpoints
  quality: {
    webp: 85,
    avif: 80,
    jpeg: 85,
    png: 90,
  },
  // File extensions to process
  extensions: ['.jpg', '.jpeg', '.png', '.webp'],
};

// Ensure output directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

// Get all image files from directory
function getImageFiles(dir) {
  const files = [];

  function readDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    items.forEach((item) => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip optimized directory
        if (item !== 'optimized') {
          readDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (CONFIG.extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    });
  }

  readDirectory(dir);
  return files;
}

// Get file size in KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Convert single image to target format and size
async function convertImage(inputPath, format, width = null) {
  const parsedPath = path.parse(inputPath);
  const relativePath = path.relative(CONFIG.inputDir, inputPath);
  const outputSubDir = path.join(CONFIG.outputDir, path.dirname(relativePath));

  ensureDirectoryExists(outputSubDir);

  const sizeSuffix = width ? `-${width}w` : '';
  const outputFileName = `${parsedPath.name}${sizeSuffix}.${format}`;
  const outputPath = path.join(outputSubDir, outputFileName);

  try {
    let pipeline = sharp(inputPath);

    // Get original image metadata
    const metadata = await pipeline.metadata();

    // Resize if width is specified and image is larger
    if (width && metadata.width > width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert to target format
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality: CONFIG.quality.webp });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: CONFIG.quality.avif });
        break;
      case 'jpeg':
      case 'jpg':
        pipeline = pipeline.jpeg({ quality: CONFIG.quality.jpeg, progressive: true });
        break;
      case 'png':
        pipeline = pipeline.png({ quality: CONFIG.quality.png, compressionLevel: 9 });
        break;
    }

    await pipeline.toFile(outputPath);

    return {
      success: true,
      input: inputPath,
      output: outputPath,
      format,
      width,
      originalSize: getFileSizeInKB(inputPath),
      optimizedSize: getFileSizeInKB(outputPath),
    };
  } catch (error) {
    return {
      success: false,
      input: inputPath,
      format,
      width,
      error: error.message,
    };
  }
}

// Process single image: convert to all formats and sizes
async function processImage(imagePath) {
  console.log(`\n📸 Processing: ${path.basename(imagePath)}`);

  const results = [];

  // Get original image dimensions
  const metadata = await sharp(imagePath).metadata();
  const originalWidth = metadata.width;

  // Convert to each format
  for (const format of CONFIG.formats) {
    // Full size version
    const fullSizeResult = await convertImage(imagePath, format);
    results.push(fullSizeResult);

    if (fullSizeResult.success) {
      const savings = (
        ((fullSizeResult.originalSize - fullSizeResult.optimizedSize) /
          fullSizeResult.originalSize) *
        100
      ).toFixed(1);
      console.log(
        `  ✓ ${format.toUpperCase()}: ${fullSizeResult.originalSize}KB → ${fullSizeResult.optimizedSize}KB (${savings}% savings)`
      );
    }

    // Responsive sizes (only for formats, skip sizes larger than original)
    for (const width of CONFIG.sizes) {
      if (width < originalWidth) {
        const resizedResult = await convertImage(imagePath, format, width);
        results.push(resizedResult);

        if (resizedResult.success) {
          console.log(`  ✓ ${format.toUpperCase()} ${width}w: ${resizedResult.optimizedSize}KB`);
        }
      }
    }
  }

  return results;
}

// Generate summary report
function generateReport(allResults) {
  const successful = allResults.filter((r) => r.success);
  const failed = allResults.filter((r) => !r.success);

  const totalOriginalSize = successful.reduce((sum, r) => sum + parseFloat(r.originalSize || 0), 0);
  const totalOptimizedSize = successful.reduce((sum, r) => sum + parseFloat(r.optimizedSize || 0), 0);
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION REPORT');
  console.log('='.repeat(60));
  console.log(`✅ Successfully processed: ${successful.length} images`);
  console.log(`❌ Failed: ${failed.length} images`);
  console.log(`📦 Total original size: ${totalOriginalSize.toFixed(2)}KB`);
  console.log(`📦 Total optimized size: ${totalOptimizedSize.toFixed(2)}KB`);
  console.log(`💾 Total savings: ${totalSavings.toFixed(2)}KB (${savingsPercent}%)`);
  console.log('='.repeat(60));

  if (failed.length > 0) {
    console.log('\n❌ Failed conversions:');
    failed.forEach((f) => {
      console.log(`  - ${path.basename(f.input)} (${f.format}): ${f.error}`);
    });
  }

  // Save report to file
  const reportPath = path.join(CONFIG.outputDir, 'optimization-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        summary: {
          successful: successful.length,
          failed: failed.length,
          totalOriginalSize: `${totalOriginalSize.toFixed(2)}KB`,
          totalOptimizedSize: `${totalOptimizedSize.toFixed(2)}KB`,
          totalSavings: `${totalSavings.toFixed(2)}KB`,
          savingsPercent: `${savingsPercent}%`,
        },
        results: allResults,
      },
      null,
      2
    )
  );

  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

// Main execution
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  console.log(`🎨 Formats: ${CONFIG.formats.join(', ')}`);
  console.log(`📐 Responsive sizes: ${CONFIG.sizes.join(', ')}`);

  // Ensure output directory exists
  ensureDirectoryExists(CONFIG.outputDir);

  // Get all image files
  const imageFiles = getImageFiles(CONFIG.inputDir);
  console.log(`\n📸 Found ${imageFiles.length} images to process\n`);

  if (imageFiles.length === 0) {
    console.log('❌ No images found to process!');
    return;
  }

  // Process all images
  const allResults = [];
  let processedCount = 0;

  for (const imagePath of imageFiles) {
    processedCount++;
    console.log(`[${processedCount}/${imageFiles.length}]`);

    const results = await processImage(imagePath);
    allResults.push(...results);
  }

  // Generate summary report
  generateReport(allResults);

  console.log('\n✨ Optimization complete!\n');
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  });
}

module.exports = { convertImage, processImage };
