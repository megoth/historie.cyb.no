import React from "react";
import { AlbumQuery } from "../../lib/api/gallery";
import { imageBuilder } from "../../lib/sanity";
import Container from "../container";
import { imageStyle, linkStyle, listStyle } from "./styles.css";
import Link from "../link";
import { asThumbnail } from '../../lib/images';
import { pageSlugs } from '../../lib/pages';

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
                href={`/${pageSlugs.GALLERY}/${slug}`}
                className={linkStyle}
              >
                <img className={imageStyle} src={asThumbnail(imageBuilder(mainImage), 575).url()} />
                <div>{name}</div>
              </Link>
            </li>
          ))}
      </ul>
    </Container>
  );
}
