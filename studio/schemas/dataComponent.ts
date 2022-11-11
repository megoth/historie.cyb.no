import { dataModules } from "../../lib/api/dataModules";
import { ComponentTypes } from './page';

export default {
  name: ComponentTypes.DATA,
  title: "Data modul",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      description: "Data må lenkes opp mot siden via kode",
      type: "string",
      layout: "dropdown",
      options: {
        list: dataModules,
      },
    },
  ],
  preview: {
    select: {
      title: "type",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: `Data modul`,
      };
    },
  },
};
