'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';

export default function Header() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		const email = Cookies.get('email');
		const uid = Cookies.get('uid');
		const registered = Cookies.get('registered');
		if (token && email) {
			setUser({ email, uid, registered });
		} else {
			setUser(null);
		}
	}, []);

	return (
		<header className='w-full bg-white shadow flex items-center justify-between px-6 py-3 mb-6'>
			<div className='flex items-center gap-2'>
				<span
					className='text-2xl font-bold text-blue-700 cursor-pointer'
					onClick={() => router.push('/')}
				>
					AuthProject
				</span>
			</div>
			<div className='flex items-center gap-4'>
				{user ? (
					<>
						<div className='flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg'>
							<div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-lg text-white font-bold'>
								{user.email[0].toUpperCase()}
							</div>
							<div className='flex flex-col text-sm'>
								<span className='font-semibold'>{user.email}</span>
								{user.uid && (
									<span className='text-gray-500'>UID: {user.uid}</span>
								)}
								{user.registered && (
									<span className='text-gray-400'>
										Регистрация: {user.registered}
									</span>
								)}
							</div>
						</div>
						<form action='/logout' method='POST'>
							<button
								type='submit'
								className='flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded transition-colors'
							>
								<FiLogOut /> Выйти
							</button>
						</form>
					</>
				) : (
					<>
						<button
							onClick={() => router.push('/login')}
							className='flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 rounded transition-colors'
						>
							<FiLogIn /> Войти
						</button>
						<button
							onClick={() => router.push('/register')}
							className='flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold px-3 py-1 rounded transition-colors'
						>
							<FiUserPlus /> Регистрация
						</button>
					</>
				)}
			</div>
		</header>
	);
}
