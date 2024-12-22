import { useState } from "react";
import { useBorrowBook } from "@modules/borrow/hooks/useBorrow";
import { useUsers } from "../hooks/useUser";
import { queryClient } from "../../../main";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { BookOpenCheck, AlertCircle } from "lucide-react";

import { User } from "../types";
import { Book } from "@modules/book/types";
import { BorrowHistory } from "@modules/borrow/types";

type Props = {
  book: Book;
  isCurrentlyBorrowed: boolean;
};

const BorrowBookButton = ({ book, isCurrentlyBorrowed }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const currentBorrow = book.borrows.find(
    (borrow: BorrowHistory) => borrow.returnedAt === null
  );

  const { data: users = [], isLoading: isLoadingUsers } = useUsers();
  const { mutate: borrowBook } = useBorrowBook();

  const handleBorrow = () => {
    if (selectedUserId) {
      borrowBook(
        {
          userId: selectedUserId,
          bookId: book.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/book-${book.id}`] });
            queryClient.invalidateQueries({ queryKey: ["/books"] });

            // Refetch the book query to update the UI
            queryClient.refetchQueries({ queryKey: [`book-${book.id}`] });

            setIsOpen(false);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-end w-full">
        <Button
          variant={isCurrentlyBorrowed ? "secondary" : "default"}
          onClick={() => setIsOpen(true)}
          className={`flex items-center w-full gap-2 ${
            isCurrentlyBorrowed
              ? "bg-[#141414] text-[#A0A0A0] hover:bg-[#141414] cursor-not-allowed border border-[#232323]"
              : "bg-white text-black hover:bg-white/90"
          }`}
          disabled={isCurrentlyBorrowed}
        >
          <BookOpenCheck className="w-4 h-4" />
          {isCurrentlyBorrowed ? "Currently Unavailable" : "Borrow Book"}
        </Button>

        {isCurrentlyBorrowed && (
          <p className="text-[#A0A0A0] text-sm mt-2">
            *Borrowed by {currentBorrow?.user?.name}
          </p>
        )}
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-[#0A0A0A] border border-[#232323]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5" />
              Borrow {book.name}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#A0A0A0]">
              Select a user to assign this book to
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            {isLoadingUsers ? (
              <div className="flex items-center gap-2 text-[#A0A0A0]">
                <AlertCircle className="w-4 h-4" />
                Loading users...
              </div>
            ) : (
              <Select onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-full bg-[#141414] border-[#232323] text-white">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-[#232323]">
                  {users.map((user: User) => (
                    <SelectItem
                      key={user.id}
                      value={user.id.toString()}
                      className="text-[#A0A0A0] hover:bg-[#232323] focus:bg-[#232323] focus:text-white"
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#141414] text-white border-[#232323] hover:bg-[#1C1C1C] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBorrow}
              disabled={!selectedUserId}
              className="bg-white text-black hover:bg-white/90 disabled:bg-[#141414] disabled:text-[#A0A0A0] disabled:border disabled:border-[#232323]"
            >
              <BookOpenCheck className="w-4 h-4 mr-2" />
              Confirm Borrow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BorrowBookButton;
