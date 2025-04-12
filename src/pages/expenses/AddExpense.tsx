import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { crops, incomes, expenses } = useData();

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalProfit = totalIncome - totalExpenses;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-400">Dashboard</h1>
      <p className="text-lg text-muted-foreground">Welcome back, samarthpv69!</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹{totalProfit}</p>
            <p className="text-muted-foreground">Financial summary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹{totalIncome}</p>
            <p className="text-muted-foreground">{incomes.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹{totalExpenses}</p>
            <p className="text-muted-foreground">{expenses.length} transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Crops and Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>🌱 Active Crops</CardTitle>
              <Button size="sm" variant="outline" onClick={() => navigate("/crops")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {crops.length === 0 ? (
              <div className="text-center space-y-2">
                <p>No crops added yet</p>
                <Button onClick={() => navigate("/crops/add")}>Add New Crop</Button>
              </div>
            ) : (
              <ul className="list-disc pl-4">
                {crops.slice(0, 3).map((crop) => (
                  <li key={crop.id}>
                    {crop.name} ({crop.area} {crop.areaUnit})
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>💰 Recent Transactions</CardTitle>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => navigate("/expenses/add")}>
                  Expenses
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate("/income/add")}>
                  Income
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 && incomes.length === 0 ? (
              <div className="text-center space-y-2">
                <p>No transactions yet</p>
                <div className="flex justify-center gap-2">
                  <Button onClick={() => navigate("/expenses/add")}>Add Expense</Button>
                  <Button variant="outline" onClick={() => navigate("/income/add")}>
                    Add Income
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="list-disc pl-4">
                {[...expenses.map(e => ({ ...e, type: "Expense" })), ...incomes.map(i => ({ ...i, type: "Income" }))]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((txn, idx) => (
                    <li key={idx}>
                      {txn.type} - ₹{txn.amount} on {new Date(txn.date).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
