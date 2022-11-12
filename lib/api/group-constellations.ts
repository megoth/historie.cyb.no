import { getClient } from '../sanity';
import { GroupQuery } from './group';
import { createUniqueArray } from '../utils';

export interface GroupConstellationQuery extends Omit<Sanity.Schema.GroupConstellation, "group" | "members"> {
  group: GroupQuery;
  names: Array<string>;
  titles: Array<string>;
}

export function getAllGroupConstellations(preview: boolean): Promise<Array<GroupConstellationQuery>> {
  return getClient(preview)
    .fetch(`*[ _type == "groupConstellation" ] | order(year desc, semester desc){
    group->,
    year,
    semester,
    'names':members[].person->name,
    'titles':members[].title,
  }`);
}

export function getUniqueGroups(constellations: Array<GroupConstellationQuery>): Array<GroupQuery> {
  const groups = constellations
    .map(({ group }) => group)
    .sort((a, b) => a.order - b.order);
  return createUniqueArray(groups, "name");
}
