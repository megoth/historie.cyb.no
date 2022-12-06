import React from "react";
import { AlbumWithImagesQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import { imageStyle, listStyle } from "./styles.css";
import Link from "../link";
import { asThumbnail } from '../../lib/images';
import { pageSlugs } from '../../lib/pages';

interface Props {
  album: AlbumWithImagesQuery;
}

export default function Album({ album }: Props) {
  return (
    <Container>
      <ul className={listStyle}>
        {album.images?.map((photo, index) => (
          <li key={`${album.slug}-${index}`}>
            <Link href={`/${pageSlugs.GALLERY}/${album.slug}/${photo._key}#content`}>
              <img
                className={imageStyle}
                src={asThumbnail(imageBuilder(photo.image), 575).url()}
                alt={photo.alt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
