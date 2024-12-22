import { useBookById } from "../hooks/useBooks";

import { Badge } from "@components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@components/ui/sheet";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import BorrowBookButton from "@modules/user/components/borrow-book-modal";
import { Star, User, Clock, Book, Globe, Award, BookOpen } from "lucide-react";

import { BorrowHistory } from "@modules/borrow/types";

const BookDrawer = ({
  bookId,
  open,
  onOpenChange,
}: {
  bookId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data: book, isLoading } = useBookById(bookId || "");

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-[#0A0A0A] border-l border-[#232323]">
          <div className="flex flex-col gap-4 mt-6">
            <div className="h-8 w-1/3 bg-[#141414] rounded-lg animate-pulse" />
            <div className="h-4 w-2/3 bg-[#141414] rounded-lg animate-pulse" />
            <div className="h-32 w-full bg-[#141414] rounded-xl animate-pulse mt-4" />
            <div className="h-24 w-full bg-[#141414] rounded-xl animate-pulse" />
            <div className="h-24 w-full bg-[#141414] rounded-xl animate-pulse" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!book || isLoading) return null;

  const isCurrentlyBorrowed = book.borrows.some(
    (borrow: BorrowHistory) => !borrow.returnedAt
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[#0A0A0A] border-l border-[#232323]">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-white text-xl">Book Details</SheetTitle>
          <SheetDescription className="text-[#A0A0A0]">
            Book information and borrowing status
          </SheetDescription>
        </SheetHeader>

        <Separator className="bg-[#232323]" />

        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="py-6">
            {/* Book Header */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-8 h-8 text-[#A0A0A0]" />
                    <h3 className="text-xl font-medium text-white">
                      {book.name}
                    </h3>
                  </div>
                  <p className="text-[#A0A0A0] mt-2 text-sm leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
              <BorrowBookButton
                book={book}
                isCurrentlyBorrowed={isCurrentlyBorrowed}
              />

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-white/5 text-white border-white/10">
                  <Star className="w-3 h-3 mr-1" />
                  {book.averageRating
                    ? book.averageRating?.toFixed(1)
                    : "No rating"}
                </Badge>
                {book.isBestSeller && (
                  <Badge className="bg-white/5 text-white border-white/10">
                    <Award className="w-3 h-3 mr-1" />
                    Bestseller
                  </Badge>
                )}
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6 bg-[#141414] p-4 rounded-xl border border-[#232323]">
                <div className="space-y-1">
                  <div className="flex items-center text-[#A0A0A0]">
                    <Book className="w-4 h-4 mr-2" />
                    <span className="text-sm">Pages</span>
                  </div>
                  <p className="text-white pl-6">{book.pageCount}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-[#A0A0A0]">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">Published</span>
                  </div>
                  <p className="text-white pl-6">{book.publicationYear}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-[#A0A0A0]">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">Language</span>
                  </div>
                  <p className="text-white pl-6">{book.language}</p>
                </div>
              </div>
            </div>

            {/* Author Section */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-[#A0A0A0] mb-4">
                Author
              </h4>
              <div className="bg-[#141414] p-4 rounded-xl border border-[#232323]">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">
                      {book.author.name}
                    </h5>
                    <p className="text-sm text-[#A0A0A0]">
                      Born in {new Date(book.author.birthDate).getFullYear()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0] mt-3">{book.author.bio}</p>
              </div>
            </div>

            {/* Borrowing History */}
            <div>
              <h4 className="text-sm font-medium text-[#A0A0A0] mb-4">
                Borrowing History
              </h4>
              <div className="space-y-3">
                {book.borrows.map((borrow: BorrowHistory) => (
                  <div
                    key={borrow.id}
                    className="bg-[#141414] p-4 rounded-xl border border-[#232323]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white">{borrow.user.name}</span>
                      {!borrow.returnedAt && (
                        <Badge className="bg-white/5 text-white border-white/10">
                          Currently borrowed
                        </Badge>
                      )}
                      {borrow.rating && (
                        <Badge className="bg-white/5 text-white border-white/10">
                          <Star className="w-3 h-3 mr-1" />
                          {borrow.rating}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-[#A0A0A0]">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>
                        {new Date(borrow.borrowedAt).toLocaleDateString()}
                        {borrow.returnedAt &&
                          ` - ${new Date(
                            borrow.returnedAt
                          ).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {book.borrows.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-[#A0A0A0] mx-auto mb-3" />
              <p className="text-[#A0A0A0]">No reading history yet</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BookDrawer;
