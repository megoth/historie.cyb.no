/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
  namespace Schema {
    /**
     * Historie
     */
    interface Event extends Sanity.Document {
      _type: "event";

      /**
       * Navn - `String`
Nødvendig
       */
      name?: string;

      /**
       * Forkortelse - `String`
       */
      short?: string;

      /**
       * År - `Date`
Nødvendig
       */
      year?: string;

      /**
       * Dato - `Date`
Hvis man vet nøyaktig dato
       */
      date?: string;

      /**
       * Stor hendelse - `Boolean`
       */
      major?: boolean;

      /**
       * Slug - `Slug`
Nødvendig
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Beskrivelse - `Array`
       */
      description?: Array<Sanity.Keyed<Sanity.Block>>;

      /**
       * Kilder - `Array`
Helst en eller flere
       */
      sources?: Array<Sanity.KeyedReference<Source>>;
    }

    /**
     * Kilde
     */
    interface Source extends Sanity.Document {
      _type: "source";

      /**
       * Navn - `String`
Nødvendig
       */
      text?: string;

      /**
       * Lenke - `Url`
       */
      url?: string;
    }

    /**
     * Site Settings
     */
    interface SiteSettings extends Sanity.Document {
      _type: "siteSettings";

      /**
       * Sidens tittel - `String`
       */
      title?: string;

      /**
       * Beskrivelse av siden - `Text`
       */
      description?: string;

      /**
       * Hovedmeny - `Reference`
       */
      mainNav?: Sanity.Reference<Navigation>;

      /**
       * Undermeny - `Reference`
       */
      subNav?: Sanity.Reference<Navigation>;

      /**
       * Tekst i foten - `Array`
       */
      footer?: Array<Sanity.Keyed<Sanity.Block>>;
    }

    /**
     * Side
     */
    interface Page extends Sanity.Document {
      _type: "page";

      /**
       * Navn - `String`
Nødvendig
       */
      name?: string;

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Slug - `Slug`
Nødvendig
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Foreldreside - `RegistryReference`
       */
      parent?: ParentPage;

      /**
       * Beskrivelse - `Text`
       */
      description?: string;

      /**
       * Presentasjon som hendelse - `RegistryReference`
Om du ønsker å ha med teksten i tidslinjen, fyll ut informasjonen her
       */
      event?: PageEvent;

      /**
       * Innhold - `Array`
       */
      components?: Array<
        | Sanity.Keyed<TextComponent>
        | Sanity.Keyed<ButtonComponent>
        | Sanity.Keyed<ButtonsComponent>
        | Sanity.Keyed<DataComponent>
        | Sanity.Keyed<FileComponent>
        | Sanity.Keyed<ImageComponent>
        | Sanity.Keyed<SubpagesComponent>
      >;
    }

    /**
     * Navigering
     */
    interface Navigation extends Sanity.Document {
      _type: "navigation";

      /**
       * Title - `String`
       */
      title?: string;

      /**
       * Navigation Id - `Slug`
       */
      navId?: {
        _type: "navId";
        current: string;
      };

      /**
       * Navigation items - `Array`
       */
      items?: Array<Sanity.Keyed<NavigationItem>>;
    }

    /**
     * Album
     */
    interface Album extends Sanity.Document {
      _type: "album";

      /**
       * Navn - `String`
Nødvendig
       */
      name?: string;

      /**
       * Slug - `Slug`
Nødvendig
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Dato - `Date`
       */
      date?: string;

      /**
       * Bilder - `Array`
Øverste bildet vil bli thumbnail for album
       */
      images?: Array<Sanity.Keyed<Photo>>;
    }

    /**
     * Person
     */
    interface Person extends Sanity.Document {
      _type: "person";

      /**
       * Navn - `String`
Nødvendig
       */
      name?: string;

      /**
       * Brukernavn - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Profil - `Array`
       */
      profile?: Array<Sanity.Keyed<Sanity.Block>>;
    }

    /**
     * Gruppe
     */
    interface Group extends Sanity.Document {
      _type: "group";

      /**
       * Navn - `String`
Nødvendig
       */
      name?: string;

      /**
       * Rekkefølge - `Number`
Nødvendig (0 og oppover)
       */
      order?: number;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Beskrivelse - `Array`
       */
      description?: Array<Sanity.Keyed<Sanity.Block>>;
    }

    /**
     * Gruppesammensetning
     */
    interface GroupConstellation extends Sanity.Document {
      _type: "groupConstellation";

      /**
       * Gruppe - `Reference`
Nødvendig
       */
      group?: Sanity.Reference<Group>;

      /**
       * År - `Date`
Nødvendig
       */
      year?: string;

      /**
       * Semester - `String`
Nødvendig
       */
      semester?: "vår" | "høst";

      /**
       * Medlemmer - `Array`
       */
      members?: Array<Sanity.Keyed<Membership>>;
    }

    type BlockContent = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<{
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        }>
    >;

    type PageEvent = {
      _type: "pageEvent";

      /**
       * Navn - `String`
Teksten som vil vises i tidslinjen
       */
      name?: string;

      /**
       * Dato - `Date`
Nødvendig om teksten skal vises i tidslinjen.
       */
      date?: string;

      /**
       * Stor hendelse - `Boolean`
       */
      major?: boolean;
    };

    type ButtonComponent = {
      _type: "button-component";

      /**
       * Tekst - `String`
Nødvendig
       */
      text?: string;

      /**
       * Lenke - `RegistryReference`
       */
      link?: Link;

      /**
       * Type knapp - `String`
       */
      variant?: "primary";
    };

    type ButtonsComponent = {
      _type: "buttons-component";

      /**
       * Knapper - `Array`
       */
      buttons?: Array<Sanity.Keyed<ButtonComponent>>;
    };

    type DataComponent = {
      _type: "data-component";

      /**
       * Type - `String`
Data må lenkes opp mot siden via kode
       */
      type?: "albums" | "events" | "pageUpdates" | "subpages";
    };

    type FileComponent = {
      _type: "file-component";

      /**
       * Filnavn - `String`
       */
      name?: string;

      /**
       * Fil - `File`
       */
      file?: {
        asset: Sanity.Asset;
      };
    };

    type ImageComponent = {
      _type: "image-component";

      /**
       * Bilde - `RegistryReference`
       */
      photo?: Photo;
    };

    type SubpagesComponent = {
      _type: "subpages-component";

      /**
       * Type liste - `String`
       */
      variant?: "default";
    };

    type TextComponent = {
      _type: "text-component";

      /**
       * Tekst - `Array`
Nødvendig
       */
      text?: Array<Sanity.Keyed<Sanity.Block>>;

      /**
       * Type tekst - `String`
       */
      variant?: "large";
    };

    type Link = {
      _type: "link";

      /**
       * Internal Link - `Reference`
Select pages for navigation
       */
      internalLink?: Sanity.Reference<Page>;

      /**
       * External URL - `String`
       */
      externalUrl?: string;
    };

    type NavigationItem = {
      _type: "navigationItem";

      /**
       * Navigation Text - `String`
       */
      text?: string;

      /**
       * Navigation Item URL - `RegistryReference`
       */
      navigationItemUrl?: Link;
    };

    type Photo = {
      _type: "photo";

      /**
       * Bilde - `Image`
Nødvendig
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Kort beskrivelse - `String`
Nødvendig
       */
      alt?: string;

      /**
       * Lang beskrivelse - `Array`
       */
      description?: Array<Sanity.Keyed<Sanity.Block>>;
    };

    type ParentPage = {
      _type: "parentPage";

      /**
       * Side - `Reference`
       */
      page?: Sanity.Reference<Page>;

      /**
       * Rekkefølge indeks - `Number`
Hvilken rekkefølge skal siden ha? (0 og oppover)
       */
      orderNo?: number;

      /**
       * Rekkefølge dato - `Date`
Alternativt kan du bruke dato for rekkefølge
       */
      date?: string;
    };

    type Membership = {
      _type: "membership";

      /**
       * Person - `Reference`
Nødvendig
       */
      person?: Sanity.Reference<Person>;

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Notat - `String`
       */
      note?: string;
    };

    type Document =
      | Event
      | Source
      | SiteSettings
      | Page
      | Navigation
      | Album
      | Person
      | Group
      | GroupConstellation;
  }
}
