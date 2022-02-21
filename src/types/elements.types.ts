export interface Feed {
  url?: string;
  author?: string;
  description?: string;
  image?: string;
}

export interface FeedItem {
  author?: string;
  categories?: string[];
  content?: string;
  description?: string;
  guid?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  thumbnail?: string;
  title?: string;
}
