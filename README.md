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

---

---

# 🎨 Guía de Colores - Para el Equipo

## 📋 Roles de Usuario

- **buyer** = Comprador (azul)
- **seller** = Vendedor (naranja)
- **common** = Páginas comunes (violeta)

## 🔧 Cómo usar colores en componentes

### ✅ MÉTODO 1: Color directo (SIEMPRE funciona)

```tsx
import { getColorByRole, Colors } from '@/constants/Colors';

// Para íconos, SVG, style={{ color: ... }}
<Icon color={getColorByRole('seller')} />
<Text style={{ color: getColorByRole('buyer') }}>Texto azul</Text>

// Para textos normales
<Text style={{ color: Colors.light.textDefault }}>Texto normal</Text>
<Text style={{ color: Colors.light.textMuted }}>Texto gris</Text>
```

### ✅ MÉTODO 2: Clases Tailwind (cuando funciona)

```tsx
import { getTailwindClass } from '@/constants/Colors';

// Para textos y fondos con Tailwind
<Text className={getTailwindClass('seller', 'text')}>Texto naranja</Text>
<View className={getTailwindClass('buyer', 'bg')}>Fondo azul</View>
```

## 🚦 CUÁNDO USAR CADA MÉTODO

| Caso                  | Usar          | Ejemplo                                       |
| --------------------- | ------------- | --------------------------------------------- |
| **Íconos SVG**        | Color directo | `color={getColorByRole('seller')}`            |
| **Texto normal**      | Tailwind      | `className="text-orange-600"`                 |
| **Si Tailwind falla** | Color directo | `style={{ color: getColorByRole('seller') }}` |
| **Fondos**            | Tailwind      | `className="bg-blue-600"`                     |

## 📖 EJEMPLOS COMUNES

### Botón que cambia por rol:

```tsx
const RoleButton = ({ role, children, onPress }) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: getColorByRole(role),
      padding: 16,
      borderRadius: 8,
    }}
  >
    <Text style={{ color: "white" }}>{children}</Text>
  </Pressable>
);

// Uso:
<RoleButton role="seller" onPress={handlePress}>
  Botón Vendedor
</RoleButton>;
```

### Ícono con estado activo:

```tsx
const StatusIcon = ({ role, active, icon: Icon }) => {
  const color = active ? getColorByRole(role) : Colors.light.textMuted;

  return <Icon color={color} />;
};

// Uso:
<StatusIcon role="buyer" active={true} icon={HomeIcon} />;
```

## ⚡ TIPS PRO

1. **Usa `getColorByRole()`** cuando necesitemos el color exacto
2. **Usa `getTailwindClass()`** para clases CSS
3. **Siempre importa desde `@/constants/Colors`**
4. **En caso de duda, usa color directo** (siempre funciona)

## 🐛 PROBLEMAS COMUNES

**❌ Error**: "No se ve el color"
**✅ Solución**: Cambiar de className a style

```tsx
// ❌ Puede fallar:
<Text className="text-primary-seller">Texto</Text>

// ✅ Siempre funciona:
<Text style={{ color: getColorByRole('seller') }}>Texto</Text>
```
