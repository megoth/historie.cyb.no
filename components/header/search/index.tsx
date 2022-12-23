import { translations } from '../../../lib/translations';
import Link from 'next/link';
import { pageSlugs } from '../../../lib/pages';
import { BiSearch } from 'react-icons/bi';
import { searchStyle } from './styles.css';
import clsx from 'clsx';

interface HeaderSearchProps {
  className?: string;
}

export default function HeaderSearch({ className }: HeaderSearchProps) {
  return (
    <Link href={`/${pageSlugs.SEARCH}`}>
      <a className={clsx(searchStyle, className)}>
        <span>{translations.SEARCH}</span>
        <BiSearch size={"2.3em"} />
      </a>
    </Link>
  )
}
