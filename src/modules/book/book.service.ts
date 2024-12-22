import request from "@config/axios";

export const getBooks = async () => {
  const response = await request.get("/books");
  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await request.get(`/books/${id}`);
  return response.data;
};
