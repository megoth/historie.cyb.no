import React, { useRef } from "react";
import Link from "../link";
import { headerChildStyle, headerStyle, } from "./styles.css";
import cn from "classnames";
import Logo from "../logo";
import Container from "../container";
import HeaderMenu from './menu';
import HeaderSearch from './search';

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container ref={ref}>
      <header className={cn(headerStyle, className)}>
        <Link href={"/"} className={headerChildStyle}>
          <Logo />
        </Link>
        <HeaderSearch className={headerChildStyle} />
        <HeaderMenu containerRef={ref} className={headerChildStyle} />
      </header>
    </Container>
  );
}
