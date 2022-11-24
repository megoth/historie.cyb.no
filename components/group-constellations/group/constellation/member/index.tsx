import React, { Fragment, ReactNode } from 'react';
import { GroupConstellationQuery } from '../../../../../lib/api/group-constellations';
import { nameStyle } from './styles.css';

export default function Member({ group, constellation, name, index}) {
  const note = constellation.notes[index];
  return (
    <li key={`${group.slug.current}-${constellation.year}-${constellation.semester}-${name}`}>
      {getTitle(constellation, index)}
      <span className={nameStyle}>{name}</span>
      {note && <span> ({note})</span>}
    </li>
  )
}

function getTitle(constellation: GroupConstellationQuery, index: number): ReactNode {
  const currentTitle = constellation.titles[index] || "Medlem";
  const previousTitle = constellation.titles[index - 1] || "Medlem";
  return index === 0 || currentTitle !== previousTitle ?
    <strong>{currentTitle}: </strong> :
    <Fragment/>;
}
