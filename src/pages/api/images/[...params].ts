import { NextApiRequest, NextApiResponse } from 'next';
import fauna from 'faunadb';

const { query } = fauna;
const client = new fauna.Client({ secret: process.env.FAUNA_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'DELETE') {
    const { params } = req.query;

    return client
      .query(
        query.Delete(query.Ref(query.Collection('images'), params[0]))
      )
      .then(() => {
        return res.status(200).json({ success: true });
      })
      .catch(err =>
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${err.message}` })
      );
  }

  if (req.method === 'PUT') {
    const { params } = req.query;

    if (params[1] === 'favorite') {
      return client
        .query(
          query.Update(query.Ref(query.Collection('images'), params[0]),
            { data: { isFavorite: !req.body.isFavorite } },
          )
        )
        .then(() => {
          return res.status(200).json({ success: true });
        })
        .catch(err =>
          res
            .status(501)
            .json({ error: `Sorry something Happened! ${err.message}` })
        );
    } else {
      return client
        .query(
          query.Update(query.Ref(query.Collection('images'), params[0]),
            { data: { title: req.body.title, description: req.body.description } },
          )
        )
        .then(() => {
          return res.status(200).json({ success: true });
        })
        .catch(err =>
          res
            .status(501)
            .json({ error: `Sorry something Happened! ${err.message}` })
        );
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
