import { highlight } from 'instantsearch.js/es/helpers';
import { HitAttributeHighlightResult } from 'instantsearch.js/es/types/results';

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
