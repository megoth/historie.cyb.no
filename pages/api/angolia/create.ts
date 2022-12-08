import sanity from '../../../lib/sanity';
import { NowRequest, NowResponse } from '@vercel/node'
import { getClient, getIndex } from '../../../lib/algolia';

const handler = (req: NowRequest, res: NowResponse) => {
  const algolia = getClient()

  // Fetch the _id of all the documents we want to index
  const types = ["page"];
  const query = `* [_type in $types && !(_id in path("drafts.**"))][]._id`

  const sanityAlgolia = getIndex(algolia);

  return sanity
    .fetch(query, { types })
    // TODO: Algolia uses Sanity Client 2.x, while we're using Sanity Client 3.x
    .then(ids => sanityAlgolia.webhookSync(sanity as any, { ids: { created: ids, updated: [], deleted: [] } }))
    .then(() => res.status(200).send('ok'))
}

export default handler
