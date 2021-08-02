import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../services/supabaseClient';

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
  if (req.method === 'GET') {
    const { after } = req.query;

    const imagesPerPage = 6;

    const { data, error } = await supabase
      .from<Image>('images')
      .select()
      .filter('isFavorite', 'eq', true)
      .order('date', { ascending: true })

    if (error) {
      return res.status(400).json(error);
    }

    if (data.length !== 0) {
      const positionImage = data.findIndex((item) => item.id === after)
      if (positionImage === -1) {
        return res.json({
          data: data.slice(0, imagesPerPage),
          after: data[imagesPerPage]?.id ?? null,
        });
      } else {
        return res.json({
          data: data.slice(positionImage, positionImage + imagesPerPage),
          after: data[positionImage + imagesPerPage]?.id ?? null,
        });
      }
    } else {
      return res.json({
        data: [],
        after: null,
      });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
