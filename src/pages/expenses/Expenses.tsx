import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Expenses: React.FC = () => {
  const { expenses } = useData();
  const navigate = useNavigate();

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-600">Expenses</h1>
        <Button onClick={() => navigate("/expenses/add")}>+ Add Expense</Button>
      </div>

      {sortedExpenses.length === 0 ? (
        <p className="text-gray-600">No expenses recorded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedExpenses.map((expense) => (
            <Card key={expense.id}>
              <CardHeader>
                <CardTitle className="text-base text-gray-800">
                  ₹{expense.amount.toFixed(2)} — {expense.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Type:</strong> {expense.type}
                </p>
                <p>
                  <strong>Description:</strong> {expense.description}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString("en-IN")}
                </p>
                {expense.note && (
                  <p>
                    <strong>Note:</strong> {expense.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
