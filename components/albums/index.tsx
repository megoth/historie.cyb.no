import React from "react";
import { AlbumQuery } from "../../lib/api/gallery";
import { imageBuilder } from "../../lib/sanity";
import Container from "../container";
import { linkStyle, listStyle } from "./styles.css";
import Link from "../link";
import { asThumbnail } from '../../lib/images';

interface Props {
  albums: Array<AlbumQuery>;
}

export default function Albums({ albums }: Props) {
  return (
    <Container>
      <ul className={listStyle}>
        {albums
          .filter((album) => !!album.mainImage)
          .map(({ slug, mainImage, name }) => (
            <li key={slug}>
              <Link
                href={`/gallery/${slug}`}
                className={linkStyle}
              >
                <img
                  src={asThumbnail(imageBuilder(mainImage)).url()}
                />
                <div>{name}</div>
              </Link>
            </li>
          ))}
      </ul>
    </Container>
  );
}
