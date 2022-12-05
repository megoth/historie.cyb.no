import React from "react";
import Layout from "../../components/layout";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getPage, PageQuery } from "../../lib/api/pages";
import GroupConstellations from '../../components/group-constellations';
import { getAllGroupConstellations, GroupConstellationQuery } from '../../lib/api/group-constellations';

interface Props extends SiteSettingsPage {
  page?: PageQuery;
  constellations: Array<GroupConstellationQuery>;
}

export default function Page({ siteSettings, page, constellations }: Props) {
  return (
    <Layout pageTitle={page?.title} siteSettings={siteSettings}>
      <GroupConstellations constellations={constellations}/>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [siteSettings, page, constellations] = await Promise.all([
    getSiteSettings(preview),
    getPage("styrer", preview),
    getAllGroupConstellations(preview),
  ]);
  return {
    props: { siteSettings, page, constellations },
    revalidate: 1,
  };
}
