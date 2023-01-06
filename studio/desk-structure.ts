import { FiSettings } from "react-icons/fi";
import { StructureBuilder } from 'sanity/desk';

export default (S: StructureBuilder) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Innstillinger")
        .icon(FiSettings)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId())
      ),
    ]);
