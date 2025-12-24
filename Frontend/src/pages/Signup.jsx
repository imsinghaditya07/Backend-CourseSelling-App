import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI, adminAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
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
      <div className="container">
        <div className="auth-container fade-in">
          <div className="auth-card card">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Join CourseHub and start your learning journey</p>
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
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                  placeholder="Min 6 characters, 1 uppercase"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <small className="form-hint">
                  Must be at least 6 characters with 1 uppercase letter
                </small>
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-footer">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
