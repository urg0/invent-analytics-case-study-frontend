import { useQuery } from "@tanstack/react-query";
import { getBooks, getBookById } from "../book.service";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

export const useBookById = (id: string) => {
  return useQuery({
    queryKey: [`book-${id}`],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
};
