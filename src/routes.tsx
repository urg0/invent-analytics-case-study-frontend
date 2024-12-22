import { useRoutes } from "react-router-dom";
import Users from "@pages/user";
import Book from "@pages/book";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Users />,
    },
    {
      path: "/books",
      element: <Book />,
    },

    // {
    //   path: "*", //any other path
    //   element: <ErrorPage />,
    // },
  ]);

  return elements;
};
