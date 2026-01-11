const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export default API_BASE_URL;
