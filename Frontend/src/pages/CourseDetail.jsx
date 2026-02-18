import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../utils/api';
import { 
  Play, Star, Clock, Globe, Award, CheckCircle, 
  Share2, Gift, Tag, Video, Download, User, Smartphone 
} from 'lucide-react';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      // In a real app, we'd have a getCourseById endpoint
      // For now, fetching all and finding one, or using a mock
      const response = await userAPI.getAllCourses();
      const foundCourse = response.data.courses?.find(c => c._id === id);
      setCourse(foundCourse || null);
    } catch (err) {
      console.error('Failed to load course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex-center h-screen"><div className="spinner"></div></div>;
  if (!course) return <div className="flex-center h-screen">Course not found</div>;

  // Mock data to enrich the UI since backend model is simple
  const features = [
    { icon: <Video size={18} />, text: "42 hours on-demand video" },
    { icon: <Download size={18} />, text: "25 downloadable resources" },
    { icon: <Clock size={18} />, text: "Full lifetime access" },
    { icon: <Smartphone size={18} />, text: "Access on mobile and TV" },
    { icon: <Award size={18} />, text: "Certificate of completion" },
  ];

  const curriculum = [
    { title: "Introduction to Modern Web Stack", lectures: 5, duration: "45 min" },
    { title: "Advanced React Patterns", lectures: 12, duration: "3h 20m" },
    { title: "Backend Systems Architecture", lectures: 18, duration: "5h 45m" },
    { title: "Database Modeling with MongoDB", lectures: 8, duration: "2h 15m" },
  ];

  return (
    <div className="course-detail-page js-course-detail">
      <div className="container">
        {/* Header / Breadcrumbs */}
        <div className="course-detail-header">
          <div className="breadcrumbs">
            <a href="/">Home</a> / <a href="/courses">Courses</a> / <span>{course.title}</span>
          </div>
          <h1 className="course-title">{course.title}</h1>
          <p className="course-subtitle">{course.description}</p>
          
          <div className="course-meta-header">
             <div className="flex items-center gap-1 text-yellow-500 font-bold">
               <span className="bg-yellow-100 px-2 py-0.5 rounded text-xs uppercase mr-2">{course.rating || '4.8'}</span>
               <div className="flex"><Star size={16} fill="currentColor" /></div>
             </div>
             <div className="flex items-center gap-1">
               <User size={16} /> <span>154,230 students enrolled</span>
             </div>
             <div className="flex items-center gap-1">
               <Globe size={16} /> <span>English</span>
             </div>
             <div className="flex items-center gap-1">
               <Clock size={16} /> <span>Last updated 12/2025</span>
             </div>
          </div>
        </div>

        <div className="course-layout">
           {/* Main Content (Left) */}
           <div className="course-main">
             
             {/* Video Player */}
             <div className="video-container">
               <div className="video-placeholder">
                 <div className="play-button">
                   <Play size={32} fill="white" />
                 </div>
                 <p className="font-bold">Preview this course</p>
               </div>
             </div>

             {/* Tabs */}
             <div className="course-tabs">
               <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
               >
                 Overview
               </button>
               <button 
                className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveTab('curriculum')}
               >
                 Curriculum
               </button>
               <button 
                className={`tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructor')}
               >
                 Instructor
               </button>
               <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
               >
                 Reviews
               </button>
             </div>

             {/* Tab Content: Overview */}
             {activeTab === 'overview' && (
               <div className="content-section">
                  <h3 className="section-title">What you'll learn</h3>
                  <div className="learn-list">
                    {[
                      "Build full-stack web applications from scratch",
                      "Master React, Node.js, and Modern JS",
                      "Design RESTful APIs with Express",
                      "Deploy applications to cloud platforms",
                      "Implement authentication and security",
                      "Database design with MongoDB"
                    ].map((item, i) => (
                      <div key={i} className="learn-item">
                        <CheckCircle size={18} className="text-secondary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {/* Tab Content: Curriculum */}
             {activeTab === 'curriculum' && (
               <div className="content-section">
                 <h3 className="section-title">Course Content</h3>
                 <div className="text-sm text-secondary mb-4">24 sections • 218 lectures • 42h 15m total length</div>
                 
                 <div className="curriculum-list">
                   {curriculum.map((section, idx) => (
                     <div key={idx} className="accordion-item">
                       <div className="accordion-header">
                         <span>Module {idx + 1}: {section.title}</span>
                         <span className="text-sm font-normal text-secondary">{section.lectures} lectures • {section.duration}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
             
             {/* Tab Content: Instructor */}
             {activeTab === 'instructor' && (
                <div className="content-section">
                  <h3 className="section-title">Instructor</h3>
                  <div className="flex gap-4 items-start">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor" className="w-24 h-24 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-1">Alex Rivera</h4>
                      <p className="text-secondary mb-2">Senior Software Architect</p>
                      <div className="flex gap-4 text-sm text-secondary mb-4">
                        <span className="flex gap-1 items-center"><Star size={14} fill="currentColor" color="#F59E0B" /> 4.8 Rating</span>
                        <span className="flex gap-1 items-center"><User size={14} /> 450,000+ Students</span>
                        <span className="flex gap-1 items-center"><Play size={14} /> 12 Courses</span>
                      </div>
                      <p className="text-sm leading-relaxed text-secondary">
                        Alex is a full-stack developer with over 15 years of experience in Silicon Valley. 
                        Having worked at companies like Google and Meta, he specializes in building large-scale distributed systems.
                      </p>
                    </div>
                  </div>
                </div>
             )}

           </div>

           {/* Sidebar (Right) */}
           <div className="course-sidebar">
             <div className="enrollment-card">
               <div className="price-box">
                 <span className="current-price">${course.price}</span>
                 <span className="original-price">${(course.price * 1.5).toFixed(2)}</span>
                 <span className="discount">33% off</span>
               </div>
               
               <p className="text-red-500 text-sm font-semibold mb-4 flex items-center gap-1">
                 <Clock size={14} /> 2 days left at this price!
               </p>

               <div className="flex flex-col gap-3 mb-6">
                 <button className="btn btn-primary w-full justify-center text-lg py-3" onClick={() => navigate(`/checkout/${course._id}`)}>
                   Add to Cart
                 </button>
                 <button className="btn btn-secondary w-full justify-center text-lg py-3">
                   Buy Now
                 </button>
               </div>
               
               <p className="guarantee">30-Day Money-Back Guarantee</p>

               <div className="features-list">
                 <h4 className="font-bold text-sm text-primary mb-2">This course includes:</h4>
                 {features.map((feature, i) => (
                   <div key={i} className="feature-item">
                     {feature.icon} <span>{feature.text}</span>
                   </div>
                 ))}
               </div>

               <div className="flex justify-between border-t border-gray-100 pt-4 mt-2">
                 <button className="text-sm text-secondary hover:text-primary font-medium flex items-center gap-1 underline">Share</button>
                 <button className="text-sm text-secondary hover:text-primary font-medium flex items-center gap-1 underline">Gift Course</button>
                 <button className="text-sm text-secondary hover:text-primary font-medium flex items-center gap-1 underline">Coupon</button>
               </div>
             </div>
             
             <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
               <h4 className="font-bold text-primary mb-2 uppercase text-xs tracking-wider">For Business</h4>
               <p className="text-sm font-bold mb-1">Training for your team?</p>
               <p className="text-xs text-secondary mb-3">Get access to 25,000+ top courses anytime.</p>
               <button className="btn btn-outline w-full text-sm justify-center py-2">Try EduPlatform Business</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
