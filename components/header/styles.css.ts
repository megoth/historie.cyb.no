import { style } from "@vanilla-extract/css";
import { vars } from "../styles.css";

export const headerHeight = 130;

export const headerStyle = style({
  alignItems: "center",
  background: vars.color.base,
  display: "flex",
  gap: "1em",
  height: headerHeight,
  padding: 0,
  justifyContent: "space-between",
});

export const headerChildStyle = style({
  flexGrow: 0,
  selectors: {
    "&:first-child": {
      flexGrow: 1,
    }
  }
})

