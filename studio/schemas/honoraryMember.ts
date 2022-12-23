import { BsFillAwardFill } from "react-icons/bs";

export default {
  name: "honoraryMember",
  title: "Æresmedlem",
  type: "document",
  icon: BsFillAwardFill,
  fields: [
    {
      name: "person",
      title: "Person",
      description: "Nødvendig",
      type: "reference",
      to: [{ type: "person" }],
    },
    {
      name: "date",
      title: "Dato",
      type: "date",
    },
    {
      name: "note",
      title: "Notat",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "person.name",
      subtitle: "date",
    },
  },
};
