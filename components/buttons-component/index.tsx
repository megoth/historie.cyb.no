import React from "react";
import { ComponentProps } from "../page-components";
import { buttonsStyle } from "./styles.css";
import ArrowButton from "../arrow-button";

interface Props extends ComponentProps {
  component: Sanity.Schema.ButtonsComponent
}

export default function ButtonsComponent({ component, componentIndex }: Props) {
  return (
    <div className={buttonsStyle}>
      {component.buttons.map((button, index) => (
        <ArrowButton
          {...button}
          componentIndex={componentIndex}
          key={`buttons-${componentIndex}-${index}`}
        />
      ))}
    </div>
  );
}
