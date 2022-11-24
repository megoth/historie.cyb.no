import React from "react";
import { AlbumImageQuery, AlbumWithImagesQuery } from "../../lib/api/gallery";
import Container from "../container";
import { imageBuilder } from "../../lib/sanity";
import TextBlock from '../text-block';
import Link from '../link';
import { photoImgStyle, albumPhotoLinkStyle, albumPhotosStyle, albumPhotoCurrentLinkStyle, albumPhotosTitle } from './styles.css';
import clsx from 'clsx';
import { asFullSize, asThumbnail } from '../../lib/images';

interface AlbumImageProps {
  album: AlbumWithImagesQuery;
  photo: AlbumImageQuery;
}

export default function AlbumImage({ album, photo }: AlbumImageProps) {
  const image = imageBuilder(photo.image);
  const photoIndex = album.images.map((image) => image._key).indexOf(photo._key);
  const photoIsLast = photoIndex === album.images.length - 1;
  const albumPhotoLineStart = Math.max(photoIndex - (photoIsLast ? 2 : 1), 0);
  const albumPhotos = album.images.slice(albumPhotoLineStart, albumPhotoLineStart + 3);
  return (
    <Container>
      <Link href={image.url()}>
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
        <div aria-hidden={true}>{photo.alt}</div>
      )}
      {albumPhotos.length > 1 && (
        <>
          <h2 className={albumPhotosTitle}>Bilder i album</h2>
          <ul className={albumPhotosStyle}>
            {albumPhotos.map((albumPhoto) => (
              <li key={`albumPhoto-${albumPhoto._key}`}>
                <Link href={`/gallery/${album.slug}/${albumPhoto._key}#content`} className={clsx(albumPhotoLinkStyle, {
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
