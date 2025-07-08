import { auth, googleProvider } from '@/firebase';
import { saveToken } from '@/utils/tokens';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';

const getFakeJWT = async (user) => {
	const token = await user.getIdToken();
	saveToken(token);
	return token;
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: async () => {
		return { data: {} }; 
	},
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			async queryFn({ email, password }) {
				try {
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					const token = await getFakeJWT(userCredential.user);
					const { uid, email: userEmail, displayName } = userCredential.user;
					return {
						data: { user: { uid, email: userEmail, displayName }, token },
					};
				} catch (err) {
					return { error: { message: err.message } };
				}
			},
		}),
		loginUser: builder.mutation({
			async queryFn({ email, password }) {
				try {
					const userCredential = await signInWithEmailAndPassword(
						auth,
						email,
						password
					);
					const token = await getFakeJWT(userCredential.user);
					const { uid, email: userEmail, displayName } = userCredential.user;
					return {
						data: { user: { uid, email: userEmail, displayName }, token },
					};
				} catch (err) {
					return { error: { message: err.message } };
				}
			},
		}),
		googleLogin: builder.mutation({
			async queryFn() {
				try {
					const userCredential = await signInWithPopup(auth, googleProvider);
					const token = await getFakeJWT(userCredential.user);
					const { uid, email: userEmail, displayName } = userCredential.user;
					return {
						data: { user: { uid, email: userEmail, displayName }, token },
					};
				} catch (err) {
					return { error: { message: err.message } };
				}
			},
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useGoogleLoginMutation,
} = authApi;
