# 🧩 App Expo – Proyecto React Native

Proyecto basado en [Expo](https://expo.dev) con estructura modular, componentes reutilizables, manejo de íconos SVG convertidos en componentes RN y generación de index.ts con `npm run svgs:all`.

---

## 🚀 Primeros pasos

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar la app:

```bash
npx expo start
```

---

## ⚙️ Scripts disponibles

| Comando                  | Descripción                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `npm run convertir:svgs` | Convierte íconos `.svg` a componentes React Native (`components/icons`)  |
| `npm run generate:icons` | Genera `index.ts` en `components/icons` con todos los íconos convertidos |
| `npm run svgs:all`       | Ejecuta ambos scripts anteriores en secuencia                            |

---

## 🧩 Cómo agregar nuevos íconos SVG

1. Copiá tus archivos .svg a la carpeta:

```bash
assets/icons/
```

2. Ejecutá:

```bash
npm run svgs:all
```

_Esto convertirá automáticamente los SVGs en componentes RN en components/icons y actualizará su index.ts._

3. Importá íconos fácilmente:

```bash
import { Home, Historial } from '@/components/icons';

<Home width={24} height={24} />

```

### 📁 Estructura relevante

```bash
assets/
  icons/     ← *SVGs originales (vacía por defecto)*
  images/    ← *(Futuro uso para imágenes)*
  emojis/    ← *(Futuro uso para emojis)*

components/
  icons/     ← *Íconos convertidos como componentes RN*
  index.ts   ← *Exporta todos los íconos*

scripts/
  convertir-svgs.ts
  generate-icons-index.ts
```

### ❗ Importante

1. No edites manualmente components/icons/index.ts, se genera automáticamente.
2. La carpeta assets/icons puede permanecer vacía: usala solo para nuevos SVGs.
3. No se usan require() para importar imágenes en este proyecto.
