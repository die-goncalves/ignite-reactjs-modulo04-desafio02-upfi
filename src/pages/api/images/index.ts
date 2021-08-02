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
  if (req.method === 'POST') {
    const { url, title, description } = req.body;

    const { data, error } = await supabase
      .from<Image>("images")
      .insert([
        {
          title,
          description,
          url,
          isFavorite: false
        }
      ])

    if (error) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` })
    }

    if (data) {
      return res.status(201).json({ success: true });
    }
  }

  if (req.method === 'GET') {
    const { after, get } = req.query;

    if (get === 'all-images') {
      const { data, error } = await supabase
        .from<Image>('images')
        .select()
        .order('date', { ascending: true })

      if (error) {
        return res.status(400).json(error);
      }

      if (data) {
        return res.json({
          data
        });
      }
    } else {
      const imagesPerPage = 6;

      const { data, error } = await supabase
        .from<Image>('images')
        .select()
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
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
