import React, { Fragment, ReactNode } from "react";
import { getUniqueGroups, GroupConstellationQuery } from '../../lib/api/group-constellations';
import Container from '../container';
import { getGroupConstellations } from '../../lib/api/group';
import { listStyle, nameStyle } from './styles.css';
import { capitalizeFirst } from '../../lib/strings';
import { getIdForGroup } from '../../lib/urls';

interface Props {
  constellations: Array<GroupConstellationQuery>
}

function getTitle(constellation: GroupConstellationQuery, index: number): ReactNode {
  const currentTitle = constellation.titles[index] || "Medlem";
  const previousTitle = constellation.titles[index - 1] || "Medlem";
  return index === 0 || currentTitle !== previousTitle ?
    <strong>{currentTitle}: </strong> :
    <Fragment/>;
}

export default function GroupConstellations({ constellations }: Props) {
  const groups = getUniqueGroups(constellations);
  return (
    <Container>
      {groups.map((group) => (
        <section key={group.slug.current}>
          <h2>{group.name}</h2>
          <ul className={listStyle}>
            {getGroupConstellations(group, constellations).map((constellation) => (
              <li key={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
                <h3 id={getIdForGroup(group.slug.current, constellation.year, constellation.semester)}>
                  {capitalizeFirst(constellation.semester)} {constellation.year.substring(0, 4)}
                </h3>
                <ul>
                  {constellation.names.map((name, index) => (
                    <li key={`${group.slug.current}-${constellation.year}-${constellation.semester}-${name}`}>
                      {getTitle(constellation, index)}
                      <span className={nameStyle}>{name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
