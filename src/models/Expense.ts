export interface Expense {
  id: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
  date: Date;
  cropId?: string;
  createdAt: Date;
  updatedAt: Date;
}
