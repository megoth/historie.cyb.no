import React from "react";
import { ComponentProps } from "../page-components";
import { SubpageQuery } from '../../lib/api/pages';
import { subpagesListStyle } from './styles.css';
import Link from '../link';

interface Props extends ComponentProps {
  subpages: Array<SubpageQuery>
}

export default function SubpagesComponent({ page, subpages }: Props) {
  if (subpages.length === 0) return null;
  return (
    <ul className={subpagesListStyle}>
      {subpages.map(({ slug, title }) => <li>
        <Link href={`/${page.slug}/${slug}`}>
          {title}
        </Link>
      </li>)}
    </ul>
  );
}
