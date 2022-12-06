import { ComponentTypes } from './page';

export default {
  name: ComponentTypes.SUBPAGES,
  title: "Undersider",
  type: "object",
  fields: [
    {
      name: "sortReverse",
      title: "Sorter motsatt",
      type: "boolean",
    },
  ],
  initialValue: {
    sortReverse: false,
  },
  preview: {
    prepare() {
      return {
        title: "Liste med undersider",
      };
    },
  },
};
