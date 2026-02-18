import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { userAPI } from '../utils/api';
import CourseCard from '../components/CourseCard';
import { ArrowRight, Play, Users, Clock, Award, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await userAPI.getAllCourses();
      setCourses(response.data.courses?.slice(0, 3) || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureCards = [
    {
      icon: <Users size={24} />,
      title: "Expert Instructors",
      description: "Learn from top industry professionals with years of real-world experience."
    },
    {
      icon: <Clock size={24} />,
      title: "Lifetime Access",
      description: "Once you buy a course, it's yours forever. Learn at your own pace."
    },
    {
      icon: <Award size={24} />,
      title: "Mentor Support",
      description: "Get your questions answered directly by our expert teaching assistants."
    }
  ];

  const testimonials = [
    {
      name: "Jessica Williams",
      role: "UX Designer",
      quote: "EduMaster literally changed my career path. The UI/UX Masterclass gave me the portfolio I needed to land my dream job.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "David Chen",
      role: "Full Stack Developer",
      quote: "The web development bootcamp is hands down the best investment I've made. The practical approach is what sets it apart.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Sarah Miller",
      role: "Product Manager",
      quote: "I learned more in 4 weeks here than I did in 6 months of self-study. The structured curriculum is a game changer.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <motion.div 
              className="hero-text text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="badge badge-secondary mb-4 inline-block">
                New: AI Workshop Available
              </div>
              <h1>
                Master New Skills with <br />
                <span>Industry Experts</span>
              </h1>
              <p>
                Learn from the world's best instructors with lifetime access and dedicated mentor support. Join over 50,000 students achieving their dreams.
              </p>
              <div className="hero-actions">
                <Link to="/courses" className="btn btn-primary">
                  Browse Courses <ArrowRight size={18} />
                </Link>
                <button className="btn btn-outline bg-white">
                  <Play size={18} fill="currentColor" /> Watch Demo
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="hero-image-container"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
                alt="Students learning" 
                className="hero-image"
              />
              <motion.div 
                className="hero-stats-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-xs text-secondary uppercase font-bold">Top Rated</div>
                  <div className="text-sm font-semibold text-primary">UX Design Specialization</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Advantage</span>
            <h2 className="section-title">Why Choose Our Platform?</h2>
          </div>
          
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featureCards.map((card, index) => (
              <motion.div key={index} className="feature-card" variants={fadeInUp}>
                <div className="feature-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="courses-section">
        <div className="container">
          <div className="courses-header">
            <div>
              <span className="section-subtitle">Course Catalog</span>
              <h2 className="section-title">Featured Courses</h2>
            </div>
            <div className="hidden md:block">
               <Link to="/courses" className="btn btn-outline">View All Courses <ArrowRight size={16} /></Link>
            </div>
          </div>

          {loading ? (
             <div className="flex-center p-12"><div className="spinner"></div></div>
          ) : (
            <div className="home-courses-grid">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
          
          <div className="md:hidden mt-8 text-center">
            <Link to="/courses" className="btn btn-outline w-full justify-center">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
             <span className="section-subtitle">Student Stories</span>
             <h2 className="section-title">Success Speaks for Itself</h2>
          </div>
          
          <div className="features-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={t.image} alt={t.name} className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="stars">
                   {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to start your learning journey?</h2>
          <p>Join thousands of professionals leveling up their careers every day with EduMaster.</p>
          <div className="cta-actions">
             <Link to="/signup" className="btn btn-white">Join for Free</Link>
             <Link to="/courses" className="btn btn-blue-outline">View Pricing</Link>
          </div>
        </div>
      </section>

       {/* Footer */}
       <footer className="footer">
         <div className="container">
           <div className="footer-grid">
             <div className="footer-brand">
               <h3 className="text-primary font-bold text-xl flex items-center gap-2">
                 <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">
                   <Play size={16} fill="white" />
                 </div>
                 EduMaster
               </h3>
               <p>Empowering learners worldwide with affordable, high-quality education from the industry's best experts.</p>
             </div>
             
             <div className="footer-col">
               <h4>Explore</h4>
               <ul className="footer-links">
                 <li><Link to="/courses">Courses</Link></li>
                 <li><Link to="/mentors">Mentors</Link></li>
                 <li><Link to="/pricing">Pricing</Link></li>
               </ul>
             </div>
             
             <div className="footer-col">
               <h4>Company</h4>
               <ul className="footer-links">
                 <li><Link to="/about">About Us</Link></li>
                 <li><Link to="/careers">Careers</Link></li>
                 <li><Link to="/press">Press</Link></li>
               </ul>
             </div>
             
             <div className="footer-col">
               <h4>Support</h4>
               <ul className="footer-links">
                 <li><Link to="/help">Help Center</Link></li>
                 <li><Link to="/terms">Terms of Service</Link></li>
                 <li><Link to="/privacy">Privacy Policy</Link></li>
               </ul>
             </div>
           </div>
           
           <div className="footer-bottom">
             <p>&copy; 2024 EduMaster Online Learning. All rights reserved.</p>
             <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                  <span className="sr-only">Twitter</span>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
             </div>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default Home;
