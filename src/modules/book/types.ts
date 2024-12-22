import { BorrowHistory } from "@modules/borrow/types";

export interface Author {
  id: number;
  name: string;
  bio: string;
  birthdate: string;
}

export interface Book {
  id: number;
  name: string;
  author: Author;
  borrows: BorrowHistory[];
  averageRating?: number;
  publicationYear: number;
}

export interface PastBook {
  book: Book;
  userScore: number;
}
