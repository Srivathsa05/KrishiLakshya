<<<<<<< HEAD

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
=======
// src/App.tsx

>>>>>>> cb1edf371b22684d25bc05aeefb3a3b3e5bdae30
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
<<<<<<< HEAD
=======
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Layout and Pages
>>>>>>> cb1edf371b22684d25bc05aeefb3a3b3e5bdae30
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/crops/AddCrop";
<<<<<<< HEAD
import AddExpense from "./pages/expenses/AddExpense"; 
import AddIncome from "./pages/income/AddIncome"; 

=======
import AddExpense from "./pages/expenses/AddExpense";
import Expenses from "./pages/expenses/Expenses";
import AddIncome from "./pages/income/AddIncome";
import IncomeList from "./pages/income/IncomeList";
import ProfitLoss from "./pages/reports/ProfitLoss";
>>>>>>> cb1edf371b22684d25bc05aeefb3a3b3e5bdae30
import NotFound from "./pages/NotFound";

// React Query client instance
const queryClient = new QueryClient();

<<<<<<< HEAD
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crops/add" element={<AddCrop />} />
                <Route path="/expenses/add" element={<AddExpense />} />
                <Route path="/income/add" element={<AddIncome />} />
              </Route>
=======
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
>>>>>>> cb1edf371b22684d25bc05aeefb3a3b3e5bdae30

                {/* Protected Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/crops/add" element={<AddCrop />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/expenses/add" element={<AddExpense />} />
                  <Route path="/income" element={<IncomeList />} />
                  <Route path="/income/add" element={<AddIncome />} />
                  <Route path="/reports/profit-loss" element={<ProfitLoss />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};


export default App;
