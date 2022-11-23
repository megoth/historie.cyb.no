import { RiImageLine } from "react-icons/ri";

export default {
  name: "photo",
  title: "Bilde",
  type: "object",
  icon: RiImageLine,
  fields: [
    {
      name: "image",
      title: "Bilde",
      description: "Nødvendig",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      title: "Kort beskrivelse",
      description: "Nødvendig",
      type: "string",
    },
    {
      name: "description",
      title: "Lang beskrivelse",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
};
