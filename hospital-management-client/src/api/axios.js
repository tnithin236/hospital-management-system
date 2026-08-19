import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5033/api',
});

export default api;