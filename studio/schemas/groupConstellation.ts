import { RiTeamLine } from "react-icons/ri";

export const semesters = {
  SPRING: "vår",
  AUTUMN: "høst",
} as const;

export default {
  name: "groupConstellation",
  title: "Gruppesammensetning",
  type: "document",
  icon: RiTeamLine,
  fields: [
    {
      name: "group",
      title: "Gruppe",
      description: "Nødvendig",
      type: "reference",
      to: [{ type: "group" }],
    },
    {
      name: "year",
      title: "År",
      description: "Nødvendig",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    },
    {
      name: "semester",
      title: "Semester",
      description: "Nødvendig",
      type: "string",
      layout: "radio",
      options: {
        list: Object.values(semesters),
      },
    },
    {
      name: "members",
      title: "Medlemmer",
      type: "array",
      of: [{ type: "membership" }],
    },
  ],
  preview: {
    select: {
      title: "group.name",
      year: "year",
      semester: "semester",
    },
    prepare({ title, year, semester }) {
      return {
        title,
        subtitle: `${year.substr(0, 4)} (${semester})`
      };
    },
  },
};
