import React from "react";
import { getUniqueGroups, GroupConstellationQuery } from '../../lib/api/group-constellations';
import Container from '../container';
import { getGroupConstellations } from '../../lib/api/group';

interface Props {
  constellations: Array<GroupConstellationQuery>
}

export default function GroupConstellations({ constellations }: Props) {
  const groups = getUniqueGroups(constellations);
  return (
    <Container>
      {groups.map((group) => (
        <section key={group.slug.current}>
          <h2>{group.name}</h2>
          <ul>
            {getGroupConstellations(group, constellations).map((constellation) => (
              <li key={`${group.slug.current}-${constellation.year}-${constellation.semester}`}>
                <h3>{constellation.group.name} {constellation.semester} {constellation.year.substring(0, 4)}</h3>
                <ul>
                  {constellation.names.map((name, index) => (
                    <li key={`${group.slug.current}-${constellation.year}-${constellation.semester}-${name}`}>{name} ({constellation.titles[index] || "Medlem"})</li>
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
