export interface Source {
  /** Unique ID of the source feed. */
  id: number;

  title: string;

  type: string;

  url: string;

  lastFetchedAt: Date;

  active: boolean;
}

export interface Topic {
  id: number;
  title: string;
}

/** Feed filter view: all news items, unread only, or saved only. */
export type NewsFilter = 'all' | 'unread' | 'saved';

export interface NewsItem {
  /** Unique ID of the news item. */
  id: number;

  /** News item headline. */
  title: string;

  /** Two-line preview of the news item body. */
  excerpt?: string;

  /** Full story body, as paragraphs. */
  body?: string[];

  url: string;

  /** Time when the news item was published. */
  publishedAt: Date;

  /** Source feed. */
  source: Source;

  topic: Topic;
}
