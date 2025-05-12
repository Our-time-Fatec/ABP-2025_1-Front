import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'; 
import { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
