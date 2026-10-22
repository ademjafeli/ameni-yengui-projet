import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Check if a saved token exists when the app loads
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    // Token is expired or invalid, remove it
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to restore session:", error);
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    // Login action
    const login = async (email, password) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    // Register action
    const register = async (name, email, password) => {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        return data;
    };

    // Logout action
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for convenient access
export const useAuth = () => {
    return useContext(AuthContext);
};
