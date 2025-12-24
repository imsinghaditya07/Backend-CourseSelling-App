import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAdmin(userType === 'admin');
    }
    setLoading(false);
  }, []);

  const login = (token, userData, userType = 'user') => {
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userType', userType);
    setUser(userData);
    setIsAdmin(userType === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
