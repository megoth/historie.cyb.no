import { GroupConstellationQuery } from './group-constellations';
import { semesters } from '../../studio/schemas/groupConstellation';

export interface GroupQuery extends Sanity.Schema.Group {
  // empty for now, but might add more later
}

export function getGroupConstellations(groupToFilter: GroupQuery, constellations: Array<GroupConstellationQuery>): Array<GroupConstellationQuery> {
  return constellations
    .filter((constellation) => constellation.group.name === groupToFilter.name)
    .sort((a, b) => getSortValue(b) - getSortValue(a));

  function getSortValue({ year, semester }: GroupConstellationQuery): number {
    return (parseInt(year.substring(0, 4), 10) * 10) + (semester === semesters.SPRING ? 0 : 5);
  }
}
