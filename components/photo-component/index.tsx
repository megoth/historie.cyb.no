import React from "react";
import { ComponentProps } from "../page-components";
import Container from '../container';
import { imageBuilder } from '../../lib/sanity';
import { captionStyle, figureStyle } from './styles.css';
import TextBlock from '../text-block';
import { asFullSize } from '../../lib/images';
import Link from "../link";

interface Props extends ComponentProps {
  component: Sanity.Schema.ImageComponent
}

export default function PhotoComponent({ component }: Props) {
  const photo = component.photo;
  const image = imageBuilder(photo.image);
  return <Container>
    <figure className={figureStyle}>
      <Link href={image.url()}>
        <img
          src={asFullSize(image).url()}
          alt={photo.alt}
        />
      </Link>
      {photo.description ?
        <caption className={captionStyle}>
          <TextBlock text={photo.description} />
        </caption> :
        <caption className={captionStyle} aria-hidden={true}>{photo.alt}</caption>
      }
    </figure>
  </Container>;
}
