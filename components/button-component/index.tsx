import React from "react";
import { ComponentProps } from "../page-components";
import ArrowButton from "../arrow-button";
import { buttonComponentStyle } from "./styles.css";

interface ButtonProps extends ComponentProps {
  component: Sanity.Schema.ButtonComponent;
  className?: string;
}

export default function ButtonComponent({ className, component, ...props }: ButtonProps) {
  return (
    <div className={buttonComponentStyle}>
      <ArrowButton className={className} {...component} {...props} />
    </div>
  );
}
