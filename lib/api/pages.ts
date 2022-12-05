import client, { getClient } from "../sanity";
import { Asset } from '@sanity/types/src/assets/types';

export interface PageQuery extends Omit<Sanity.Schema.Page, "slug"> {
  slug: string;
}

export interface SubpageQuery {
  title: string;
  order: number;
  slug: string;
}

export interface FileComponentQuery extends Omit<Sanity.Schema.FileComponent, "file"> {
  file: Asset;
}

export async function getAllPagesWithSlug(): Promise<Array<{ slug: string, parentSlug: string | null }>> {
  return await client.fetch(`*[_type == "page"]{ 'slug': slug.current, 'parentSlug': parent.page->slug.current }`);
}

export async function getPage(
  slug: string | string[] | undefined,
  preview: boolean
): Promise<PageQuery> {
  return getClient(preview)
    .fetch(`*[ _type == "page" && slug.current == "2009v" ]{
      name,
      title,
      'slug': slug.current,
      description,
      'components': components[]{
        _type,
        name,
        photo,
        text,
        type,
        'file': file.asset->,
        variant,
      },
    }`,
      { slug }
    )
    .then((res) => res?.[0] || null);
}

export async function getSubpages(
  slug: string | string[] | undefined,
  preview: boolean
): Promise<SubpageQuery> {
  return getClient(preview)
    .fetch(
      `*[ _type == "page" && parent.page->slug.current == $slug ]{
      title,
      'slug': slug.current,
      'order': parent.orderNo,
    }`,
      { slug }
    );
}
