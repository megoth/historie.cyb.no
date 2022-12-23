// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import source from "./source";
import event from "./event";
import siteSettings from "./siteSettings";
import page from "./page";
import buttonComponent from "./buttonComponent";
import buttonsComponent from "./buttonsComponent";
import imageComponent from "./imageComponent";
import subpagesComponent from "./subpagesComponent";
import textComponent from "./textComponent";
import navigation from "./navigation";
import link from "./link";
import navigationItem from "./navigationItem";
import dataComponent from "./dataComponent";
import album from "./album";
import photo from "./photo";
import parentPage from "./parentPage";
import group from "./group"
import groupConstellation from "./groupConstellation"
import membership from "./membership"
import person from "./person"
import fileComponent from "./fileComponent";
import pageEvent from "./pageEvent";
import honoraryMember from './honoraryMember';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    event,
    source,
    siteSettings,
    page,
    pageEvent,
    buttonComponent,
    buttonsComponent,
    dataComponent,
    fileComponent,
    imageComponent,
    subpagesComponent,
    textComponent,
    link,
    navigationItem,
    navigation,
    album,
    photo,
    parentPage,
    person,
    group,
    membership,
    groupConstellation,
    honoraryMember,
  ]),
});
