import { BookOpen } from "lucide-react";
import Layout from "../layouts/base";
import BookTable from "@modules/book/components/book-table";

const Book = () => {
  return (
    <Layout title="Books" icon={BookOpen}>
      <BookTable />
    </Layout>
  );
};

export default Book;
