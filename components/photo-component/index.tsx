import React from "react";
import { ComponentProps } from "../page-components";
import Container from '../container';
import { imageBuilder } from '../../lib/sanity';
import { captionStyle, figureStyle } from './styles.css';
import TextBlock from '../text-block';

interface Props extends ComponentProps {
  component: Sanity.Schema.ImageComponent
}

export default function PhotoComponent({ component }: Props) {
  const photo = component.photo;
  const image = imageBuilder(photo.image);
  return <Container>
    <figure className={figureStyle}>
      <img
        src={image.maxWidth(800).url()}
        alt={photo.alt}
      />
      {photo.description ?
        <caption className={captionStyle}>
          <TextBlock text={photo.description} />
        </caption> :
        <caption className={captionStyle} aria-hidden={true}>{photo.alt}</caption>
      }
    </figure>
  </Container>;
}
