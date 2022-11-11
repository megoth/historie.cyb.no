import { ComponentTypes } from './page';

export default {
  name: ComponentTypes.SUBPAGES,
  title: "Undersider",
  type: "object",
  fields: [
    {
      name: "variant",
      title: "Type liste",
      type: "string",
      options: {
        list: ["default"],
      },
    },
  ],
  initialValue: {
    variant: "default",
  },
  preview: {
    prepare() {
      return {
        title: "Liste med undersider",
      };
    },
  },
};
