import React from "react";
import { GetStaticProps } from "next";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getAllPagesWithSlug, getPage, PageQuery } from '../../lib/api/pages';
import { existsSync } from 'fs';
import { join } from 'path';
import CustomPage from './index';

interface Props extends SiteSettingsPage {
  page: PageQuery
}

export default function SubPage({ ...props }: Props) {
  return <CustomPage {...props} />;
}

export const getStaticProps: GetStaticProps = async ({
                                                       params,
                                                       preview = false,
                                                     }) => {
  const [page, siteSettings] = await Promise.all([
    getPage(params.slug2, preview),
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
  const pages = (await getAllPagesWithSlug())
    .filter(({ parentSlug }) => parentSlug)
    .filter(({ parentSlug, slug }) => !existsSync(join(__dirname, `${parentSlug}/${slug}.js`)));
  return {
    paths:
      pages?.map(({ slug, parentSlug }) => ({
        params: {
          slug: parentSlug,
          slug2: slug
        },
      })) || [],
    fallback: false,
  };
}
