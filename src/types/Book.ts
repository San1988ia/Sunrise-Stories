export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_sentence?: string;
  subject?: string[];
  page_count?: number;
  description?: string | { value: string };
  table_of_contents?: Array<{ title?: string } | string>;
}
