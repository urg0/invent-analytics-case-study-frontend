export interface BorrowHistory {
  id: number;
  borrowedAt: string;
  returnedAt?: string;
  rating?: number;
  user: {
    id: number;
    name: string;
  };
}

export interface BorrowResponse {
  message: string;
}

export interface ReturnBookRequest {
  score: number;
}
