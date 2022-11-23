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
import { getPage, PageQuery } from '../../../lib/api/pages';

interface Props extends SiteSettingsPage {
  gallery: PageQuery;
  album: AlbumWithImagesQuery;
  photo: AlbumImageQuery;
}

export default function AlbumImagePage({ gallery, album, photo, siteSettings }: Props) {
  const router = useRouter();
  if ((!router.isFallback && !album?.slug) || !album || !photo) {
    return <ErrorPage statusCode={404} />;
  }
  const crumbs = [
    { href: "/gallery", text: gallery?.title || "Galleri" },
    { href: `/gallery/${album.slug}`, text: album.name }
  ]
  return (
    <Layout siteSettings={siteSettings} crumbs={crumbs}>
      {router.isFallback ? <Loading /> : <AlbumImage album={album} photo={photo} />}
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
    getPage("gallery", preview),
  ]);
  const photo = album.images.find((image) => image._key === params!.slug2);
  return {
    props: {
      preview,
      gallery,
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
