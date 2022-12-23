import { ComplexStyleRule, globalStyle, style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

export const hitsContainerStyle = style({
});

const hitsRule: ComplexStyleRule = {
  background: vars.color.base,
};
export const hitsStyle = style(hitsRule);
globalStyle(`${hitsContainerStyle} .ais-Hits`, hitsRule)

globalStyle(`${hitsContainerStyle} .ais-Hits-item`, {
  borderBottom: `solid 1px ${vars.color.text}`,
})
globalStyle(`${hitsContainerStyle} .ais-Hits-item:last-child`, {
  borderBottom: 0,
})
