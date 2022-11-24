import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { maxPageWidth, thumbnailHeight, thumbnailWidth } from '../components/styles.css';

export function asThumbnail(image: ImageUrlBuilder): ImageUrlBuilder {
  return image.height(thumbnailHeight).width(thumbnailWidth);
}

export function asFullSize(image: ImageUrlBuilder): ImageUrlBuilder {
  return image.fit("fillmax").width(maxPageWidth);
}
