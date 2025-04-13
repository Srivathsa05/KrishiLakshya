import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Financial Summary",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#16a34a", "#dc2626"], // Green and Red
        borderColor: ["#15803d", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profit & Loss Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div>Total Income: ₹{totalIncome.toFixed(2)}</div>
          <div>Total Expenses: ₹{totalExpense.toFixed(2)}</div>
          <div className={`font-semibold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
            {profit >= 0 ? "Profit" : "Loss"}: ₹{Math.abs(profit).toFixed(2)}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
