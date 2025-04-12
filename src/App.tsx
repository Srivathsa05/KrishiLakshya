import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Layout from "./components/Layout";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/crops/AddCrop";
import AddExpense from "./pages/expenses/AddExpense";
import Expenses from "./pages/expenses/Expenses";

import AddIncome from "./pages/income/AddIncome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
                <Route path="/expenses" element={<Expenses />} /> {/* ✅ added */}
                <Route path="/expenses/add" element={<AddExpense />} />
                <Route path="/income/add" element={<AddIncome />} />
                {/* Add more routes as needed */}
              </Route>

{">"}{">"}{">"}{">"}{">"}{">"}{">"} a5024703c699f51fe5d84806fe4b7577a6da1a26
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
