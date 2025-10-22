import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, loading } = authContext;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181024] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
