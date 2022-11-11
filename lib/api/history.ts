import client, { getClient } from "../sanity";

export interface EventQuery
  extends Omit<Sanity.Schema.Event, "slug" | "sources" | "associations"> {
  slug: string;
  sources: Array<Sanity.Schema.Source>;
}

export interface EventForListQuery
  extends Omit<Sanity.Schema.Event, "slug" | "sources" | "associations"> {
  slug: string;
}

export async function getAllEventsForHistoryPage(
  preview: boolean
): Promise<Array<EventForListQuery>> {
  return getClient(preview)
    .fetch(`*[ _type == "event" ] | order(year asc, date asc){
    name,
    short,
    year,
    date,
    major,
    'slug': slug.current,
    description,
  }`);
}

export async function getAllEventsWithSlug(): Promise<Array<{ slug: string }>> {
  return client.fetch(
    `*[_type == "event" && defined(slug)]{ 'slug': slug.current }`
  );
}

export function getYearsFromEvents(events: Array<EventForListQuery>): string[] {
  return events.map(({ year }) => year);
}

export async function getEvent(
  slug: string | string[] | undefined,
  preview: boolean
) {
  return getClient(preview)
    .fetch(
      `*[ _type == "event" && slug.current == $slug ]{
    name,
    short,
    year,
    date,
    major,
    'slug': slug.current,
    description,
    'sources': sources[]->,
  }`,
      { slug }
    )
    .then((res) => res?.[0]);
}
