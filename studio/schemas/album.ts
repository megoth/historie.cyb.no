import { BiPhotoAlbum } from "react-icons/bi";

export default {
  name: "album",
  title: "Album",
  type: "document",
  icon: BiPhotoAlbum,
  fields: [
    {
      name: "name",
      title: "Navn",
      description: "Nødvendig",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      description: "Nødvendig",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "date",
      title: "Dato",
      description: "Nødvendig (for sortering)",
      type: "date",
    },
    {
      name: "images",
      title: "Bilder",
      description: "Øverste bildet vil bli thumbnail for album",
      type: "array",
      of: [{ type: "photo" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
      media: "images[0].image",
    },
  },
};
