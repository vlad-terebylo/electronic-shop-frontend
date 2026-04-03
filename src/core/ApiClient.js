import axios from 'axios';
import {getAuthToken} from "./AuthToken";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

apiClient.interceptors.request.use(async config => {
    try {
        const token = await getAuthToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    } catch (e) {
        console.error('[ApiClient] getAuthToken failed:', e);
        window.location.replace('/non-authorized');
        return Promise.reject(e);
    }
}, error => Promise.reject(error));

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error('[ApiClient] 401 from API:', error.config?.url);
            window.location.replace('/non-authorized');
        }
        return Promise.reject(error);
    }
);

export default apiClient;