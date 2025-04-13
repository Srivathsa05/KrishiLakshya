export interface Expense {
  id: string;
  userId: string;
  type: "seed" | "fertilizer" | "pesticide" | "labor" | "equipment" | "others";
  category: string;
  amount: number;
  description: string;
  date: Date;
  note?: string;
  cropId?: string;
  createdAt: Date;
  updatedAt: Date;
}
