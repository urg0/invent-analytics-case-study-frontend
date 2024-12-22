import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook, returnBook } from "../borrow.service";
import { useToast } from "@components/ui/use-toast";

export const useBorrowBook = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ userId, bookId }: { userId: string; bookId: number }) =>
      borrowBook(userId, bookId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast({
        title: "Success",
        description: "Book borrowed successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      console.log("error ", error);
      toast({
        title: "Error",
        description: "Book is already borrowed!",
        variant: "destructive",
      });
    },
  });
};

export const useReturnBook = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      userId,
      bookId,
      score,
    }: {
      userId: number | string;
      bookId: number;
      score: number;
    }) => returnBook(userId, bookId, score),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast({
        title: "Success",
        description: "Book returned successfully. Thank you for rating!",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      console.log("error ", error);
      toast({
        title: "Error",
        description: error.message || "Failed to return book",
        variant: "destructive",
      });
    },
  });
};
