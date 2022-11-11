import client, { getClient } from "../sanity";

export interface PageQuery extends Omit<Sanity.Schema.Page, "slug"> {
  slug: string;
}

export interface SubpageQuery {
  title: string;
  order: number;
  slug: string;
}

export async function getAllPagesWithSlug(): Promise<Array<{ slug: string, parentSlug: string | null }>> {
  return await client.fetch(`*[_type == "page"]{ 'slug': slug.current, 'parentSlug': parent.page->slug.current }`);
}

export async function getPage(
  slug: string | string[] | undefined,
  preview: boolean
): Promise<PageQuery> {
  return getClient(preview)
    .fetch(
      `*[ _type == "page" && slug.current == $slug ]{
      name,
      title,
      'slug': slug.current,
      description,
      components,
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
