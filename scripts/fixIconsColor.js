// Corrige los íconos SVG de React Native para que acepten color dinámico (antes tenía hardcodeado currentColor en fill y/o stroke)
// Ejecutarlo así:
// cd scripts
// node fixIconsColor.js

const fs = require("fs");
const path = require("path");

// si ejecutás el script desde /scripts, esta ruta sube un nivel hacia la raíz
const scriptDir = path.dirname(process.argv[1] || process.cwd());
const iconsDir = path.resolve(scriptDir, "../components/icons");

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let updated = content;

  // reemplazar fill y stroke con currentColor
  updated = updated.replace(
    /fill="currentColor"/g,
    'fill={props.color || "currentColor"}'
  );
  updated = updated.replace(
    /stroke="currentColor"/g,
    'stroke={props.color || "currentColor"}'
  );

  // agregar color={props.color} en el tag <Svg ...>
  updated = updated.replace(/<Svg([^>]+)>/, (match, attrs) => {
    if (!attrs.includes("color=")) {
      return `<Svg${attrs} color={props.color}>`;
    }
    return match;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Actualizado: ${path.basename(filePath)}`);
  } else {
    console.log(`ℹ️  Sin cambios: ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith(".tsx") && file !== "index.ts") {
      processFile(fullPath);
    }
  }
}

console.log("🛠️ Corrigiendo íconos en:", iconsDir);
walkDir(iconsDir);
console.log("✨ Finalizado.");
