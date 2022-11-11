import React from "react";
import { PageQuery } from "../../lib/api/pages";
import TextComponent from "../text-component";
import ButtonComponent from "../button-component";
import ButtonsComponent from "../buttons-component";
import DataComponent from "../data-component";
import { DataModules } from "../../lib/api/dataModules";
import Container from "../container";
import { ComponentTypes } from '../../studio/schemas/page';
import SubpagesComponent from '../subpages-component';

interface Props extends DataModules {
  page?: Partial<PageQuery>;
}

export interface ComponentProps {
  componentIndex: number;
  page: Partial<PageQuery>;
}

export default function PageComponents({ page, ...data }: Props) {
  if (!page) {
    return <div>Unable to load page (is the page available in Sanity?)</div>;
  }
  return (
    <>
      {page.components?.map((component, index) => {
        const key = `page-component-${index}-${component._type}`;
        const props = { ...component, ...data, page, componentIndex: index };
        switch (component._type) {
          case ComponentTypes.BUTTON:
            return (
              <Container key={key}>
                <ButtonComponent {...props} />
              </Container>
            );
          case ComponentTypes.BUTTONS:
            return (
              <Container key={key}>
                <ButtonsComponent {...props} />
              </Container>
            );
          case ComponentTypes.DATA:
            return (
              <DataComponent {...props} key={key} />
            );
          case ComponentTypes.TEXT:
            return (
              <Container key={key}>
                <TextComponent {...props} />
              </Container>
            );
          case ComponentTypes.SUBPAGES:
            return (
              <Container key={key}>
                <SubpagesComponent {...props} />
              </Container>
            );
          default:
            return (
              <div key={key}>
                <div>Unknown component</div>
                <pre>{JSON.stringify(component)}</pre>
              </div>
            );
        }
      })}
    </>
  );
}
