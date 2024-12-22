import request from "@config/axios";
import { BorrowResponse, ReturnBookRequest } from "./types";

export const borrowBook = async (userId: string, bookId: number) => {
  const response = await request.post<BorrowResponse>(
    `/${userId}/borrow/${bookId}`
  );
  return response.data;
};

export const returnBook = async (
  userId: number | string,
  bookId: number,
  score: number
) => {
  const response = await request.post<BorrowResponse>(
    `/${userId}/return/${bookId}`,
    { score } as ReturnBookRequest
  );
  return response.data;
};
