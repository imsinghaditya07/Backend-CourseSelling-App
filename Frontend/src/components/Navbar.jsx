import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, LogOut, Menu, X, Rocket, LayoutDashboard, Database, User, Video, GraduationCap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/courses?search=${searchQuery}`);
    }
  };

  const navLinks = [
    { name: 'Courses', path: '/courses' },
    { name: 'Mentors', path: '/mentors', disabled: true },
    { name: 'Pricing', path: '/pricing', disabled: true },
    { name: 'About', path: '/about', disabled: true }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <GraduationCap size={20} fill="white" />
          </div>
          <span>EduMaster</span>
        </Link>
        
        {/* Search Bar (Desktop) */}
        <div className="navbar-search hidden lg:flex">
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-nav hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.disabled ? '#' : link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''} ${link.disabled ? 'text-disabled cursor-not-allowed' : ''}`}
                onClick={(e) => link.disabled && e.preventDefault()}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Actions */}
        <div className="navbar-actions hidden md:flex">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="btn btn-ghost font-medium">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
            </>
          ) : (
            <div className="user-menu">
              {isAdmin && (
                <Link to="/admin/courses" className="btn btn-ghost" title="Dashboard">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <div className="user-avatar" title={user?.username || 'User'}>
                <User size={20} />
              </div>
              <button onClick={handleLogout} className="btn btn-ghost p-2" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="navbar-search flex w-full mb-4">
                <Search size={18} className="text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.disabled ? '#' : link.path} 
                  className="nav-link py-2 border-b border-gray-100"
                  onClick={() => !link.disabled && setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 mt-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/signin" className="btn btn-secondary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                      Log in
                    </Link>
                    <Link to="/signup" className="btn btn-primary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="btn btn-secondary w-full justify-center">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
