# ⚙️ Scripts del Proyecto

Este directorio contiene scripts automatizados para facilitar tareas del proyecto.

---

## 🖼️ `generate-assets-index.js`

### 📌 ¿Qué hace?

Escanea las carpetas de imágenes (`assets/images`, `icons`, `emojis`) y genera automáticamente los archivos `index.js` para importar las imágenes de forma centralizada.

---

### 🚀 Cómo usarlo 👀

Cada vez que agregues, elimines o cambies imágenes en esas carpetas, corré:
(Esto va a actualizar automáticamente los archivos index.js que están dentro de las carpetas -images, -icons, -emojis).

```bash
npm run generate:assets
```

---

### 📦 Cómo importar imágenes

```bash
import { MoritaFeliz, Avatar } from '../../assets/images';
import { EmojiFeliz } from '../../assets/emojis';
```

---

### ⚠️ Importante

- No edites manualmente los archivos `index.js`.
- Solo se procesan imágenes con extensiones: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`.
- Si agregás más carpetas, deberás actualizarlas en el script.

---
