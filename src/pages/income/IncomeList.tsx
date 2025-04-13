import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Income {
  id: number;
  date: string;
  source: string;
  amount: number;
}

const fetchIncomes = async (): Promise<Income[]> => {
  // Replace this with real API call when ready
  return Promise.resolve([
    { id: 1, date: "2025-04-10", source: "Crop Sale", amount: 5000 },
    { id: 2, date: "2025-04-11", source: "Government Grant", amount: 3000 },
  ]);
};

const IncomeList: React.FC = () => {
  const { data: incomes, isLoading, isError } = useQuery({
    queryKey: ["incomes"],
    queryFn: fetchIncomes,
  });

  if (isLoading) return <div className="p-4">Loading income data...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading incomes.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Income Entries</h2>
      {incomes && incomes.length === 0 ? (
        <p>No income entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border">Date</th>
                <th className="text-left py-2 px-4 border">Source</th>
                <th className="text-left py-2 px-4 border">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {incomes?.map((income) => (
                <tr key={income.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border">{income.date}</td>
                  <td className="py-2 px-4 border">{income.source}</td>
                  <td className="py-2 px-4 border">₹{income.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeList;
