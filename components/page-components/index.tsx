import React from "react";
import { FileComponentQuery, PageQuery } from "../../lib/api/pages";
import TextComponent from "../text-component";
import ButtonComponent from "../button-component";
import ButtonsComponent from "../buttons-component";
import DataComponent from "../data-component";
import { DataModules } from "../../lib/api/data-modules";
import Container from "../container";
import { ComponentTypes } from '../../studio/schemas/page';
import SubpagesComponent from '../subpages';
import PhotoComponent from '../photo-component';
import FileComponent from '../file-component';

interface Props extends DataModules {
  page?: Partial<PageQuery>;
}

export interface ComponentProps {
  componentIndex: number;
}

export default function PageComponents({ page, ...data }: Props) {
  if (!page) {
    return <div>Unable to load page (is the page available in Sanity?)</div>;
  }
  return (
    <>
      {page.components?.map((component, index) => {
        const key = `page-component-${index}-${component._type}`;
        switch (component._type) {
          case ComponentTypes.BUTTON:
            return (
              <Container key={key}>
                <ButtonComponent
                  component={component as Sanity.Schema.ButtonComponent}
                  componentIndex={index}/>
              </Container>
            );
          case ComponentTypes.BUTTONS:
            return (
              <Container key={key}>
                <ButtonsComponent
                  component={component as Sanity.Schema.ButtonsComponent}
                  componentIndex={index}/>
              </Container>
            );
          case ComponentTypes.DATA:
            return (
              <DataComponent
                {...data}
                component={component as Sanity.Schema.DataComponent}
                componentIndex={index}
                key={key}
                page={page}/>
            );
          case ComponentTypes.FILE:
            return (
              <FileComponent
                component={component as unknown as FileComponentQuery}
                componentIndex={index}
                key={key}/>
            );
          case ComponentTypes.IMAGE:
            return (
              <PhotoComponent
                component={component as Sanity.Schema.ImageComponent}
                componentIndex={index}
                key={key}/>
            );
          case ComponentTypes.SUBPAGES:
            return (
              <Container key={key}>
                <SubpagesComponent
                  component={component as Sanity.Schema.SubpagesComponent}
                  componentIndex={index}
                  page={page}
                  subpages={data.subpages}
                />
              </Container>
            );
          case ComponentTypes.TEXT:
            return (
              <Container key={key}>
                <TextComponent
                  component={component as Sanity.Schema.TextComponent}
                  componentIndex={index}
                />
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
