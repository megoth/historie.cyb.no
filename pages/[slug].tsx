import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { getSiteSettings, SiteSettingsPage } from "../lib/api/site-settings";
import Loading from "../components/loading";
import { getAllPagesWithSlug, getPage, PageQuery } from '../lib/api/pages';
import PageComponents from '../components/page-components';

interface Props extends SiteSettingsPage {
  page: PageQuery
}

export default function CustomPage({ page, siteSettings }: Props) {
  const router = useRouter();
  console.log({ page })
  return (
    <Layout pageTitle={page.title} siteSettings={siteSettings}>
      {router.isFallback ? <Loading/> : <PageComponents page={page}/>}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
                                                       params,
                                                       preview = false,
                                                     }) => {
  const [page, siteSettings] = await Promise.all([
    getPage(params.slug, preview),
    getSiteSettings(preview),
  ]);
  return {
    props: {
      preview,
      page,
      siteSettings,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const pages = await getAllPagesWithSlug();
  console.log("TEST", pages)
  return {
    paths:
      pages?.map(({ slug }) => ({
        params: {
          slug,
        },
      })) || [],
    fallback: false,
  };
}
