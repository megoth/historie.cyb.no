import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../styles.css";

export const listStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1em",
  "@media": {
    "screen and (min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const nameStyle = style({
  marginLeft: "0.5em",
})
