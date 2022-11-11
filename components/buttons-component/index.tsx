import React from "react";
import { ComponentProps } from "../page-components";
import { buttonsStyle } from "./styles.css";
import ArrowButton from "../arrow-button";

interface Props extends Sanity.Schema.ButtonsComponent, ComponentProps {
}

export default function ButtonsComponent({ buttons, componentIndex, page }: Props) {
  return (
    <div className={buttonsStyle}>
      {buttons.map((button, index) => (
        <ArrowButton
          {...button}
          componentIndex={componentIndex}
          page={page}
          key={`buttons-${componentIndex}-${index}`}
        />
      ))}
    </div>
  );
}
