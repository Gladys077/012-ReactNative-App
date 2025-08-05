/**
 * 🔧 Script que recorre las carpetas `assets/images`, `assets/icons` y `assets/emojis`,
 * y genera automáticamente un archivo `index.js` dentro de cada una.
 *
 * 📦 Este archivo `index.js` importa y exporta todas las imágenes SVG, PNG, JPG, etc.,
 * permitiendo que se puedan importar fácilmente desde otros archivos del proyecto.
 *
 * 💡 Se ejecuta con: `npm run generate:assets`
 * Requiere: que existan las carpetas `assets/images`, `assets/icons` y/o `assets/emojis`.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, "../assets");
const SUBFOLDERS = ["images", "icons", "emojis"];

const isImageFile = (file: string) => /\.(png|jpe?g|gif|svg)$/i.test(file);

const toExportName = (filename: string) =>
  path.parse(filename).name.replace(/[^a-zA-Z0-9]/g, "_");

async function generateIndexes() {
  for (const folderName of SUBFOLDERS) {
    const folderPath = path.join(ASSETS_DIR, folderName);
    const outputPath = path.join(folderPath, "index.js");

    try {
      const files = (await fs.readdir(folderPath)).filter(isImageFile);
      const exportLines = files.map((file) => {
        const variableName = toExportName(file);
        return `export const ${variableName} = require('./${file}');`;
      });

      const banner = `// Archivo generado automáticamente\n// No editar manualmente\n\n`;
      const content = banner + exportLines.join("\n") + "\n";

      await fs.writeFile(outputPath, content, "utf8");
      console.log(`✅ ${folderName}/index.js actualizado con ${files.length} imágenes`);
    } catch {
      console.warn(`⚠️  Carpeta no encontrada: ${folderPath}`);
    }
  }
}

generateIndexes();

