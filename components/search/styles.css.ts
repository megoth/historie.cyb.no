import { ComplexStyleRule, globalStyle, style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

export const hitsContainerStyle = style({
  position: "relative",
});

const hitsRule: ComplexStyleRule = {
  position: "absolute",
  background: vars.color.base,
  padding: "0.5em",
};
export const hitsStyle = style(hitsRule);
globalStyle(`${hitsContainerStyle} .ais-Hits`, hitsRule)
