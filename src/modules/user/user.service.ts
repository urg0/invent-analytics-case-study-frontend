import request from "@config/axios";

export const getUsers = async () => {
  const response = await request.get("/users");
  return response.data;
};

export const getUserById = async (id: number | string) => {
  const response = await request.get(`/users/${id}`);
  return response.data;
};
