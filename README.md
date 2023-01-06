# Historic portal for Cybernetic Society

This is the system to manage the historic portal of [Cybernetic Society](https://cyb.no/) (CYB),
the institute association at the Department of Computer Science at the University of Oslo. It's
implemented using Next.js, Sanity, TypeScript, vanilla-extract, and Algolia, and produces a
static website that lives at [historie.cyb.no](https://historie.cyb.no).

- [Next.js](https://nextjs.org/) is a React framework that gives us a set of features and guidelines
- [Sanity](https://www.sanity.io/) is a headless CMS that holds all of our data
- [TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript, which amongst others
  gives us types, which prevents us introducing a lot of buggy code
- [vanilla-extract](https://vanilla-extract.style/) is a way of writing CSS with TypeScript
- [Algolia](https://www.algolia.com/) is a headless search engine, that integrates with Sanity so
  that we can index our data and offer a search feature on our webpage

## Running the front-end

Rename the `.env.test` file to `.env` and store the environment variables that Next and Sanity will
use to pull data from the Sanity API. You can get or create the tokens, ids, and secrets from
[manage.sanity.io](https://manage.sanity.io).

Once those env variables are ready, you can run the following commands to get Next's development
server up and running:

```bash
npm install

# Run the frontend
npm run dev

# Run the Studio
npm run start:sanity

# Generating types for Sanity schemes
npm run generate:types
```

The website will be running at `http://localhost:3000`, the Studio will run at
`http://localhost:3333`. The types need to be generated after changes in Sanity schemes.

## File architecture

The main structure that the different files are located in looks like this:

```
- components // React components
- contexts // React contexts
- lib // Various utility functions
-- api // All functions related to the Sanity API
- pages // Next.js pages
- public // Files that will be copied into the static website
- studio // Sanity Studio
-- schemas // Sanity Schemas
```

One way of understanding how this works is to look at the workflow when setting up a new feature.

You probably want to start describing the data you need. To do this, we need to tell Sanity the
structure of this data by adding one or more [schemas](https://www.sanity.io/docs/schema-types) to
`studio/schemas`. You can work with this data by running Sanity Studio.

When you're happy with your data and have something to test with, you probably want to present this
in the UI somehow. To do this we need to hook up one or more [GROQ](https://www.sanity.io/docs/groq)
queries in `lib/api`. These are then tied into `pages`, where we tell Next.js that these queries
should be run when compiling the site into a static webpage.

The data is then funneled into the various pages, that consists of React components. Depending on
the complexity of the functionality you might need to implement React contexts and React hooks
(which we have none of currently, but would be located in `hooks` when we need them) too.

If you want the data to be searchable via the search feature, you also want to hook this data up
to [Algolia](https://www.algolia.com/) by adding it to `lib/algolia.ts`.

## Domain architecture

All data is structured into Sanity schemas in `studio/schemas`. These can be categorized into the
following features:

- **Pages:** Administrators can create pages via the studio, which can be have parent pages.
  Currently we only support one level of parent (e.g. `foo/bar`, but not `foo/bar/baz`), but we can
  expand this if needed.

  The main part of pages are the body section, which can consists of multiple components:
  - `buttonComponent`: A simple link (that looks like a button)
  - `buttonsComponent`: A group of links (that looks like buttons)
  - `dataComponent`: A special component that must be tied into special pages (this will eventually
    be phased out, so ignore it)
  - `fileComponent`: Allows uploading a file that are linked to from the page
  - `imageComponent`: A single picture (using `photo`)
  - `subpagesComponent`: List pages that have the current page as a parent page
  - `textComponent`: A block of text (using `blockContent`)
- **Pictures:** Photo albums (`album`) that contains pictures (`photo`). Photos can be described
  using larger texts (`blockContent`).
- **Groups:** Groups of people, using `group`, `groupComposition`, 'membership', and `person`.
  A person should have a title in the group, otherwise it will default to "Medlem".
- **Honorary Members:** A list of people that have received an honorary membership by CYB. Using
  the `person` schema.
- **History:** A timeline of all events that have happened in CYB's history. The main schema for
  this feature is `event`, but pages also have fields that allow them to optionally
  be added to the timeline. Finally, groups and honorary members are also added to the timeline.
  `event` are the only one to be using the `source` schema though, where administrators can link
  an event to sources, be they on the internet or in a book.

  An event can be assigned as a minor or major event, which are presented a bit differently in the
  timeline. This option is also available for pages.
- **Site settings:** This schema is a bit special, since we only need one for the whole site. So
  in the studio this is hardcoded to point to the single instance we need. This feature uses the
  `siteSettings`, `navigation` and `navigationItem` schemas, and allows manipulating global
  features, like the menus.
