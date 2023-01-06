import album from "./album";
import blockContent from "./blockContent";
import buttonComponent from "./buttonComponent";
import buttonsComponent from "./buttonsComponent";
import dataComponent from "./dataComponent";
import event from "./event";
import fileComponent from "./fileComponent";
import group from "./group"
import groupConstellation from "./groupConstellation"
import imageComponent from "./imageComponent";
import link from "./link";
import membership from "./membership"
import navigation from "./navigation";
import navigationItem from "./navigationItem";
import page from "./page";
import pageEvent from "./pageEvent";
import parentPage from "./parentPage";
import person from "./person"
import photo from "./photo";
import siteSettings from "./siteSettings";
import source from "./source";
import subpagesComponent from "./subpagesComponent";
import textComponent from "./textComponent";

export const schemaTypes = [
  // The following are document types which will appear
  // in the studio.
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  blockContent,
  page, // TODO fix preview
  siteSettings,
  pageEvent,
  buttonComponent, // TODO fix preview
  buttonsComponent, // TODO fix preview
  dataComponent, // TODO fix preview
  fileComponent, // TODO fix preview
  imageComponent,
  subpagesComponent,
  textComponent, // TODO fix preview
  link,
  navigationItem,
  navigation, // TODO fix preview
  album,
  photo,
  parentPage,
  group, // TODO fix preview
  groupConstellation, // TODO fix preview
  person,
  membership, // TODO fix preview
  event, // TODO fix preview
  source, // TODO fix preview
];

export default schemaTypes;
