import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { maxPageWidth, thumbnailHeight, thumbnailWidth } from '../components/styles.css';

export function asThumbnail(image: ImageUrlBuilder, width: number = thumbnailWidth): ImageUrlBuilder {
  const height = Math.round(thumbnailHeight * (width / thumbnailWidth));
  return image.height(height).width(width);
}

export function asFullSize(image: ImageUrlBuilder): ImageUrlBuilder {
  return image.fit("fillmax").width(maxPageWidth);
}
