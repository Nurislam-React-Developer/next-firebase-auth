'use client';
import { useGoogleLoginMutation, useLoginUserMutation } from '@/api/authApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [loginUser, { isLoading }] = useLoginUserMutation();
	const [googleLogin, { isLoading: isGoogleLoading }] =
		useGoogleLoginMutation();
	const router = useRouter();

	// Проверка авторизации
	if (typeof window !== 'undefined' && Cookies.get('token')) {
		router.replace('/');
		return null;
	}

	const validate = () => {
		const newErrors = {};
		if (!email) newErrors.email = 'Введите email';
		if (!password) newErrors.password = 'Введите пароль';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		try {
			const res = await loginUser({ email, password }).unwrap();
			Cookies.set('token', res.token, { expires: 7 });
			Cookies.set('email', res.user.email, { expires: 7 });
			toast.success('Вход успешен!');
			router.push('/');
		} catch (error) {
			toast.error(error?.message || 'Ошибка входа');
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const res = await googleLogin().unwrap();
			Cookies.set('token', res.token, { expires: 7 });
			Cookies.set('email', res.user.email, { expires: 7 });
			toast.success('Вход через Google успешен!');
			router.push('/');
		} catch (error) {
			toast.error(error?.message || 'Ошибка Google входа');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in'
			>
				<h2 className='text-3xl font-bold mb-6 text-center text-blue-700'>
					Вход
				</h2>
				<button
					type='button'
					onClick={handleGoogleLogin}
					disabled={isGoogleLoading}
					className='flex items-center justify-center gap-2 w-full mb-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200'
				>
					<FcGoogle size={22} />
					{isGoogleLoading ? 'Входим через Google...' : 'Войти через Google'}
				</button>
				<div className='mb-4'>
					<input
						type='email'
						placeholder='Email'
						className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							errors.email ? 'border-red-500' : ''
						}`}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete='email'
					/>
					{errors.email && (
						<p className='text-red-500 text-xs mt-1'>{errors.email}</p>
					)}
				</div>
				<div className='mb-4'>
					<input
						type='password'
						placeholder='Пароль'
						className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							errors.password ? 'border-red-500' : ''
						}`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='current-password'
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-1'>{errors.password}</p>
					)}
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold mb-2 disabled:opacity-60'
				>
					{isLoading ? 'Входим...' : 'Войти'}
				</button>
				<p className='text-sm text-center mt-4'>
					Нет аккаунта?{' '}
					<a href='/register' className='text-blue-600 hover:underline'>
						Зарегистрироваться
					</a>
				</p>
			</form>
		</div>
	);
}
