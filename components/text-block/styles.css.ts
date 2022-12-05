import { globalStyle, style } from "@vanilla-extract/css";

export const textBlockStyle = style({});

const listRule = (margin: number = 1) => ({
  margin: `0.5em 0`,
  "@media": {
    "screen and (min-width: 640px)": {
      margin: `0.5em ${margin}rem`,
    },
  },
});

export const olRule = {
  listStyle: "number",
  ...listRule(1.8),
}
globalStyle(`${textBlockStyle} ol`, olRule)

export const ulRule = {
  listStyle: "disc",
  ...listRule(),
};
globalStyle(`${textBlockStyle} ul`, ulRule);

globalStyle(`${textBlockStyle} blockquote`, {
  // color: vars.color.green,
  margin: "1rem",
});
