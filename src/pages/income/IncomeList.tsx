import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Income {
  id: number;
  date: string;
  source: string;
  amount: number;
}

// Dummy fetch function — replace with your API call later
const fetchIncomes = async (): Promise<Income[]> => {
  return Promise.resolve([
    { id: 1, date: "2025-04-10", source: "Crop Sale", amount: 5000 },
    { id: 2, date: "2025-04-11", source: "Government Grant", amount: 3000 },
  ]);
};

const IncomeList: React.FC = () => {
  const {
    data: incomes,
    isLoading,
    isError,
  } = useQuery<Income[]>({
    queryKey: ["incomes"],
    queryFn: fetchIncomes,
  });

  if (isLoading) return <div>Loading income data...</div>;
  if (isError) return <div>Error loading incomes.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Income Entries</h2>
      {incomes && incomes.length === 0 ? (
        <p>No income entries found.</p>
      ) : (
        <table className="w-full border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Source</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {incomes?.map((income) => (
              <tr key={income.id} className="border-t">
                <td className="py-2 px-4">{income.date}</td>
                <td className="py-2 px-4">{income.source}</td>
                <td className="py-2 px-4">₹{income.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomeList;
