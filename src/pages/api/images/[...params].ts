import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../services/supabaseClient';

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
  date: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'DELETE') {
    const { params } = req.query;

    const { data, error } = await supabase
      .from<Image>('images')
      .delete()
      .match({ id: params[0] })

    if (error) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` })
    }
    if (data) {
      return res.status(200).json({ success: true });
    }
  }

  if (req.method === 'PUT') {
    const { params } = req.query;

    if (params[1] === 'favorite') {
      const { data, error } = await supabase
        .from<Image>('images')
        .update({ isFavorite: !req.body.isFavorite })
        .match({ id: params[0] })

      if (error) {
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${error.message}` })
      }
      if (data) {
        return res.status(200).json({ success: true });
      }
    } else {
      const { data, error } = await supabase
        .from<Image>('images')
        .update({ title: req.body.title, description: req.body.description })
        .match({ id: params[0] })

      if (error) {
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${error.message}` })
      }
      if (data) {
        return res.status(200).json({ success: true });
      }
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
