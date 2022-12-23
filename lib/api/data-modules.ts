import { EventForListQuery } from "./history";
import { AlbumQuery } from "./gallery";
import { PageUpdateQuery } from "./page-updates";
import { SubpageQuery } from './pages';

// IMPORTANT!!!
// Make sure that dataModules and DataModules contains the same keys
// Also update /components/data-component.tsx

export const dataModules = [
  "albums",
  "events",
  "pageUpdates",
  "subpages"
];

export interface DataModules {
  albums?: Array<AlbumQuery>;
  events?: Array<EventForListQuery>;
  pageUpdates?: Array<PageUpdateQuery>;
  subpages?: Array<SubpageQuery>;
}
