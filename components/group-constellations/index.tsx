import React from "react";
import { getUniqueGroups, GroupConstellationQuery } from '../../lib/api/group-constellations';
import Container from '../container';
import Group from './group';
import Link from '../link';
import { groupNavStyle } from './styles.css';

interface Props {
  constellations: Array<GroupConstellationQuery>
}

export default function GroupConstellations({ constellations }: Props) {
  const groups = getUniqueGroups(constellations);
  return (
    <Container>
      {groups.length > 1 && (
        <div className={groupNavStyle}>
          <span>Hopp til: </span>
          {groups.slice(1).map((group) => (
            <Link href={`/group#${group.slug.current}`}>{group.name}</Link>
          ))}
        </div>
      )}
      {groups.map((group) => (
        <section key={group.slug.current}>
          <Group group={group} constellations={constellations} />
        </section>
      ))}
    </Container>
  );
}
