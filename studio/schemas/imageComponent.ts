import { ComponentTypes } from './page';

export default {
  name: ComponentTypes.IMAGE,
  title: "Bilde",
  type: "object",
  fields: [
    {
      name: "photo",
      title: "Bilde",
      type: "photo",
    },
  ],
  preview: {
    select: {
      title: "photo.alt",
      media: "photo.image",
    },
  },
};
