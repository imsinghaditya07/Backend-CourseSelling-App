import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          CourseHub
        </Link>
        
        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/courses" className="nav-link">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </li>
            </>
          ) : isAdmin ? (
            <>
              <li>
                <Link to="/admin/courses" className="nav-link">
                  My Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/create" className="nav-link">
                  Create Course
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/courses" className="nav-link">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/my-courses" className="nav-link">
                  My Courses
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
