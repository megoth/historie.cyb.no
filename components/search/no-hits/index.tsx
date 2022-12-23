import React, { HTMLAttributes } from "react";
import { translations } from '../../../lib/translations';

interface SearchNoHitsProps extends HTMLAttributes<HTMLDivElement> {}

export default function SearchNoHits(props: SearchNoHitsProps) {
  return <div {...props}>{translations.NO_HITS}</div>
}
