import { Sheet, SheetContent, SheetHeader } from "@components/ui/sheet";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { Badge } from "@components/ui/badge";
import { BookOpen, Star, Clock, Mail, Calendar, MapPin } from "lucide-react";
import { useUserById } from "../hooks/useUser";
import ReturnBookButton from "@modules/book/components/return-book-modal";
import { Book, PastBook } from "@modules/book/types";

interface Props {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const UserDetailsDrawer = ({ userId, open, onOpenChange }: Props) => {
  const { data: user, isLoading } = useUserById(userId || "");

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[#0A0A0A] border-l border-[#232323]">
        <SheetHeader className="pb-4">
          <div className="flex items-center space-x-4 mb-2">
            <div className="h-16 w-16 rounded-xl bg-[#141414] border border-[#232323] flex items-center justify-center">
              <span className="text-xl font-medium text-white">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">{user?.name}</h3>
              <p className="text-[#A0A0A0] mt-1">Member</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center text-[#A0A0A0]">
              <Mail className="w-4 h-4 mr-3" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center text-[#A0A0A0]">
              <Calendar className="w-4 h-4 mr-3" />
              <span>{user?.birthDate && formatDate(user.birthDate)}</span>
            </div>
            <div className="flex items-center text-[#A0A0A0]">
              <MapPin className="w-4 h-4 mr-3" />
              <span>{user?.address}</span>
            </div>
          </div>
        </SheetHeader>

        <Separator className="bg-[#232323] my-4" />

        <ScrollArea className="h-[calc(100vh-12rem)] pr-4 pb-12">
          {user && (
            <div className="py-6">
              {user.books.present.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-[#A0A0A0] flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Currently Reading
                    </h4>
                    <Badge className="bg-white/5 text-white border-white/10">
                      {user.books.present.length} books
                    </Badge>
                  </div>
                  {user.books.present.map(({ book }: { book: Book }) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      userId={userId || ""}
                      showReturnButton={true}
                    />
                  ))}
                </div>
              )}

              {user.books.past.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-[#A0A0A0] flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Reading History
                    </h4>
                    <Badge className="bg-white/5 text-white border-white/10">
                      {user.books.past.length} books
                    </Badge>
                  </div>
                  {user.books.past.map(({ book, userScore }: PastBook) => (
                    <BookCard key={book.id} book={book} score={userScore} />
                  ))}
                </div>
              )}

              {user.books.past.length === 0 &&
                user.books.present.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-[#A0A0A0] mx-auto mb-3" />
                    <p className="text-[#A0A0A0]">No reading history yet</p>
                  </div>
                )}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default UserDetailsDrawer;

const BookCard = ({
  book,
  score,
  userId,
  showReturnButton = false,
}: {
  book: Book;
  score?: number;
  userId?: number | string;
  showReturnButton?: boolean;
}) => (
  <div className="p-4 bg-[#141414] rounded-xl border border-[#232323] mb-3  transition-colors duration-200">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-white font-medium">{book.name}</h4>
        <p className="text-sm text-[#A0A0A0]">{book.author.name}</p>
      </div>
      {score !== undefined && (
        <Badge className="bg-white/5 text-white border-white/10">
          <Star className="w-3 h-3 mr-1" />
          {score}
        </Badge>
      )}
    </div>
    <div className="flex items-center mt-2 space-x-2 text-xs text-[#A0A0A0]">
      <span>Published {book.publicationYear}</span>
      <span>•</span>
      <span className="flex items-center">
        <Star className="w-3 h-3 mr-1 text-white/80" />
        {book.averageRating}
      </span>
    </div>
    {showReturnButton && userId && (
      <ReturnBookButton book={book} userId={userId} />
    )}
  </div>
);
