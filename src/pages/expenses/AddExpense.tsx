import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ExpenseType = "seed" | "fertilizer" | "pesticide" | "labor" | "equipment" | "others";

interface ExpenseFormData {
  amount: string;
  category: string;
  type: ExpenseType;
  description: string;
  date: string; // still string for the form
  note?: string;
}

const AddExpense: React.FC = () => {
  const navigate = useNavigate();
  const { addExpense } = useData();

  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: "",
    category: "",
    type: "others",
    description: "",
    date: new Date().toISOString().split("T")[0], // e.g., "2025-04-13"
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      description: formData.description,
      date: new Date(formData.date), // ✅ convert string to Date object
      note: formData.note || "",
    };

    await addExpense(newExpense);
    navigate("/expenses");
  };

  return (
    <div className="p-6">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                required
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Fertilizer A"
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="seed">Seed</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="pesticide">Pesticide</option>
                <option value="labor">Labor</option>
                <option value="equipment">Equipment</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between">
              <Button type="submit">Add Expense</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/expenses")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpense;
