import { style } from "@vanilla-extract/css";

export const listStyle = style({
  display: "grid",
  gap: "1em",
  gridTemplateColumns: "1fr",
  "@media": {
    "screen and (min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "screen and (min-width: 900px)": {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
});

export const linkStyle = style({
  textDecoration: "none",
});

export const imageStyle = style({
  width: "100%",
});
