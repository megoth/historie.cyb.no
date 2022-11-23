import React from "react";
import { GetStaticProps } from "next";
import { getSiteSettings, SiteSettingsPage } from "../../lib/api/site-settings";
import { getAllPagesWithSlug, getPage, PageQuery } from '../../lib/api/pages';
import { existsSync } from 'fs';
import { join } from 'path';
import CustomPage from './index';

interface SubPageProps extends SiteSettingsPage {
  page: PageQuery
  parentPage: PageQuery
}

export default function SubPage({ ...props }: SubPageProps) {
  return <CustomPage {...props} subpages={[]}/>;
}

export const getStaticProps: GetStaticProps = async ({
                                                       params,
                                                       preview = false,
                                                     }) => {
  const [page, siteSettings, parentPage] = await Promise.all([
    getPage(params.slug2, preview),
    getSiteSettings(preview),
    getPage(params.slug, preview),
  ]);
  return {
    props: {
      preview,
      page,
      parentPage,
      siteSettings,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const pages = (await getAllPagesWithSlug())
    .filter(({ parentSlug }) => parentSlug)
    .filter(({ parentSlug, slug }) => !existsSync(join(process.cwd(), "pages", parentSlug, slug, "index.tsx")));
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
