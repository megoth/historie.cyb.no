import React from "react";
import { ComponentProps } from "../page-components";
import Container from '../container';
import { imageBuilder } from '../../lib/sanity';
import { captionAltStyle, captionStyle, figureStyle } from './styles.css';
import TextBlock from '../text-block';
import { asFullSize } from '../../lib/images';
import Link from "../link";
import DownloadButton from '../download-button';

interface Props extends ComponentProps {
  component: Sanity.Schema.ImageComponent
}

export default function PhotoComponent({ component }: Props) {
  const photo = component.photo;
  const image = imageBuilder(photo.image);
  return <Container>
    <figure className={figureStyle}>
      <img
        src={asFullSize(image).url()}
        alt={photo.alt}
      />
      {photo.description ?
        <figcaption className={captionStyle}>
          <TextBlock text={photo.description} />
        </figcaption> :
        <caption className={captionStyle} aria-hidden={true}>
          <span className={captionAltStyle}>{photo.alt}</span>
        </caption>
      }
    </figure>
  </Container>;
}
