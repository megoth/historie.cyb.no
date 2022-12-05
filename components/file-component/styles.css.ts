import { style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

const highlightRule = {
  backgroundColor: vars.color.greyBackground,
};
export const containerStyle = style({
  border: `solid 1px ${vars.color.text}`,
  borderRadius: vars.borderRadius.default,
  display: "flex",
  alignItems: "center",
  gap: "0.5em",
  padding: "0.5em 0.75em",
  textDecoration: "none",
  ":focus": highlightRule,
  ":hover": highlightRule,
});

export const mainInfoStyle = style({
  flexGrow: 1,
});

export const metaDataStyle = style({
  color: vars.color.grey,
})

export const downloadIconStyle = style({
  display: "none",
  "@media": {
    "screen and (min-width: 640px)": {
      display: "inline-block"
    },
  },
})
