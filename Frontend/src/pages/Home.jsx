import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers, Trophy, Users, CheckCircle, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggeredChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-glow"></div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="hero-badge">
              <Zap size={16} />
              <span>New improved learning experience</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              Master Your Future with CourseHub
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-subtitle">
              Unlock access to 500+ premium courses taught by industry experts. 
              Elevate your skills in coding, design, business, and more.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/signup" className="btn btn-primary">
                    Get Started Free <ArrowRight size={18} />
                  </Link>
                  <Link to="/courses" className="btn btn-outline">
                    Explore Courses
                  </Link>
                </>
              ) : isAdmin ? (
                <>
                  <Link to="/admin/create" className="btn btn-primary">
                    Create Course <ArrowRight size={18} />
                  </Link>
                  <Link to="/admin/courses" className="btn btn-outline">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/courses" className="btn btn-primary">
                    Browse Catalog <ArrowRight size={18} />
                  </Link>
                  <Link to="/my-courses" className="btn btn-outline">
                    My Learning
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Expert Mentors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1.2k</span>
              <span className="stat-label">Courses Live</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center md:max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CourseHub?</h2>
            <p className="text-secondary">We provide a premium learning experience designed to help you succeed in your career.</p>
          </div>
          
          <div className="features-grid">
            {[
              { 
                icon: <BookOpen size={24} />, 
                title: 'Expert-Led Courses', 
                desc: 'Learn from industry professionals who have real-world experience in their fields.' 
              },
              { 
                icon: <Layers size={24} />, 
                title: 'Structured Learning', 
                desc: 'Follow carefully curiculated learning paths to master new skills step-by-step.' 
              },
              { 
                icon: <Trophy size={24} />, 
                title: 'Recognized Certificates', 
                desc: 'Earn certificates upon completion to showcase your skills to employers.' 
              },
              { 
                icon: <Users size={24} />, 
                title: 'Community Support', 
                desc: 'Join a global community of learners and get help when you need it.' 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="feature-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <motion.div 
          className="cta-wrapper"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-secondary mb-8">
              Join thousands of students who are already learning on CourseHub. 
              Get started today for free.
            </p>
            {!isAuthenticated && (
              <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                Join for Free
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
