import React from "react";
import { useQuery } from "@tanstack/react-query";

type Income = { id: number; amount: number };
type Expense = { id: number; amount: number };

const fetchIncomes = async (): Promise<Income[]> => {
  const res = await fetch("/api/incomes");
  if (!res.ok) throw new Error("Failed to fetch incomes");
  return res.json();
};

const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("/api/expenses");
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
};

const ProfitLoss = () => {
  const {
    data: incomes,
    isLoading: incomesLoading,
    isError: incomesError,
  } = useQuery<Income[]>({
    queryKey: ["incomes"],
    queryFn: fetchIncomes,
  });

  const {
    data: expenses,
    isLoading: expensesLoading,
    isError: expensesError,
  } = useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  if (incomesLoading || expensesLoading) return <div className="p-6">Loading report...</div>;

  if (incomesError || expensesError)
    return <div className="p-6 text-red-600">Error loading report data.</div>;

  const totalIncome = incomes?.reduce((sum, income) => sum + income.amount, 0) ?? 0;
  const totalExpense = expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const profit = totalIncome - totalExpense;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profit & Loss Report</h1>
      <div className="space-y-2">
        <div>Total Income: ₹{totalIncome.toFixed(2)}</div>
        <div>Total Expenses: ₹{totalExpense.toFixed(2)}</div>
        <div className={`font-semibold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
          {profit >= 0 ? "Profit" : "Loss"}: ₹{Math.abs(profit).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
