import React from "react";
import Layout from "../../components/layout";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getPage, PageQuery } from "../../lib/api/pages";
import { pageSlugs } from '../../lib/pages';
import { getAllHonoraryMembers, HonoraryMemberForListQuery } from '../../lib/api/honorary-members';
import HonoraryMembers from '../../components/honorary-members';

interface Props extends SiteSettingsPage {
  honoraryMembers: Array<HonoraryMemberForListQuery>
  page?: PageQuery;
}

export default function HonoraryMembersPage({ honoraryMembers, siteSettings, page }: Props) {
  return (
    <Layout pageTitle={page?.title} siteSettings={siteSettings}>
      <HonoraryMembers honoraryMembers={honoraryMembers} />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [honoraryMembers, siteSettings, page] = await Promise.all([
    getAllHonoraryMembers(preview),
    getSiteSettings(preview),
    getPage(pageSlugs.HONORARY_MEMBERS, preview),
  ]);
  return {
    props: { honoraryMembers, siteSettings, page },
    revalidate: 1,
  };
}
