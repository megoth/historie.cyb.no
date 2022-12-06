import { vars } from '../styles.css';
import { style } from '@vanilla-extract/css';

const buttonHighlightRule = {
  backgroundColor: vars.color.greyBackground,
  borderColor: vars.color.text,
  color: vars.color.text,
}
export const buttonStyle = style({
  border: `solid 1px ${vars.color.grey}`,
  borderRadius: vars.borderRadius.default,
  color: vars.color.grey,
  display: "inline-block",
  fontSize: vars.fontSize.small,
  margin: "0.5em 0",
  textDecoration: "none",
  ":focus": buttonHighlightRule,
  ":hover": buttonHighlightRule,
});

export const buttonInnerStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25em",
  padding: "0.25em 0.5em",
});
