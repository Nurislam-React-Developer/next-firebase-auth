import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
	baseURL: 'https://your-backend.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
