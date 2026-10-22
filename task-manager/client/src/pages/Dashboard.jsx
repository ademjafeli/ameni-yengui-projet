import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    const formattedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Recently";

    return (
        <div className="main-content">
            <div className="dashboard-container">
                {/* User Profile Welcome Card */}
                <div className="welcome-card">
                    <div>
                        <h2>Hello, {user?.name} 👋</h2>
                        <p>{user?.email} • Member since {formattedDate}</p>
                    </div>
                    <span className="badge-active">● Authenticated</span>
                </div>

                {/* Tasks Section Placeholder */}
                <div className="tasks-placeholder-card">
                    <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📋</div>
                    <h3>Task Management Space</h3>
                    <p style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
                        Your authentication system is completely wired and verified! Each user has their own private space.
                        In our next milestone, we will build task creation, category filters, and task completion.
                    </p>
                    <button onClick={logout} className="btn-logout" style={{ padding: "10px 24px" }}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
