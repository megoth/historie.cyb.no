import sanity from '../../../lib/sanity';
import { NowRequest, NowResponse } from '@vercel/node'
import { getClient, getIndex } from '../../../lib/algolia';

const handler = (req: NowRequest, res: NowResponse) => {
  const algolia = getClient();

  // Tip: Its good practice to include a shared secret in your webhook URLs and
  // validate it before proceeding with webhook handling. Omitted in this short
  // example.
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400)
    res.json({ message: 'Bad request' })
    return
  }

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
