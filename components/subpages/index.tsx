import React from "react";
import { ComponentProps } from "../page-components";
import { PageQuery, SubpageQuery } from '../../lib/api/pages';
import { subpagesListStyle } from './styles.css';
import Link from '../link';

interface Props extends ComponentProps {
  component: Sanity.Schema.SubpagesComponent
  subpages: Array<SubpageQuery>;
  page: Partial<PageQuery>;
}

export default function Subpages({ page, subpages }: Props) {
  if (subpages.length === 0) return null;
  return (
    <ul className={subpagesListStyle}>
      {sortSubpages(subpages).map(({ slug, title }) => (
        <li key={slug}>
          <Link href={`/${page.slug}/${slug}`}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function sortSubpages(subpages: Array<SubpageQuery>): Array<SubpageQuery> {
  return subpages.sort((a, b) => (a.order || new Date(b.date).getTime()) - (b.order || new Date(a.date).getTime()));
}
