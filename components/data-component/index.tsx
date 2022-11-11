import React from "react";
import { ComponentProps } from "../page-components";
import Events from "../events";
import { DataModules } from "../../lib/api/dataModules";
import Albums from "../albums";
import PageUpdates from "../page-updates";

const dataComponents: { [KEY in keyof DataModules]: Function } = {
  albums: Albums,
  events: Events,
  pageUpdates: PageUpdates,
};

interface Props extends Sanity.Schema.DataComponent, ComponentProps {}

export default function DataComponent({
  type,
  componentIndex,
  ...component
}: Props) {
  const Component = dataComponents[type];
  if (!Component) {
    return <div>Incorrect component type: {type}</div>;
  }
  const data = component[type];
  if (Component && !data) {
    return (
      <div>
        Missing data for module ({type}): Are you sure you wired up the page
        properly?
      </div>
    );
  }
  return <Component {...component} />;
}
