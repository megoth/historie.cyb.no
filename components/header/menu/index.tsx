import React, { MutableRefObject, useContext, useEffect } from 'react';
import { headerHeight } from '../styles.css';
import HeaderMenuButton from './button';
import NavigationContext from '../../../contexts/navigationContext';
import { translations } from '../../../lib/translations';
import { triggerStyle, triggerTextStyle } from './styles.css';
import clsx from 'clsx';

export interface MenuProps {
  containerRef: MutableRefObject<HTMLDivElement>;
  className?: string;
}

export default function HeaderMenu({ containerRef, className }: MenuProps) {
  const { isOpen, setOpen } = useContext(NavigationContext);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.style.position = "fixed";
      containerRef.current.style.top = "0px";
      containerRef.current.style.width = `${containerRef.current.parentElement.clientWidth}px`;
      containerRef.current.parentElement.style.paddingTop = `${headerHeight}px`;
    } else if (containerRef.current) {
      containerRef.current.style.removeProperty("position");
      containerRef.current.style.removeProperty("top");
      containerRef.current.style.removeProperty("width");
      containerRef.current.parentElement.style.removeProperty("padding-top");
    }
  }, [isOpen]);

  return (
    <button
      className={clsx(triggerStyle, className)}
      type="button"
      onClick={() => setOpen(!isOpen)}
      aria-expanded={isOpen}
    >
      <span className={triggerTextStyle}>{translations.MENU}</span>
      <HeaderMenuButton open={isOpen} />
    </button>
  )
}
