const fs = require('fs');
const { PNG } = require('pngjs');

const srcPath = `C:\\Users\\aleky\\.gemini\\antigravity\\brain\\7266d604-b855-4781-bd22-a198cb585f02\\.user_uploaded\\media__1784737893751.png`;
const destPath = `C:\\Users\\aleky\\.gemini\\antigravity\\scratch\\aditya-chatbot\\public\\bot_avatar.png`;

fs.createReadStream(srcPath)
  .pipe(new PNG())
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // If pixel is near white/light grey (background & stock watermark lines)
        if (r > 230 && g > 230 && b > 230) {
          this.data[idx + 3] = 0; // Set Alpha to transparent
        } else if (r > 210 && g > 210 && b > 210) {
          // Feather edges smoothly for soft cutout
          const avg = (r + g + b) / 3;
          const alphaFactor = Math.max(0, (230 - avg) / 20);
          this.data[idx + 3] = Math.floor(255 * alphaFactor);
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(destPath)).on('finish', () => {
      console.log('✅ Transparent PNG image successfully generated at:', destPath);
    });
  });
