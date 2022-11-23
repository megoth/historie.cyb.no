import React from "react";
import { AlbumImageQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import TextBlock from '../text-block';
import Link from '../link';
import { maxPageWidth } from '../styles.css';

interface AlbumImageProps {
  photo: AlbumImageQuery;
}

export default function AlbumImage({ photo }: AlbumImageProps) {
  const image = imageBuilder(photo.image);
  return (
    <Container>
      <Link href={image.url()}>
        <img
          src={image.maxWidth(maxPageWidth).url()}
          alt={photo.alt}
        />
      </Link>
      {photo.description ?
        <div>
          <TextBlock text={photo.description} />
        </div> :
        <div aria-hidden={true}>{photo.alt}</div>
      }
    </Container>
  );
}
