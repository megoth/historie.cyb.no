import client, { getClient } from "../sanity";
import { getUrlForGroup } from '../urls';

export interface EventQuery
  extends Omit<Sanity.Schema.Event, "slug" | "sources" | "associations"> {
  slug: string;
  sources: Array<Sanity.Schema.Source>;
}

export interface EventForListQuery
  extends Omit<Sanity.Schema.Event, "slug" | "sources" | "associations"> {
  semester: string | undefined;
  href: string;
}

export async function getAllEventsForHistoryPage(
  preview: boolean
): Promise<Array<EventForListQuery>> {
  const [events, groups] = await Promise.all([
    getClient(preview)
      .fetch(`*[ _type == "event" ] | order(year asc, date asc){
    name,
    short,
    year,
    date,
    major,
    'slug': slug.current,
    description,
  }`),
    getClient(preview)
      .fetch(`*[ _type == "groupConstellation" ] | order(year desc, semester desc){
    group->,
    year,
    semester,
    'leader':members[0].person->name,
  }`)
  ]);
  return [
    ...events.map(({ slug, ...data }) => ({ ...data, href: `/history/${slug}` })),
    ...groups.map(({ group, year, semester, leader }) => ({
      name: `${group.name} ledes av ${leader}`,
      year,
      semester,
      href: getUrlForGroup(group.slug.current, year, semester)
    }))
  ];
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
