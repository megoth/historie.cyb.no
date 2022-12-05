
export default {
  name: "parentPage",
  title: "Foreldreside",
  type: "object",
  fields: [
    {
      name: "page",
      title: "Side",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      name: "orderNo",
      title: "Rekkefølge indeks",
      description: "Hvilken rekkefølge skal siden ha? (0 og oppover)",
      type: "number",
    },
    {
      name: "date",
      title: "Rekkefølge dato",
      description: "Alternativt kan du bruke dato for rekkefølge",
      type: "date",
    },
  ],
  preview: {
    select: {
      title: "parentPage->title",
      subtitle: "orderNo",
    },
  },
};
