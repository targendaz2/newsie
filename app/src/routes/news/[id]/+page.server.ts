import { error } from '@sveltejs/kit';

import { newsItems } from '../../data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const id = Number(params.id);
  const newsItem = newsItems.find((item) => item.id === id);

  if (!newsItem) {
    error(404, 'Story not found');
  }

  return { newsItem };
};
