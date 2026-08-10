import type { PageServerLoad } from './$types';
import { newsItems, readIds, savedIds, topics } from './data';

export const load: PageServerLoad = () => {
  return { topics, newsItems, readIds, savedIds };
};
