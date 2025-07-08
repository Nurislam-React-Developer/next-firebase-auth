'use client';
import { useRegisterUserMutation } from '@/api/authApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter();

	useEffect(() => {
		if (Cookies.get('token')) {
			router.replace('/');
		}
	}, [router]);

	const validate = () => {
		const newErrors = {};
		if (!email) newErrors.email = 'Пожалуйста, введите email';
		if (!password) newErrors.password = 'Пожалуйста, введите пароль';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		try {
			const res = await registerUser({ email, password }).unwrap();
			Cookies.set('token', res.token, { expires: 7 });
			Cookies.set('email', res.user.email, { expires: 7 });
			toast.success('Регистрация прошла успешно!');
			router.push('/');
		} catch (error) {
			toast.error(error?.message || 'Ошибка регистрации. Попробуйте ещё раз.');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in'
			>
				<h2 className='text-3xl font-bold mb-6 text-center text-green-700'>
					Регистрация
				</h2>
				<div className='mb-4'>
					<input
						type='email'
						placeholder='Email'
						className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
						className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${
							errors.password ? 'border-red-500' : ''
						}`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='new-password'
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-1'>{errors.password}</p>
					)}
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className='bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-colors duration-200 font-semibold mb-2 disabled:opacity-60'
				>
					{isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
				</button>
				<p className='text-sm text-center mt-4'>
					Уже есть аккаунт?{' '}
					<a href='/login' className='text-green-600 hover:underline'>
						Войти
					</a>
				</p>
			</form>
		</div>
	);
}
