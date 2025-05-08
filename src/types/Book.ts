export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_sentence?: string;
  description?: string;
  rating?: number;
  review?: string;
  subjects?: string[];
  page_count?: number;
}
