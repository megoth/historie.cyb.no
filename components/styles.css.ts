import { createTheme, globalStyle } from "@vanilla-extract/css";

export const maxPageWidth = 800;
export const thumbnailWidth = 256;
export const thumbnailHeight = thumbnailWidth / 16 * 9;

export const [themeClass, vars] = createTheme({
  borderRadius: {
    default: "4px",
  },
  color: {
    base: "#212020",
    black: "#000000",
    grey: "#CCCCCC",
    text: "#FFFFFF",
    white: "#FFFFFF",
  },
  font: {
    body: "'Roboto', sans-serif",
    title: "'Roboto Slab', serif",
  },
  fontSize: {
    h1: "2rem",
    h2: "1.5rem",
    h3: "1.25rem",
    medium: "1rem",
    small: "0.75rem",
    tiny: "0.6rem",
  },
  fontWeight: {
    body: {
      regular: "300",
      bold: "700",
    },
    title: {
      regular: "400"
    }
  },
  lineHeight: {
    base: "1.4",
  },
  pageWidth: {
    medium: "600px",
    large: `${maxPageWidth}px`,
  },
  zIndex: {
    base: "0",
    modal: "1000",
  },
});

globalStyle("html, body, #__next", {
  height: "100%",
});

globalStyle("body", {
  backgroundColor: vars.color.base,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontStyle: "normal",
  fontWeight: vars.fontWeight.body.regular,
  lineHeight: vars.lineHeight.base,
});

globalStyle("a", {
  color: vars.color.text,
});

globalStyle("em", {
  color: vars.color.text,
  fontWeight: vars.fontWeight.body.bold,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: "2rem 0 1.5rem 0",
  fontFamily: vars.font.title,
  fontWeight:vars.fontWeight.title.regular,
});

globalStyle("h1", {
  fontSize: vars.fontSize.h1,
});

globalStyle("h2", {
  fontSize: vars.fontSize.h2,
});

globalStyle("h3", {
  fontSize: vars.fontSize.h3,
});

globalStyle("img", {
  maxWidth: "100%",
});

globalStyle("p", {
  margin: "1rem 0",
});

globalStyle("strong", {
  fontWeight: vars.fontWeight.body.bold,
});
