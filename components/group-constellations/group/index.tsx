import React from 'react';
import { listStyle } from '../styles.css';
import { getGroupConstellations, GroupQuery } from '../../../lib/api/group';
import { GroupConstellationQuery } from '../../../lib/api/group-constellations';
import Constellation from './constellation';

interface GroupConstellationGroupProps {
  group: GroupQuery
  constellations: Array<GroupConstellationQuery>
}

export default function Group({ group, constellations }: GroupConstellationGroupProps) {
  return (
    <section key={group.slug.current}>
      <h2>{group.name}</h2>
      <ul className={listStyle}>
        {getGroupConstellations(group, constellations).map((constellation) => (
          <Constellation group={group} constellation={constellation} />
        ))}
      </ul>
    </section>
  )
}
