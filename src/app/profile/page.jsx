'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AVATARS = [
	'https://api.dicebear.com/7.x/bottts/svg?seed=1',
	'https://api.dicebear.com/7.x/bottts/svg?seed=2',
	'https://api.dicebear.com/7.x/bottts/svg?seed=3',
	'https://api.dicebear.com/7.x/bottts/svg?seed=4',
	'https://api.dicebear.com/7.x/bottts/svg?seed=5',
];

export default function ProfilePage() {
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState(AVATARS[0]);
	const [email, setEmail] = useState('');
	const [uid, setUid] = useState('');
	const [registered, setRegistered] = useState('');
	const [errors, setErrors] = useState({});
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		const email = Cookies.get('email');
		const uid = Cookies.get('uid');
		const registered = Cookies.get('registered');
		const name = Cookies.get('name');
		const avatar = Cookies.get('avatar');
		if (!token) {
			router.replace('/login');
			return;
		}
		setEmail(email || '');
		setUid(uid || '');
		setRegistered(registered || '');
		setName(name || '');
		setAvatar(avatar || AVATARS[0]);
	}, [router]);

	const validate = () => {
		const newErrors = {};
		if (!name) newErrors.name = 'Пожалуйста, введите имя';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (!validate()) return;
		Cookies.set('name', name, { expires: 7 });
		Cookies.set('avatar', avatar, { expires: 7 });
		toast.success('Профиль успешно обновлён!');
	};

	return (
		<div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-200'>
			<form
				onSubmit={handleSave}
				className='bg-white p-10 rounded-2xl shadow-2xl text-center max-w-xl w-full animate-fade-in'
			>
				<h1 className='text-3xl font-extrabold mb-6 text-blue-700'>Профиль</h1>
				<div className='flex flex-col items-center mb-6'>
					<div className='mb-2'>
						<img
							src={avatar}
							alt='avatar'
							className='w-24 h-24 rounded-full border-4 border-blue-300 object-cover mx-auto'
						/>
					</div>
					<div className='flex gap-2 mb-4'>
						{AVATARS.map((a, i) => (
							<button
								type='button'
								key={i}
								onClick={() => setAvatar(a)}
								className={`w-10 h-10 rounded-full border-2 ${
									avatar === a ? 'border-blue-600' : 'border-gray-300'
								} transition-all`}
							>
								<img
									src={a}
									alt='avatar'
									className='w-full h-full rounded-full object-cover'
								/>
							</button>
						))}
					</div>
				</div>
				<div className='mb-4'>
					<input
						type='text'
						placeholder='Имя'
						className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							errors.name ? 'border-red-500' : ''
						}`}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{errors.name && (
						<p className='text-red-500 text-xs mt-1'>{errors.name}</p>
					)}
				</div>
				<div className='mb-2 text-left text-gray-600'>
					<div>
						<b>Email:</b> {email}
					</div>
					<div>
						<b>UID:</b>{' '}
						{uid || <span className='text-gray-400'>нет данных</span>}
					</div>
					<div>
						<b>Дата регистрации:</b>{' '}
						{registered || <span className='text-gray-400'>нет данных</span>}
					</div>
				</div>
				<button
					type='submit'
					className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold mt-4'
				>
					Сохранить
				</button>
			</form>
		</div>
	);
}
