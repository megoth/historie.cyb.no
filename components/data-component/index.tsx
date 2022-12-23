import React from "react";
import { ComponentProps } from "../page-components";
import Events from "../events";
import { DataModules } from "../../lib/api/data-modules";
import Albums from "../albums";
import PageUpdates from "../page-updates";
import Subpages from '../subpages';
import { PageQuery } from '../../lib/api/pages';

const dataComponents: { [KEY in keyof DataModules]: Function } = {
  albums: Albums,
  events: Events,
  pageUpdates: PageUpdates,
  subpages: Subpages
};

interface Props extends ComponentProps {
  component: Sanity.Schema.DataComponent
  page: Partial<PageQuery>;
}

export default function DataComponent({
                                        component,
                                        componentIndex,
                                        ...props
                                      }: Props) {
  const Component = dataComponents[component.type];
  if (!Component) {
    return <div>Incorrect component type: {component.type}</div>;
  }
  if (Component && !props) {
    return (
      <div>
        Missing data for module ({component.type}): Are you sure you wired up the page
        properly?
      </div>
    );
  }
  return <Component {...component} />;
}
