import { getIdForGroup } from '../../../../lib/urls';
import { capitalizeFirst } from '../../../../lib/strings';
import React from 'react';
import { GroupQuery } from '../../../../lib/api/group';
import { GroupConstellationQuery } from '../../../../lib/api/group-constellations';
import Member from './member';

interface ConstellationProps {
  group: GroupQuery
  constellation: GroupConstellationQuery
}

export default function Constellation({ group, constellation}: ConstellationProps) {
  return (
    <li key={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
      <h3 id={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
        {capitalizeFirst(constellation.semester)} {constellation.year.substring(0, 4)}
      </h3>
      {constellation.names?.length > 0 && (
        <ul>
          {constellation.names.map((name, index) => (
            <Member group={group} constellation={constellation} name={name} index={index} />
          ))}
        </ul>
      )}
      {!constellation.names && (
        <div>(finner ikke styrets sammensetn.)</div>
      )}
    </li>
  )
}
