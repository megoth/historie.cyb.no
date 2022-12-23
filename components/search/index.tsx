import React, { useEffect, useState } from 'react';
import SearchHit from './hit';
import { hitsContainerStyle, hitsStyle } from './styles.css';
import { Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import SearchInput from './input';
import SearchNoHits from './no-hits';
import Container from '../container';

export default function Search() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const { results } = useInstantSearch();
  useEffect(() => setDialogVisible(results.query?.length > 0), [results.query]);

  return (
    <Container>
      <SearchInput />
      {dialogVisible && (
        <div className={hitsContainerStyle}>
          {results.hits.length > 0 && <Hits hitComponent={SearchHit}/>}
          {results.hits.length === 0 && <SearchNoHits className={hitsStyle}/>}
        </div>
      )}
    </Container>
  )
}
