import React  from "react";
import { Highlight } from 'react-instantsearch-hooks-web';
import { focusWord, SearchQuery } from '../../../lib/algolia';
import { AlgoliaHit, Hit } from 'instantsearch.js';
import SanitizeHTML from '../../sanitize-html';
import { hitStyle, titleStyle } from './styles.css';
import Link from 'next/link';

interface SearchHitProps {
  hit: AlgoliaHit<SearchQuery>
}

export default function SearchHit({ hit }: SearchHitProps) {
  const bodyHighlight = focusWord(hit, "body", 100);
  return (
    <Link href={hit.href}>
      <a className={hitStyle}>
        <div className={titleStyle}>
          <Highlight hit={hit as Hit<SearchQuery>} attribute="title"/>
        </div>
        <div><SanitizeHTML html={bodyHighlight}/></div>
      </a>
    </Link>
  );
}
