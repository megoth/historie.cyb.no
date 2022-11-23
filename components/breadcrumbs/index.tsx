import { RiArrowDropRightLine } from 'react-icons/ri';
import Container from '../container';
import Link from '../link';
import { caretInnerStyle, caretStyle, linkStyle, listItemStyle, listStyle } from './styles.css';

export type Breadcrumb = {
  href: string;
  text: string;
}

interface BreadcrumbsProps {
  crumbs: Array<Breadcrumb>
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return <ul className={listStyle}>
    {crumbs.map(({ href, text }) => (
      <li key={href} className={listItemStyle}>
        <span className={caretStyle}>
          <RiArrowDropRightLine className={caretInnerStyle}/>
        </span>
        <Link href={href} className={linkStyle}>{text}</Link>
      </li>
    ))}
  </ul>
}
