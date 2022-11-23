import React, { useEffect } from "react";
import Footer from "../footer";
import Meta from "../meta";
import { ReactNode } from "react";
import { SiteSettingsQuery } from "../../lib/api/site-settings";
import Header from "../header";
import { layoutStyle } from "./styles.css";
import Container from "../container";
import { NavigationProvider } from "../../contexts/navigationContext";
import NavigationModal from "../navigation-modal";
import usePopState from "../../hooks/usePopState";
import { useRouter } from "next/router";
import Breadcrumbs, { Breadcrumb } from '../breadcrumbs';

interface Props {
  children: ReactNode;
  pageTitle?: string;
  siteSettings?: SiteSettingsQuery;
  crumbs?: Array<Breadcrumb>
}

export default function Layout({ children, pageTitle, siteSettings, crumbs }: Props) {
  const title = pageTitle
    ? `${pageTitle} - ${siteSettings?.title}`
    : siteSettings?.title;
  return (
    <NavigationProvider>
      <div className={layoutStyle}>
        <Meta title={title} siteSettings={siteSettings} />
        <div>
          <Header />
          <NavigationModal siteSettings={siteSettings} />
          <main id={"content"}>
            {(pageTitle || crumbs?.length) && (
              <Container>
                {crumbs?.length ? <Breadcrumbs crumbs={crumbs} /> : null}
                {pageTitle && <h1>{pageTitle}</h1>}
              </Container>
            )}
            {children}
          </main>
        </div>
        <Footer siteSettings={siteSettings} />
      </div>
    </NavigationProvider>
  );
}
