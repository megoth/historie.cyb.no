import Link from '../link';
import { BsDownload } from 'react-icons/bs';
import React from 'react';
import { buttonInnerStyle, buttonStyle } from './styles.css';
import { LinkProps } from "next/dist/client/link";
import clsx from 'clsx';

interface DownloadButtonProps extends LinkProps {
  className?: string;
  href: string;
  postFix?: string;
}

export default function DownloadButton({ className, href, postFix, ...props }: DownloadButtonProps) {
  return (
    <Link {...props} href={href} className={clsx(buttonStyle, className)}>
      <span className={buttonInnerStyle}>
        <BsDownload/>
        <span>Last ned{postFix && ` ${postFix}`}</span>
      </span>
    </Link>
  );
}
