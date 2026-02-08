import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import GeoMap from "./pages/GeoMap";
import { useAuth } from "./hooks/use-auth";
import { AuthProvider } from "./contexts/authProvider";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen w-full">
      <main className="">{children}</main>
    </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/geomap" replace /> : <Login />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/geomap" : "/login"} replace />} />
      <Route path="/geomap" element={<ProtectedRoute><Layout><GeoMap /></Layout></ProtectedRoute>} />
    </Routes>
  );
};

const App = () => (
    <div className="w-screen">
      <BrowserRouter>
      <Toaster />
      <Sonner />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
);

export default App;
