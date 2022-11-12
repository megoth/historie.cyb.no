import { RiUserLine } from "react-icons/ri";

export default {
  name: "person",
  title: "Person",
  type: "document",
  icon: RiUserLine,
  fields: [
    {
      name: "name",
      title: "Navn",
      description: "Nødvendig",
      type: "string",
    },
    {
      name: "slug",
      title: "Brukernavn",
      type: "slug",
    },
    {
      name: "profile",
      title: "Profil",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current"
    },
  },
};
