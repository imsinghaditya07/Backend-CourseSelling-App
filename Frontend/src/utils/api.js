import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// User API
export const userAPI = {
    signup: (data) => api.post('/user/signup', data),
    signin: (data) => api.post('/user/signin', data),
    getPurchases: () => api.get('/user/purchases'),
};

// Admin API
export const adminAPI = {
    signup: (data) => api.post('/admin/signup', data),
    signin: (data) => api.post('/admin/signin', data),
    createCourse: (data) => api.post('/admin/course', data),
    updateCourse: (data) => api.put('/admin/course', data),
    getCourses: () => api.get('/admin/course/bulk'),
};

// Course API
export const courseAPI = {
    getAllCourses: () => api.get('/courses/preview'),
    purchaseCourse: (courseId) => api.post('/courses/purchase', { courseId }),
};

export default api;
