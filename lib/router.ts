import { NextRouter } from 'next/router';
import { getArrayFromRouterQuery, getPathFromRouter } from './utils';

interface Route {
  hash?: string;
  query: Record<string, string[]>;
}

export function getHashFromRouter(router: NextRouter): string | null {
  const hashIndex = router.asPath.indexOf("#");
  return hashIndex === -1 ? null : router.asPath.substring(hashIndex + 1);
}

export function getHref(router: NextRouter, route?: Route) {
  const path = getPathFromRouter(router);
  if (!route) {
    return path;
  }
  // handling query
  const query = {
    ...Object.entries(router?.query || {}).reduce((memo, [key, value]) => {
      memo[key] = getArrayFromRouterQuery(value);
      return memo;
    }, {}),
    ...route.query,
    slug: null,
  };
  const queryValues = Object.entries(query).flatMap(
    ([_, value]) => value || []
  );
  const queryString =
    queryValues.length > 0
      ? `?${(Object.entries(query) as Array<[string, string[]]>)
        .flatMap(([key, values]) => values?.map((value) => `${key}=${value}`))
        .filter((q) => !!q)
        .join("&")}`
      : "";
  // handling hash
  const hash = route.hash ?? getHashFromRouter(router);
  const hashString = !!hash ? `#${hash}` : "";
  // putting it all together
  return path + queryString + hashString;
}

export function getSingleValueFromQuery(str: string | string[]): string {
  return Array.isArray(str) ? str[0] : str;
}
