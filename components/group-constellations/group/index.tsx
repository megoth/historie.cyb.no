import React from 'react';
import { listStyle } from '../styles.css';
import { getGroupConstellations, GroupQuery } from '../../../lib/api/group';
import { GroupConstellationQuery } from '../../../lib/api/group-constellations';
import Constellation from './constellation';
import { getIdForGroup } from '../../../lib/urls';

interface GroupConstellationGroupProps {
  group: GroupQuery
  constellations: Array<GroupConstellationQuery>
}

export default function Group({ group, constellations }: GroupConstellationGroupProps) {
  return (
    <>
      <h2 id={group.slug.current}>{group.name}</h2>
      <ul className={listStyle}>
        {getGroupConstellations(group, constellations).map((constellation) => (
          <li key={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
            <Constellation group={group} constellation={constellation} />
          </li>
        ))}
      </ul>
    </>
  )
}
