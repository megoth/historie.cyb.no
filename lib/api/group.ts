import { GroupConstellationQuery } from './group-constellations';

export interface GroupQuery extends Sanity.Schema.Group {

}

export function getGroupConstellations(groupToFilter: GroupQuery, constellations: Array<GroupConstellationQuery>): Array<GroupConstellationQuery> {
  function getSortValue({ year, semester }: GroupConstellationQuery): number {
    return (parseInt(year.substring(0, 4), 10) * 10) + (semester === "vår" ? 0 : 5);
  }

  return constellations
    .filter((constellation) => constellation.group.name === groupToFilter.name)
    .sort((a, b) => getSortValue(b) - getSortValue(a));
}
