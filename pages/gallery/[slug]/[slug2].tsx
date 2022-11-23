import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../../components/layout";
import { GetStaticProps } from "next";
import { getSiteSettings, SiteSettingsPage } from "../../../lib/api/site-settings";
import {
  AlbumImageQuery,
  AlbumWithImagesQuery,
  getAlbumWithImages,
  getAllAlbumsWithSlugAndImages,
} from "../../../lib/api/gallery";
import Loading from "../../../components/loading";
import AlbumImage from '../../../components/album-image';

interface Props extends SiteSettingsPage {
  album: AlbumWithImagesQuery;
  photo: AlbumImageQuery;
}

export default function AlbumImagePage({ album, photo, siteSettings }: Props) {
  const router = useRouter();
  if ((!router.isFallback && !album?.slug) || !album || !photo) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout siteSettings={siteSettings}>
      {router.isFallback ? <Loading /> : <AlbumImage photo={photo} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
                                                       params,
                                                       preview = false,
                                                     }) => {
  const [album, siteSettings] = await Promise.all([
    getAlbumWithImages(params!.slug, preview),
    getSiteSettings(preview),
  ]);
  const photo = album.images.find((image) => image._key === params!.slug2);
  return {
    props: {
      preview,
      album,
      photo,
      siteSettings,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const albums = await getAllAlbumsWithSlugAndImages();
  const images = albums.flatMap(({ slug, images }) => images.map(({ _key }) => ({ slug, slug2: _key })))
  return {
    paths:
      images?.map(({ slug, slug2 }) => ({
        params: {
          slug,
          slug2
        },
      })) || [],
    fallback: false,
  };
}
