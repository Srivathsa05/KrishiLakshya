import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Layout and Pages
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/crops/AddCrop";
import Crops from "./pages/crops/Crops";
import AddExpense from "./pages/expenses/AddExpense";
import Expenses from "./pages/expenses/Expenses";
import AddIncome from "./pages/income/AddIncome";
import IncomeList from "./pages/income/IncomeList";
import ProfitLoss from "./pages/reports/ProfitLoss";
import ReportsLayout from "./pages/reports/ReportsLayout"; // ✅ Import
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Profile from "./pages/profile/profile";

const queryClient = new QueryClient();

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

                {/* Protected Layout */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="crops" element={<Crops />} />
                  <Route path="crops/add" element={<AddCrop />} />
                  <Route path="expenses" element={<Expenses />} />
                  <Route path="expenses/add" element={<AddExpense />} />
                  <Route path="income" element={<IncomeList />} />
                  <Route path="income/add" element={<AddIncome />} />
                  <Route path="profile" element={<Profile/>} />
                  {/* ✅ Reports with nested layout */}
                  <Route path="reports" element={<ReportsLayout />}>
                    <Route index element={<ProfitLoss />} />
                  </Route>
                </Route>

                {/* 404 Catch-all */}
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
