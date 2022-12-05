import { style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

export const containerStyle = style({
  border: `solid 1px ${vars.color.text}`,
  borderRadius: vars.borderRadius.default,
  display: "flex",
  alignItems: "center",
  gap: "0.5em",
  padding: "1em",
});

export const metaDataStyle = style({
  color: vars.color.grey,
})
