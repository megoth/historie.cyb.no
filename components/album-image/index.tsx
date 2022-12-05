import React from "react";
import { AlbumImageQuery, AlbumWithImagesQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import TextBlock from '../text-block';
import Link from '../link';
import {
  photoImgStyle,
  albumPhotoLinkStyle,
  albumPhotosStyle,
  albumPhotoCurrentLinkStyle,
  albumPhotosTitle,
  downloadButtonStyle,
  downloadButtonInnerStyle,
  descriptionBlockStyle
} from './styles.css';
import clsx from 'clsx';
import { asFullSize, asThumbnail } from '../../lib/images';
import { pageSlugs } from '../../lib/pages';
import { BsDownload } from 'react-icons/bs';

interface AlbumImageProps {
  album: AlbumWithImagesQuery;
  photo: AlbumImageQuery;
}

export default function AlbumImage({ album, photo }: AlbumImageProps) {
  const image = imageBuilder(photo.image);
  const photoIndex = album.images.map((image) => image._key).indexOf(photo._key);
  const photoIsLast = photoIndex === album.images.length - 1;
  const albumPhotoLineStart = Math.max(photoIndex - (photoIsLast ? 2 : 1), 0);
  const photos = album.images.slice(albumPhotoLineStart, albumPhotoLineStart + 3);
  const nextImageUrl = getPhotoUrl(album, photos[2] || photos[1] || photos[0]);
  return (
    <Container>
      <Link href={nextImageUrl}>
        <img
          id={"image"}
          src={asFullSize(image).url()}
          alt={photo.alt}
          className={photoImgStyle}
        />
      </Link>
      {photo.description ? (
        <div>
          <TextBlock text={photo.description}/>
        </div>
      ) : (
        <div aria-hidden={true} className={descriptionBlockStyle}>{photo.alt}</div>
      )}
      <Link href={image.url()} className={downloadButtonStyle}>
        <span className={downloadButtonInnerStyle}>
          <span>Last ned originalstørrelse</span>
          <BsDownload />
        </span>
      </Link>
      {photos.length > 1 && (
        <>
          <h2 className={albumPhotosTitle}>Bilder i album</h2>
          <ul className={albumPhotosStyle}>
            {photos.map((albumPhoto) => (
              <li key={`albumPhoto-${albumPhoto._key}`}>
                <Link href={getPhotoUrl(album, albumPhoto)} className={clsx(albumPhotoLinkStyle, {
                  [albumPhotoCurrentLinkStyle]: albumPhoto._key === photo._key
                })}>
                  <img
                    src={asThumbnail(imageBuilder(albumPhoto.image)).url()}
                    alt={albumPhoto.alt}
                    className={photoImgStyle}/>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}

function getPhotoUrl(album: AlbumWithImagesQuery, photo: AlbumImageQuery): string {
  return `/${pageSlugs.GALLERY}/${album.slug}/${photo._key}#content`
}
