import React from "react";
import Head from "next/head";
import { SiteSettingsQuery } from "../../lib/api/site-settings";
import { GoogleFonts } from 'next-google-fonts';

interface Props {
  title: string;
  siteSettings: SiteSettingsQuery | undefined;
}

export default function Meta({ title, siteSettings }: Props) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:wght@300;700&display=swap"/>
      <Head>
        <meta charSet="UTF-8"/>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        {/*<link*/}
        {/*  href="/rss"*/}
        {/*  rel="alternate"*/}
        {/*  type="application/rss+xml"*/}
        {/*  title={`RSS for ${siteSettings?.title}`}*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="apple-touch-icon"*/}
        {/*  sizes="180x180"*/}
        {/*  href="/favicon/apple-touch-icon.png"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  sizes="32x32"*/}
        {/*  href="/favicon/favicon-32x32.png"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  sizes="16x16"*/}
        {/*  href="/favicon/favicon-16x16.png"*/}
        {/*/>*/}
        {/*<link rel="manifest" href="/favicon/site.webmanifest" />*/}
        {/*<link*/}
        {/*  rel="mask-icon"*/}
        {/*  href="/favicon/safari-pinned-tab.svg"*/}
        {/*  color="#000000"*/}
        {/*/>*/}
        {/*<link rel="shortcut icon" href="/favicon/favicon.ico" />*/}
        {/*<meta name="msapplication-TileColor" content={vars.color.base} />*/}
        {/*<meta name="msapplication-config" content="/favicon/browserconfig.xml" />*/}
        {/*<meta name="theme-color" content={vars.color.base} />*/}
        {/*<link rel="alternate" type="application/rss+xml" href="/feed.xml" />*/}
        {siteSettings?.description && <meta name="description" content={siteSettings.description}/>}
        {/*<meta property="og:image" content={HOME_OG_IMAGE_URL} />*/}
      </Head>
    </>
  );
}
