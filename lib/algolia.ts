import algoliasearch, { SearchClient } from 'algoliasearch'
import { SanityDocumentStub } from '@sanity/client'
import indexer from 'sanity-algolia'
import { highlight } from 'instantsearch.js/es/helpers';
import { AlgoliaHit, BaseHit } from 'instantsearch.js';
import { HitAttributeHighlightResult } from 'instantsearch.js/es/types/results';
import { pageSlugs } from './pages';

export const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID;
export const index = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
export const apiKey = process.env.ALGOLIA_ADMIN_API_KEY;
export const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY;

export const DOCUMENT_TYPES = {
  EVENT: "event",
  PAGE: "page",
}

export interface SearchQuery extends Record<string, any> {
  _id: string;
  _type: string;
  title: string;
  href: string;
  body: string;
}

interface EventQuery extends SearchQuery {
  slug: string;
}

function convertEvent(document: EventQuery): SearchQuery {
  return Object.assign({}, document, {
    body: document.body || "",
    href: `/${pageSlugs.HISTORY}/${document.slug}`
  })
}

interface PageQuery extends SearchQuery {
  slug: string;
  parentSlug: string;
}

function convertPage(document: PageQuery): SearchQuery {
  const { slug, parentSlug } = document;
  return Object.assign({}, document, {
    body: document.body || "",
    href: parentSlug ? `/${parentSlug}/${slug}` : `/${slug}`
  })
}

export function focusWord<T extends BaseHit>(hit: AlgoliaHit<T>, attribute: string, padLength: number = 25): string {
  const highlightResultElement = hit._highlightResult[attribute] as HitAttributeHighlightResult;
  const matchedWord = highlightResultElement?.matchedWords[0] || "";
  const value = highlight({ attribute, hit });
  const index = value?.indexOf(matchedWord);
  const markBefore = 40; // length of default mark tag _with_ attributes
  const markAfter = 7; // length of </mark>
  const focusStart = index - markBefore - padLength;
  const start = Math.max(focusStart, 0);
  const focusEnd = index + matchedWord.length + markAfter + padLength;
  const end = Math.min(focusEnd, value?.length);
  const prefix = start > 0 ? "&hellip;" : "";
  const focus = value.substring(start, end);
  const postfix = focusEnd < value.length ? "&hellip;" : "";
  return prefix + focus + postfix;
}

export function getClient(key: string) {
  return algoliasearch(applicationId, key);
}

export function getIndex(algolia: SearchClient) {
  // Configure this to match an existing Algolia index name
  const algoliaIndex = algolia.initIndex(index)

  return indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // _id and other system fields are handled automatically.
    {
      [DOCUMENT_TYPES.PAGE]: {
        index: algoliaIndex,
        projection: `{
          title,
          'slug': slug.current, 
          'parentSlug': parent.page->slug.current,
          'body': pt::text(components[].text)
        }`,
      },
      [DOCUMENT_TYPES.EVENT]: {
        index: algoliaIndex,
        projection: `{
          'title': name,
          'slug': slug.current, 
          'body': pt::text(description)
        }`,
      },
    },
    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case DOCUMENT_TYPES.EVENT: return convertEvent(document as EventQuery);
        case DOCUMENT_TYPES.PAGE: return convertPage(document as PageQuery);
        default: return document
      }
    },
    // Visibility function (optional).
    //
    // The third parameter is an optional visibility function. Returning `true`
    // for a given document here specifies that it should be indexed for search
    // in Algolia. This is handy if for instance a field value on the document
    // decides if it should be indexed or not. This would also be the place to
    // implement any `publishedAt` datetime visibility rules or other custom
    // visibility scheme you may be using.
    // (document: SanityDocumentStub) => {
    //   if (document.hasOwnProperty('isHidden')) {
    //     return !document.isHidden
    //   }
    //   return true
    // }
  )
}
