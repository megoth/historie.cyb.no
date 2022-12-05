import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../../components/layout";
import { GetStaticProps } from "next";
import { getSiteSettings, SiteSettingsPage } from "../../../lib/api/site-settings";
import {
  AlbumWithImagesQuery,
  getAlbumWithImages,
  getAllAlbumsWithSlug,
} from "../../../lib/api/gallery";
import Loading from "../../../components/loading";
import Album from "../../../components/album";
import { getPage, PageQuery } from '../../../lib/api/pages';

interface Props extends SiteSettingsPage {
  gallery: PageQuery;
  album: AlbumWithImagesQuery;
}

export default function AlbumPage({ gallery, album, siteSettings }: Props) {
  const router = useRouter();
  if ((!router.isFallback && !album?.slug) || !album) {
    return <ErrorPage statusCode={404}/>;
  }
  const crumbs = [
    { href: "/bilder", text: gallery?.title || "Bilder" }
  ]
  return (
    <Layout pageTitle={album.name} siteSettings={siteSettings} crumbs={crumbs}>
      {router.isFallback ? <Loading/> : <Album album={album}/>}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
                                                       params,
                                                       preview = false,
                                                     }) => {
  const [album, siteSettings, gallery] = await Promise.all([
    getAlbumWithImages(params!.slug, preview),
    getSiteSettings(preview),
    getPage("bilder", preview),
  ]);
  return {
    props: {
      preview,
      gallery,
      album,
      siteSettings,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const albums = await getAllAlbumsWithSlug();
  return {
    paths:
      albums?.map((album) => ({
        params: {
          slug: album.slug,
        },
      })) || [],
    fallback: false,
  };
}
