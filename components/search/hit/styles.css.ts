import { style } from "@vanilla-extract/css";
import { vars } from "../../styles.css";

const hitHighlightRule = {
  backgroundColor: vars.color.greyBackground,
}
export const hitStyle = style({
  display: "block",
  padding: "0.5em",
  textDecoration: "none",
  ":hover": hitHighlightRule,
  ":focus": hitHighlightRule,
})

export const titleStyle = style({
  fontSize: vars.fontSize.h2,
})
