import algoliasearch from 'algoliasearch'
import { SanityDocumentStub } from '@sanity/client'
import indexer from 'sanity-algolia'
import { SearchClient } from 'algoliasearch/dist/algoliasearch';

export const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID;
export const index = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
export const apiKey = process.env.ALGOLIA_ADMIN_API_KEY;
export const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY;

export type SearchQuery = {
  _id: string;
  title: string,
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
      page: {
        index: algoliaIndex,
        projection: `{
          title,
        }`,
      },
    },
    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        // case 'post':
        //   return Object.assign({}, document, {
        //     custom: 'An additional custom field for posts, perhaps?',
        //   })
        // case 'article':
        //   return {
        //     title: document.heading,
        //     body: document.body,
        //     authorNames: document.authorNames,
        //   }
        default:
          return document
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
