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
  icons/     ← *SVGs originales*
  images/    ← *Imágenes estáticas*
  emojis/    ← *Emojis*

components/
  icons/     ← Íconos convertidos como componentes RN
  index.ts   ← Exporta todos los íconos (generado automáticamente)
  shared/    ← Componentes compartidos entre buyer y seller
  subcomponentes/ ← Componentes reutilizables menores
  UI/        ← Elementos de interfaz genéricos (Button, LineaDivisoria, etc.)
  Comprador/ ← Cards y componentes exclusivos del lado comprador
  vendedor/  ← Cards y componentes exclusivos del lado vendedor

context/
  OrdersContext.tsx   ← Estado global de pedidos, historiales y calificaciones
  ThemeContext.tsx    ← Tema claro/oscuro
  AuthContext.tsx     ← Rol activo (buyer/seller)

constants/
  Colors.ts   ← Paleta de colores por tema (light/dark)
  Tokens.ts   ← Spacing, FontSizes, BorderRadius

types/
  pedidos.ts  ← Tipos: Pedido, EstadoSistema, EstadoComprador, EstadoVendedor, etc.

```

---

---

## 🎨 Sistema de colores - (para el equipo)

El proyecto **no usa NativeWind ni Tailwind**. Los colores se manejan a través de `ThemeContext` y se consumen con el hook `useTheme()`.

```tsx
import { useTheme } from '@/context/ThemeContext';

const { colors, fonts } = useTheme();

Texto
...
```

### Roles de usuario

| Rol        | Color   | Uso                 |
| ---------- | ------- | ------------------- |
| **buyer**  | Azul    | Sección comprador   |
| **seller** | Naranja | Sección vendedor    |
| **common** | Violeta | Páginas compartidas |

Los colores de marca por rol se acceden directamente desde `colors`:

```tsx
colors.brandBuyer; // azul comprador
colors.brandSeller; // naranja vendedor
```

---

## 🔄 Flujo de estados de un pedido

Cada pedido tiene un `estadoSistema` como fuente de verdad, que se mapea a lo que ve cada rol:

- `estadoSistemaAComprador` → lo que ve el comprador
- `estadoSistemaAVendedor` → lo que ve el vendedor
- `estadoSistemaATabVendedor` → en qué tab aparece del lado vendedor

Al completarse la transacción:

- El comprador archiva en `historialComprador` vía `moverAHistorialComprador()`
- El vendedor archiva en `historialVendedor` vía `moverAHistorialVendedor()`

---

## ❗ Importante

1. No edites manualmente `components/icons/index.ts`, se genera automáticamente corriendo: `npm run generate:icons`.
2. La carpeta `assets/icons` puede permanecer vacía: usala solo para nuevos SVGs.
3. No se usan `require()` para importar imágenes en este proyecto.
4. Las animaciones de la mascota y el gif de delivery son de LottieFiles (free).
