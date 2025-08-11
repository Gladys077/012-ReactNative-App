export const Sizes = {
  headerHeight: "56px",
};

export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  xl: 20,
  full: 999,
};

export const FontSizes = {
  sm: 12,
  base: 14,
  lg: 18,
  xl: 24,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
};



/* Modo de uso:
style={{ width: Size.icon, padding: Spacing.md, borderRadius: BorderRadius.md}}

<Text className={["text-base", "text-primary-buyer"].join(" ")} />

<SomeIcon width={Sizes.icon} height={Sizes.icon} />

*/
