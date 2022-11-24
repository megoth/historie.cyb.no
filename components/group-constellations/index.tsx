import React from "react";
import { getUniqueGroups, GroupConstellationQuery } from '../../lib/api/group-constellations';
import Container from '../container';
import Group from './group';

interface Props {
  constellations: Array<GroupConstellationQuery>
}

export default function GroupConstellations({ constellations }: Props) {
  const groups = getUniqueGroups(constellations);
  return (
    <Container>
      {groups.map((group) => (
        <Group group={group} constellations={constellations} />
      ))}
    </Container>
  );
}
