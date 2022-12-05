import { getClient } from "../sanity";
import { pageSlugs } from '../pages';

export interface PageUpdateQuery extends Sanity.Document {
  created: string;
  name: string;
  description: string;
  url: string;
}

export async function getAlbumUpdates(
  preview: boolean
): Promise<Array<PageUpdateQuery>> {
  return getClient(preview)
    .fetch(
      `*[_type == "album"][0...10] | order(_createdAt desc) {
      'created': _createdAt,
      name,
      'slug': slug.current
    }`
    )
    .then((albums) =>
      albums.map((album) => ({
        ...album,
        description: `Nytt album`,
        url: `/${pageSlugs.GALLERY}/${album.slug}`,
      }))
    );
}

export async function getEventUpdates(
  preview: boolean
): Promise<Array<PageUpdateQuery>> {
  return getClient(preview)
    .fetch(
      `*[_type == "event"]{
        'created': _createdAt,
        name,
        'slug': slug.current
      }|order(created desc)[0...10]`
    )
    .then((events) =>
      events.map((event) => ({
        ...event,
        description: `Ny hendelse publisert`,
        url: `/${pageSlugs.HISTORY}/${event.slug}`,
      }))
    );
}

export async function getPageUpdates(preview: boolean) {
  return Promise.all([
    getAlbumUpdates(preview),
    getEventUpdates(preview),
  ]).then(([albums, events]) =>
    albums
      .concat(events)
      .sort((a, b) => (a.created < b.created ? 1 : -1))
      .slice(0, 10)
  );
}
