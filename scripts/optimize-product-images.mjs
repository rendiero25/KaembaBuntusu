/**
 * Re-encode product images as true JPEG (fixes PNG files saved as .jpg).
 * Run: node scripts/optimize-product-images.mjs
 */
import { rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public/images/products");
const files = ["coconut.jpg", "copra.jpg", "cloves.jpg", "pepper.jpg"];

for (const file of files) {
  const input = join(dir, file);
  const temp = join(dir, `${file}.optimized`);
  await sharp(input)
    .rotate()
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(temp);
  await unlink(input);
  await rename(temp, input);
  const meta = await sharp(input).metadata();
  console.log(`Optimized ${file} → ${meta.format} ${meta.width}x${meta.height}`);
}
