import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when the user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Client-side validations
        if (!name || !email || !password || !confirmPassword) {
            return setError("All fields are required");
        }

        if (password.length < 8) {
            return setError("Password must be at least 8 characters long");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);
            await register(name, email, password);
            // Redirect to login page with a success message
            navigate("/login", {
                state: { message: "Account created successfully! Please log in." },
            });
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
                    <h2>Create Account</h2>
                    <p>Start managing your personal tasks today</p>
                </div>

                {error && <div className="alert-error">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="e.g. Adem Smith"
                            required
                        />
                    </div>

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
                            placeholder="Min. 8 characters"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
