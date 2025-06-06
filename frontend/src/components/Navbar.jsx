import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-lg font-medium rounded-md px-3 py-1 ${
      isActive(path) ? "text-black" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-black hover:text-gray-800"
        >
          JobHunt
        </Link>

        {/* Main Navigation */}
        {!loading && (
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>

            <Link to="/jobs" className={linkClass("/jobs")}>
              Find Jobs
            </Link>

            {user?.role === "job_seeker" && (
              <>
                <Link
                  to="/applicant/profile"
                  className={linkClass("/applicant/profile")}
                >
                  My Profile
                </Link>
                <Link
                  to="/applicant/applied-jobs"
                  className={linkClass("/applicant/applied-jobs")}
                >
                  Applied Jobs
                </Link>
              </>
            )}

            {user?.role === "employer" && (
              <>
                <Link
                  to="/employer/profile"
                  className={linkClass("/employer/profile")}
                >
                  My Profile
                </Link>
                <Link
                  to="/employer/create-job"
                  className={linkClass("/employer/create-job")}
                >
                  Create New Job
                </Link>
                <Link
                  to="/employer/created-jobs"
                  className={linkClass("/employer/created-jobs")}
                >
                  Created Jobs
                </Link>
                <Link
                  to="/employer/applications"
                  className={linkClass("/employer/applications")}
                >
                  View Applications
                </Link>
              </>
            )}
          </div>
        )}

        {/* Auth Buttons */}
        {!loading && (
          <div className="hidden md:flex gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register/applicant"
                  className="border border-black text-black bg-white text-sm px-4 py-2 rounded-md hover:bg-black hover:text-white"
                >
                  Applicant
                </Link>
                <Link
                  to="/register/employer"
                  className="border border-black text-black bg-white text-sm px-4 py-2 rounded-md hover:bg-black hover:text-white"
                >
                  Employer
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
