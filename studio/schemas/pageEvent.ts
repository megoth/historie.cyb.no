import { BsClock } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default {
  name: "pageEvent",
  title: "Hendelse",
  type: "object",
  icon: BsClock,
  fields: [
    {
      name: "name",
      title: "Navn",
      description: "Teksten som vil vises i tidslinjen",
      type: "string",
    },
    {
      name: "date",
      title: "Dato",
      description: "Nødvendig om teksten skal vises i tidslinjen.",
      type: "date",
    },
    {
      name: "major",
      title: "Stor hendelse",
      type: "boolean",
      initialValue: false,
    },
  ],
};
