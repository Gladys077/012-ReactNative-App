const { exec } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Rutas
const iconsInput = path.resolve("assets/icons");
const outputDir = path.resolve("components/icons");

// Asegura que la carpeta de salida exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Comando SVGR
const cmd = `npx @svgr/cli --native ${iconsInput} --out-dir ${outputDir} --typescript --icon`;

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error al convertir SVGs:", stderr);
    process.exit(1);
  } else {
    console.log("✅ SVGs convertidos a componentes React Native:");
    console.log(stdout);
  }
});
