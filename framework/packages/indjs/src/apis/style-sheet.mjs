// Mock StyleSheet for compatibility.
// In INDJS web, we usually use standard style objects or CSS.
// This allows StyleSheet.create({}) to return the objects as-is.

export const StyleSheet = {
  create: (styles) => styles,
  flatten: (styles) => {
    if (!styles) return {};
    if (Array.isArray(styles)) {
      return styles
        .flat(Infinity)
        .reduce((acc, item) => (item ? { ...acc, ...item } : acc), {});
    }
    return styles;
  },
  hairlineWidth: 1,
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  absoluteFillObject: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

export default StyleSheet;
