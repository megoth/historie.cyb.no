import React from "react";
import { AlbumWithImagesQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import { listStyle } from "./styles.css";
import Link from "../link";
import { asThumbnail } from '../../lib/image';

interface Props {
  album: AlbumWithImagesQuery;
}

export default function Album({ album }: Props) {
  return (
    <Container>
      <ul className={listStyle}>
        {album.images?.map((photo, index) => (
          <li key={`${album.slug}-${index}`}>
            <Link href={`/gallery/${album.slug}/${photo._key}#content`}>
              <img
                src={
                  asThumbnail(imageBuilder(photo.image)).url() || undefined
                }
                alt={photo.alt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
