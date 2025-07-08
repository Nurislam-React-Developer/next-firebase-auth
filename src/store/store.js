import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import { authApi } from '@/api/authApi';

export const store = configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware)
});