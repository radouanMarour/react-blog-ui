import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const API = axios.create({ baseURL: baseUrl });

export default API