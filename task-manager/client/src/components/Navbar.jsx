import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to={user ? "/dashboard" : "/login"} className="nav-brand">
                    <span className="brand-badge">TM</span>
                    <span>TaskFlow</span>
                </Link>

                <div className="nav-actions">
                    {user ? (
                        <div className="nav-user">
                            <span className="user-tag">👤 {user.name}</span>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
