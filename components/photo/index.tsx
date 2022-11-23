import Link from '../link';
import { imageBuilder } from '../../lib/sanity';
import TextBlock from '../text-block';
import React from 'react';

interface PhotoProps extends Sanity.Schema.Photo {}

export function Photo({ image, alt, description }: PhotoProps) {
  return (
    <>
      <Link href={imageBuilder(image).url() || undefined}>
        <img
          src={
            imageBuilder(image).width(256).url() || undefined
          }
          alt={alt}
        />
      </Link>
      <TextBlock text={description}/>
    </>
  )
}
