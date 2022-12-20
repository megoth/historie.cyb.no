import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { debounce } from '../../../lib/utils';
import { useSearchBox } from 'react-instantsearch-hooks-web';

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const { clear, refine } = useSearchBox();
  const searchBox = useRef<HTMLInputElement>();

  useEffect(() => {
    if (query) {
      return refine(query);
    }
    clear();
  }, [query]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(searchBox.current.value);
  }

  const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value));

  return <form onSubmit={onSubmit}>
    <input onChange={onChange} ref={searchBox}/>
    <button type={"submit"}>Søk</button>
  </form>
}
