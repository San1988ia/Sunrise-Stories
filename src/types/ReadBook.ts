import { Book } from "./Book";

export interface ReadBook extends Book {
  rating: number;
  review: string;
  page_count?: number;
}
