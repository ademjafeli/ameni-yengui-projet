import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // 1. While checking if token exists in localStorage, show loading
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Checking authentication...</p>
            </div>
        );
    }

    // 2. If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. User is authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
