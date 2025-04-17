import axios from 'axios';
import { auth } from './config/firebase';
import { getIdToken } from 'firebase/auth';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getVocabs = (date) => api.get(`/vocabs?date=${date}`);
export const addVocab = (vocab) => api.post('/vocabs', vocab);
export const deleteVocab = (id) => api.delete(`/vocabs/${id}`);

// Add auth token to requests
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    
    if (user) {
      try {
        const token = await getIdToken(user);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting ID token:', error);
      }
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401) {
        // Handle token expiration or unauthorized access
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default {
  getVocabs,
  addVocab,
  deleteVocab
};