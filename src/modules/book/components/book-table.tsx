import { useState } from "react";
import { useBooks } from "../hooks/useBooks";

import { Table } from "@components/ui/table";
import { Skeleton } from "@components/ui/skeleton";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Calendar, BookOpen, Search, PenTool } from "lucide-react";
import BookDrawer from "./book-drawer";
import { Input } from "@components/ui/input";

import { Author, Book } from "../types";

const BookTable = () => {
  const { data: books = [], isLoading } = useBooks();

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books?.filter((book: Book) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      book.name.toLowerCase().includes(searchTerm) ||
      book.author.name.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) return <div>loading</div>;

  const columns = [
    {
      key: "name",
      label: "Book Name",
      sortable: true,
      render: (name: string) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <div className="text-gray-200 font-medium">{name}</div>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      label: "Author",
      sortable: true,
      render: (author: Author) => (
        <Badge className="bg-purple-500/10 text-purple-400">
          <PenTool className="w-3 h-3 mr-1" />
          {author.name}
        </Badge>
      ),
    },
    {
      key: "publicationYear",
      label: "Published",
      sortable: true,
      render: (publicationYear: number) => (
        <div className="text-gray-400 flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {publicationYear || "Unknown Year"}
        </div>
      ),
    },
    {
      key: "id",
      label: "",
      render: (id: string) => (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setSelectedBookId(id);
            setIsDrawerOpen(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1E1E1E] rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Books</h2>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search by name or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-[#2A2A2A] border-none text-white focus:border-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <Table data={filteredBooks} columns={columns} defaultSortKey="name" />

      <BookDrawer
        bookId={selectedBookId}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default BookTable;
