import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI, adminAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, LayoutDashboard, UserPlus, AlertCircle, ArrowRight } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
      const response = await api.signup(formData);
      
      alert(response.data.message || 'Signup successful! Please sign in.');
      navigate('/signin');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container fade-in">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <UserPlus size={28} />
            </div>
            <h2>Create Account</h2>
            <p>Join CourseHub and start your learning journey</p>
          </div>

          <div className="user-type-toggle">
            <button
              className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(false)}
              type="button"
            >
              <User size={16} /> Student
            </button>
            <button
              className={`toggle-btn ${isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(true)}
              type="button"
            >
              <LayoutDashboard size={16} /> Instructor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <User size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <User size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Mail size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <Lock size={18} className="input-icon" style={{ left: '12px', position: 'absolute' }} />
              </div>
              <small className="form-hint">
                Must be at least 6 characters with 1 uppercase letter
              </small>
            </div>

            {error && (
              <div className="form-error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : (
                <>Sign Up <ArrowRight size={18} style={{ marginLeft: '8px' }} /></>
              )}
            </button>
          </form>

          <footer className="auth-footer">
            Already have an account? <Link to="/signin">Sign In</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Signup;
