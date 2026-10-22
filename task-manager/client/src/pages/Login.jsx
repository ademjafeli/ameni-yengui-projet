import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If redirected from successful registration, show success message
    const successMessage = location.state?.message;

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when the user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError("Please provide email and password");
        }

        try {
            setLoading(true);
            await login(email, password);
            // Redirect to private dashboard upon successful login
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your personal tasks</p>
                </div>

                {successMessage && <div className="alert-success">✓ {successMessage}</div>}
                {error && <div className="alert-error">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="adem@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
