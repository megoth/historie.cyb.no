import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { debounce } from '../../../lib/utils';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import { useRouter } from 'next/router';
import { getSingleValueFromQuery } from '../../../lib/router';

export default function SearchInput() {
  const router = useRouter();
  const userQuery = getSingleValueFromQuery(router.query.query) || "";
  const [query, setQuery] = useState(userQuery);
  const { clear, refine } = useSearchBox();
  const searchBox = useRef<HTMLInputElement>();

  useEffect(() => {
    if (query || userQuery) {
      return refine(query || userQuery);
    }
    clear();
  }, [query, userQuery]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(searchBox.current.value);
    router.push({ query: { query: searchBox.current.value } });
  }

  const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    router.push({ query: { query: searchBox.current.value } });
  });

  return <form method={"GET"} onSubmit={onSubmit}>
    <input name={"query"} onChange={onChange} ref={searchBox} defaultValue={userQuery} autoFocus/>
    <button type={"submit"}>Søk</button>
  </form>
}
