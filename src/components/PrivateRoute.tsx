
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  element: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute = ({ element, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required, check if the user has that role
  if (requiredRole && user && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
