import { RiGroupLine } from "react-icons/ri";

export default {
  name: "group",
  title: "Gruppe",
  type: "document",
  icon: RiGroupLine,
  fields: [
    {
      name: "name",
      title: "Navn",
      description: "Nødvendig",
      type: "string",
    },
    {
      name: "order",
      title: "Rekkefølge",
      description: "Nødvendig (0 og oppover)",
      type: "number",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      slug: "slug.current",
      order: "order"
    },
    // prepare({ title, slug, order }) {
    //   return {
    //     title,
    //     subtitle: `${slug} (${order})`
    //   };
    // },
  },
};
