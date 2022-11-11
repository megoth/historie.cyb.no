import React from "react";
import { ComponentProps } from "../page-components";
import { textComponentStyle } from "./styles.css";
import cn from "classnames";
import TextBlock from "../text-block";

interface Props extends ComponentProps {
  component: Sanity.Schema.TextComponent;
}

export default function TextComponent({ component }: Props) {
  return <TextBlock text={component.text} className={cn(textComponentStyle, component.variant)} />;
}
