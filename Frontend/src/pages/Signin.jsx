import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI, adminAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const api = isAdmin ? adminAPI : userAPI;
      const response = await api.signin(formData);
      
      const token = response.data.token;
      const userData = {
        email: formData.email,
      };
      
      login(token, userData, isAdmin ? 'admin' : 'user');
      
      // Navigate based on user type
      if (isAdmin) {
        navigate('/admin/courses');
      } else {
        navigate('/courses');
      }
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container fade-in">
          <div className="auth-card card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your learning journey</p>
            </div>

            <div className="user-type-toggle">
              <button
                className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
                onClick={() => setIsAdmin(false)}
                type="button"
              >
                Student
              </button>
              <button
                className={`toggle-btn ${isAdmin ? 'active' : ''}`}
                onClick={() => setIsAdmin(true)}
                type="button"
              >
                Instructor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
