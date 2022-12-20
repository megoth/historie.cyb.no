import { NowRequest, NowResponse } from '@vercel/node'
import sanityClient from '../../../lib/sanity';
import { apiKey, getClient, getIndex } from '../../../lib/algolia';

/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indices.
 */
const handler = (req: NowRequest, res: NowResponse) => {
  const algolia = getClient(apiKey)

  // Tip: Its good practice to include a shared secret in your webhook URLs and
  // validate it before proceeding with webhook handling. Omitted in this short
  // example.
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400)
    res.json({ message: 'Bad request' })
    return
  }

  const sanityAlgolia = getIndex(algolia);

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.
  return sanityAlgolia
    // TODO: Algolia uses Sanity Client 2.x, while we're using Sanity Client 3.x
    .webhookSync(sanityClient as any, req.body)
    .then(() => res.status(200).send('ok'))
}

export default handler
