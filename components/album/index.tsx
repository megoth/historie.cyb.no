import React from "react";
import { AlbumWithImagesQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import { listStyle } from "./styles.css";
import Link from "../link";

interface Props {
  album: AlbumWithImagesQuery;
}

export default function Album({ album }: Props) {
  return (
    <Container>
      <ul className={listStyle}>
        {album.images?.map((photo, index) => (
          <li key={`${album.slug}-${index}`}>
            <Link href={`/gallery/${album.slug}/${photo._key}`}>
              <img
                src={
                  imageBuilder(photo.image).height(200).width(256).url() || undefined
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
