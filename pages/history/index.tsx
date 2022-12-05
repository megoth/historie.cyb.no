import React from "react";
import Layout from "../../components/layout";
import {
  EventForListQuery,
  getAllEventsForHistoryPage,
} from "../../lib/api/history";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getPage, PageQuery } from "../../lib/api/pages";
import Events from '../../components/events';

interface Props extends SiteSettingsPage {
  allEvents?: Array<EventForListQuery>;
  page?: PageQuery;
}

export default function AllPeoplePage({
  allEvents,
  siteSettings,
  page,
}: Props) {
  return (
    <Layout pageTitle={page?.title} siteSettings={siteSettings}>
      <Events events={allEvents} />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [allEvents, siteSettings, page] = await Promise.all([
    getAllEventsForHistoryPage(preview),
    getSiteSettings(preview),
    getPage("tidslinje", preview),
  ]);
  return {
    props: { allEvents, siteSettings, page },
    revalidate: 1,
  };
}
