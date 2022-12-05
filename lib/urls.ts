import { pageSlugs } from './pages';

export function getIdForGroup(slug: string, year: string, semester: string): string {
  return `${slug}-${year}-${semester}`;
}

export function getUrlForGroup(slug: string, year: string, semester: string): string {
  return `/${pageSlugs.GROUP}/#${getIdForGroup(slug, year, semester)}`
}
