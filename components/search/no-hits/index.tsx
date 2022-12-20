import React, { HTMLAttributes } from "react";

interface SearchNoHitsProps extends HTMLAttributes<HTMLDivElement> {}

export default function SearchNoHits(props: SearchNoHitsProps) {
  return <div {...props}>No hits</div>
}
