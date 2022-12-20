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
import Breadcrumbs, { Breadcrumb } from '../breadcrumbs';
import { getClient, index, searchKey } from '../../lib/algolia';
import { InstantSearch } from 'react-instantsearch-hooks-web';

interface Props {
  children: ReactNode;
  pageTitle?: string;
  siteSettings?: SiteSettingsQuery;
  crumbs?: Array<Breadcrumb>
}

export default function Layout({ children, pageTitle, siteSettings, crumbs }: Props) {
  const searchClient = getClient(searchKey);
  const title = pageTitle
    ? `${pageTitle} - ${siteSettings?.title}`
    : siteSettings?.title;
  return (
    <InstantSearch indexName={index} searchClient={searchClient}>
      <NavigationProvider>
        <div className={layoutStyle}>
          <Meta title={title} siteSettings={siteSettings}/>
          <div>
            <Header/>
            <NavigationModal siteSettings={siteSettings}/>
            <main id={"content"}>
              {(pageTitle || crumbs?.length) && (
                <Container>
                  {crumbs?.length ? <Breadcrumbs crumbs={crumbs}/> : null}
                  {pageTitle && <h1>{pageTitle}</h1>}
                </Container>
              )}
              {children}
            </main>
          </div>
          <Footer siteSettings={siteSettings}/>
        </div>
      </NavigationProvider>
    </InstantSearch>
  );
}
