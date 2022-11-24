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
    <>
      <h3 id={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
        {capitalizeFirst(constellation.semester)} {constellation.year.substring(0, 4)}
      </h3>
      {constellation.names?.length > 0 && (
        <ul>
          {constellation.names.map((name, index) => (
            <li key={`${group.slug.current}-${constellation.year}-${constellation.semester}-${name}`}>
              <Member group={group} constellation={constellation} name={name} index={index} />
            </li>
          ))}
        </ul>
      )}
      {!constellation.names && (
        <div>(finner ikke styrets sammensetn.)</div>
      )}
    </>
  )
}
