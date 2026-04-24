export const Colors = {
  light: {
    // Textos
    textDefault: "#374151", // gray-700
    textMuted: "#6b7280", // gray-500
    textError: "#ef4444", // red-500
    textOnColor: "#ffffff",

    // Botones secundarios
    textSecondaryBg: "#dadbdc",
    textSecondaryBorder: "#a7a7a7",

    // Primarios por rol
    brandCommon: "#5a32ea", // violet-600
    brandBuyer: "#2563eb", // blue-600
    brandSeller: "#ea580c", // orange-600

    // Error
    errorSoft: "#fcc7c7",
    error: "#ef4444",

    //Badges
    badge: "#b30606",

    //Background SubMenuPendientes
    bgSubMenuPendientes: "#f7d3c8", // ambar-50

    // Para fondos suaves
    tipsColorBuyer: "#1D4ED8", // blue-700

    // Bordes cards dentro de las cards del comprador
    borderTopBottom: "#72a5cf", //

    // Superficies
    headerFooterBg: "rgba(255,255,255,0.8)",
    cardBg: "#ffffff",
    background: "#ededed", // gray-100
    border: "#E5E7EB",
    bgPressed: "#f3f4f6", // color al presionar (gris-100)

    //linea de tiempo - Estado del pedido
    fondoCirculo: "#D3D3D3", // lightgray
    fondoCirculoActivo: "#c5e2fa", // celeste
    success: "#059669", // green-400 (verde esmeralda)

    //para TipsBottomSheet
    brandBuyerSoft: "#E0F2FE", // blue-100 = fondo suave
    brandSellerSoft: "#f7d3c8", //ambar-100 = fondo suave

    // Inputs (InputField)
    inputBorder: "#E0E0E0",

    // EtiquetasEstadoDelPedido
    statusRedBg: "#FEE2E2",
    statusRedDot: "#EF4444",
    statusGreenBg: "#DCFCE7",
    statusGreenDot: "#16A34A",
    statusMintBg: "#E0F2F1",
    statusMintDot: "#00796B",
    statusOrangeBg: "#FFDACA",
    statusOrangeDot: "#F97316",
    statusYellowBg: "#FEF3C7",
    statusYellowDot: "#F59E0B",
    statusPurpleBg: "#EDE9FE",
    statusPurpleDot: "#7C3AED",
    statusBlueBg: "#DBEAFE",
    statusBlueDot: "#2563EB",
    statusCyanBg: "#E0F7FA",
    statusCyanDot: "#00ACC1",
    statusTurquoiseBg: "#82f5ee",
    statusTurquoiseDot: "#046963",
    statusLavenderBg: "#E0E7FF",
    statusLavenderDot: "#4F46E5",
    statusCanceledBg: "#F8D7DA",
    statusCanceledDot: "#C82333",

    // Reloj
    relojBuyer: "#0730a3", // azul oscuro
    relojSeller: "#ba480d", //naranja oscuro
    relojTiempoTerminado: "#f79e94", //rojo suave (salmón)
  },
  dark: {
    // Textos
    textDefault: "#ECEDEE",
    textMuted: "#9ca3af", // gray-400
    textError: "#f87171", // red-400
    textOnColor: "#ffffff",

    // Botones secundarios
    textSecondaryBg: "#636363",
    textSecondaryBorder: "#a7a7a7",

    // Primarios por rol
    brandCommon: "#8b5cf6", // violet-500
    brandBuyer: "#52a0fa", // blue-500
    brandSeller: "#ed6728", // orange-500

    // Error
    errorSoft: "#fcc7c7",
    error: "#ef4444",

    //Badges
    badge: "#b30606",

    //Background SubMenuPendientes
    bgSubMenuPendientes: "#504d4b62", // ambar-50

    // Para fondos suaves
    tipsColorBuyer: "#64B5F6", // blue-400

    // Bordes cards dentro de las cards del comprador
    borderTopBottom: "#72a5cf", //

    // Superficies
    headerFooterBg: "rgba(17,24,39,.9)",
    cardBg: "#374151", // gray-700
    background: "#1f2937", // gray-800
    border: "#374151", // gray-700
    bgPressed: "#3f3f46", // zinc-700

    //linea de tiempo - Estado del pedido
    fondoCirculo: "#D3D3D3", // lightgray
    fondoCirculoActivo: "#a8d0f0", // celeste
    success: "#10b981", // green (verde esmeralda más brillante)

    //para TipsBottomSheet
    brandBuyerSoft: "#1E3A8A", // blue-900 = fondo suave
    brandSellerSoft: "#78350F", //ambar-900 = fondo suave

    // Inputs (InputField)
    inputBorder: "#333333",

    // EtiquetasEstadoDelPedido
    statusRedBg: "#7F1D1D",
    statusRedDot: "#F87171",
    statusGreenBg: "#14532D",
    statusGreenDot: "#4ADE80",
    statusMintBg: "#134E4A",
    statusMintDot: "#2DD4BF",
    statusOrangeBg: "#b54404",
    statusOrangeDot: "#FB923C",
    statusYellowBg: "#78350F",
    statusYellowDot: "#FACC15",
    statusPurpleBg: "#4C1D95",
    statusPurpleDot: "#C4B5FD",
    statusBlueBg: "#1E3A8A",
    statusBlueDot: "#60A5FA",
    statusCyanBg: "#083344",
    statusCyanDot: "#22D3EE",
    statusTurquoiseBg: "#166e69",
    statusTurquoiseDot: "#05faec",
    statusLavenderBg: "#312E81",
    statusLavenderDot: "#A5B4FC",
    statusCanceledBg: "#4A1F24",
    statusCanceledDot: "#F5B3BA",

    // Reloj
    relojBuyer: "#6ce5f5",
    relojSeller: "#f7d4c1",
    relojTiempoTerminado: "#57312d",
  },
} as const;

// Helpers
//getColorByRole devuelve el color direct en HEX para usar en style={{color: ...}} o en props de SVGs
export const getColorByRole = (
  role: "buyer" | "seller",
  theme: "light" | "dark" = "light",
): string => {
  const themeColors = Colors[theme];
  switch (role) {
    case "buyer":
      return themeColors.brandBuyer;
    case "seller":
      return themeColors.brandSeller;
    default:
      return themeColors.brandCommon;
  }
};

// Texto de botón secundario
export const getSecondaryTextColor = (
  theme: "light" | "dark" = "light",
): string => {
  return Colors[theme].textDefault;
};

export const getSecondaryBgColor = (
  theme: "light" | "dark" = "light",
): string => {
  return Colors[theme].textSecondaryBg;
};
