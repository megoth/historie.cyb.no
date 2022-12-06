import { style } from "@vanilla-extract/css";
import { vars } from '../styles.css';

export const descriptionBlockStyle = style({
  margin: "0.5em 0",
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
