import React from "react";
import Layout from "../../components/layout";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getPage, PageQuery } from "../../lib/api/pages";
import { pageSlugs } from '../../lib/pages';
import Search from '../../components/search';
import { getClient, index, searchKey } from '../../lib/algolia';
import { InstantSearch } from 'react-instantsearch-hooks-web';

interface SearchPageProps extends SiteSettingsPage {
  page?: PageQuery;
}

export default function SearchPage({ siteSettings, page }: SearchPageProps) {
  const searchClient = getClient(searchKey);
  return (
    <Layout pageTitle={page?.title} siteSettings={siteSettings}>
      <InstantSearch indexName={index} searchClient={searchClient}>
        <Search/>
      </InstantSearch>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [siteSettings, page] = await Promise.all([
    getSiteSettings(preview),
    getPage(pageSlugs.SEARCH, preview),
  ]);
  return {
    props: { siteSettings, page },
    revalidate: 1,
  };
}
