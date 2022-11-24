export function getIdForGroup(slug: string, year: string, semester: string): string {
  return `${slug}-${year}-${semester}`;
}

export function getUrlForGroup(slug: string, year: string, semester: string): string {
  return `/group/#${getIdForGroup(slug, year, semester)}`
}
