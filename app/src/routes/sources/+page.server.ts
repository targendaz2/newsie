import type { PageServerLoad } from './$types';
import { sources, unreadBySource } from './data';

export const load: PageServerLoad = () => {
  return { sources, unreadBySource };
};
