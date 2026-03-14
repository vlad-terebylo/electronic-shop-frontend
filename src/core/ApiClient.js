// import axios from 'axios';
// import {getAuthToken} from "./AuthToken";
//
// const apiClient = axios.create({
//     baseURL: 'http://localhost:1409/api',
//     timeout: 10000,
// });
//
// apiClient.interceptors.request.use(async config => {
//     const token = await getAuthToken();
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// }, error => Promise.reject(error));
//
// export default apiClient;