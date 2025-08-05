import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, "../components/icons");
const OUTPUT_FILE = path.join(ICONS_DIR, "index.ts");

async function generateIconsIndex() {
  try {
    const files = (await fs.readdir(ICONS_DIR)).filter(
      (file) => file.endsWith(".tsx") && file !== "index.ts"
    );

    if (files.length === 0) {
      console.warn("⚠️  No se encontraron íconos en icons/");
      process.exit(0);
    }

    const exportLines = files.map((file) => {
      const name = path.parse(file).name;
      return `export { default as ${name} } from './${name}';`;
    });

    const banner = `// Archivo generado automáticamente\n// No editar manualmente\n\n`;
    const content = banner + exportLines.join("\n") + "\n";

    await fs.writeFile(OUTPUT_FILE, content, "utf8");
    console.log(`✅ index.ts generado con ${files.length} íconos`);
  } catch (err) {
    console.error("❌ Error al generar el index de íconos:", err);
    process.exit(1);
  }
}

generateIconsIndex();
