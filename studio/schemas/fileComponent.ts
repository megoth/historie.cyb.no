import { ComponentTypes } from './page';

export default {
  name: ComponentTypes.FILE,
  title: "Fil",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Filnavn",
      type: "string",
    },
    {
      name: "file",
      title: "Fil",
      type: "file",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "file.name",
    },
    // prepare({ title }) {
    //   return {
    //     title,
    //     subtitle: `Fil`,
    //   };
    // },
  },
};
