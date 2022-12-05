import { style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

export const descriptionBlockStyle = style({
  margin: "0.5em 0",
})

const downloadButtonHighlightRule = {
  backgroundColor: vars.color.greyBackground,
  borderColor: vars.color.text,
  color: vars.color.text,
}
export const downloadButtonStyle = style({
  border: `solid 1px ${vars.color.grey}`,
  borderRadius: vars.borderRadius.default,
  color: vars.color.grey,
  display: "inline-block",
  margin: "0.5em 0",
  textDecoration: "none",
  ":focus": downloadButtonHighlightRule,
  ":hover": downloadButtonHighlightRule,
})

export const downloadButtonInnerStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25em",
  padding: "0.25em 0.5em",
})

export const albumPhotosTitle = style({
  fontSize: vars.fontSize.h3,
  margin: "1em 0 0",
});

export const albumPhotosStyle = style({
  marginTop: "0.5em",
  display: "grid",
  gap: "1em",
  gridTemplateColumns: "1fr 1fr 1fr",
});

export const albumPhotoLinkStyle = style({
  display: "block",
  opacity: 0.5,
  border: `3px solid ${vars.color.base}`,
  ":focus": {
    opacity: 1,
  },
  ":hover": {
    opacity: 1,
  }
});

export const albumPhotoCurrentLinkStyle = style({
  borderColor: vars.color.white,
})

export const photoImgStyle = style({
  display: "block",
})
