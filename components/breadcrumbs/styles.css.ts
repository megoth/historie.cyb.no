import { style } from "@vanilla-extract/css";

export const listStyle = style({
  display: "flex",
  alignItems: "center",
  margin: "1em 0",
  listStyleType: "none",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});

export const listItemStyle = style({
  display: "flex",
  alignItems: "baseline",
})

export const caretStyle = style({
  flexGrow: 1,
  height: "1em",
})

export const caretInnerStyle = style({
  position: "relative",
  top: "0.1em",
})

export const linkStyle = style({
  flexGrow: 1,
})
