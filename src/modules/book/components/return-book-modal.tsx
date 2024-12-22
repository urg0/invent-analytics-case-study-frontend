import { useState } from "react";
import { useReturnBook } from "@modules/borrow/hooks/useBorrow";

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

import { Star, BookOpenCheck, Stars } from "lucide-react";
import { Book } from "../types";

type Props = {
  book: Book;
  userId: number | string;
};

const ReturnBookButton = ({ book, userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { mutate: returnBook } = useReturnBook();

  const handleReturn = () => {
    returnBook({
      userId,
      bookId: book.id,
      score: rating,
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="mt-2 bg-[#141414] text-white hover:bg-[#1C1C1C] hover:text-white border border-[#232323] flex items-center gap-2"
      >
        <BookOpenCheck className="w-4 h-4" />
        Return Book
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-[#0A0A0A] border border-[#232323]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5" />
              Return {book.name}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#A0A0A0]">
              How would you rate your reading experience?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-6">
            <div className="flex justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer transition-all duration-200 ${
                    (hoveredRating || rating) >= star
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  size={32}
                  fill={
                    (hoveredRating || rating) >= star
                      ? "#8B5CF6"
                      : "transparent"
                  }
                  color={
                    (hoveredRating || rating) >= star ? "#8B5CF6" : "#A0A0A0"
                  }
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <p className="text-center text-[#A0A0A0] text-sm">
              {rating === 0 ? "Select a rating" : `${rating} out of 5 stars`}
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#141414] text-white border-[#232323] hover:bg-[#1C1C1C] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReturn}
              disabled={rating === 0}
              className="bg-white text-black hover:bg-white/90 disabled:bg-[#141414] disabled:text-[#A0A0A0] disabled:border disabled:border-[#232323] flex items-center gap-2"
            >
              <Stars className="w-4 h-4" />
              Confirm Return
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReturnBookButton;
