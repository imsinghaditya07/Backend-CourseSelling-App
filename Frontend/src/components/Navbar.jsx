import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, LogOut, Menu, X, Rocket, LayoutDashboard, Database, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Browse Courses', path: '/courses', icon: <BookOpen size={18} /> },
    ...(isAuthenticated && !isAdmin ? [
      { name: 'My Learning', path: '/my-courses', icon: <Rocket size={18} /> }
    ] : []),
    ...(isAdmin ? [
      { name: 'Dashboard', path: '/admin/courses', icon: <LayoutDashboard size={18} /> },
      { name: 'Create Course', path: '/admin/create', icon: <Database size={18} /> }
    ] : [])
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="brand">
            <div className="brand-icon">
              <BookOpen size={24} />
            </div>
            <span className="brand-text">CourseHub</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links hidden md:flex">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions hidden md:flex">
            {!isAuthenticated ? (
              <>
                <Link to="/signin" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started <Rocket size={16} />
                </Link>
              </>
            ) : (
              <div className="user-menu">
                <div className="user-avatar" title={user?.username || 'User'}>
                  <User size={20} color="white" />
                </div>
                <button onClick={handleLogout} className="btn btn-ghost" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu md:hidden"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: 'rgba(13, 13, 22, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
              {!isAuthenticated ? (
                <>
                  <li><Link to="/signin" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white' }}>Sign In</Link></li>
                  <li><Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full">Get Started</Link></li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout} className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', padding: 0 }}>
                    <LogOut size={18} style={{ marginRight: '10px' }} /> Logout
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
