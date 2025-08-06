import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ImportData from "./pages/dashboard/ImportData";
import ViewData from "./pages/dashboard/ViewData";
import SaveData from "./pages/dashboard/SaveData";
import ViewSummary from "./pages/dashboard/ViewSummary";
import Account from "./pages/dashboard/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="import" element={
                <ProtectedRoute requiredPermission="import">
                  <ImportData />
                </ProtectedRoute>
              } />
              <Route path="data" element={
                <ProtectedRoute requiredPermission="view">
                  <ViewData />
                </ProtectedRoute>
              } />
              <Route path="save" element={
                <ProtectedRoute requiredPermission="save">
                  <SaveData />
                </ProtectedRoute>
              } />
              <Route path="summary" element={
                <ProtectedRoute requiredPermission="summary">
                  <ViewSummary />
                </ProtectedRoute>
              } />
              <Route path="account" element={<Account />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
