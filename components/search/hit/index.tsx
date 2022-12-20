import React from "react";
import { Highlight } from 'react-instantsearch-hooks-web';
import { SearchQuery } from '../../../lib/algolia';
import { Hit } from 'instantsearch.js';

interface SearchHitProps {
  hit: Hit<SearchQuery>
}

export default function SearchHit({ hit }: SearchHitProps) {
  return (
    <div>
      <Highlight hit={hit} attribute="title" />
    </div>
  );
}
