import { cookies } from 'next/headers';
import {
	FaGoogle,
	FaLock,
	FaRocket,
	FaSignOutAlt,
	FaUserCircle,
	FaUserEdit,
} from 'react-icons/fa';

export default function HomePage() {
	const token = cookies().get('token')?.value;
	const name = cookies().get('name')?.value;
	const email = cookies().get('email')?.value;
	const avatar = cookies().get('avatar')?.value;

	if (token) {
		return (
			<div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-200'>
				<div className='bg-white p-10 rounded-2xl shadow-2xl text-center max-w-2xl w-full animate-fade-in'>
					<div className='flex flex-col items-center mb-6'>
						<img
							src={avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=1'}
							alt='avatar'
							className='w-24 h-24 rounded-full border-4 border-blue-300 object-cover mb-2 shadow-lg'
						/>
						<h1 className='text-3xl font-extrabold mb-2 text-blue-700'>
							Привет, {name || email || 'пользователь'}!
						</h1>
						<p className='text-gray-600 mb-4'>
							Добро пожаловать в AuthProject — твой личный кабинет.
						</p>
					</div>
					<div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
						<a
							href='/profile'
							className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
						>
							<FaUserEdit /> Редактировать профиль
						</a>
						<form action='/logout' method='POST'>
							<button
								type='submit'
								className='bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2'
							>
								<FaSignOutAlt /> Выйти
							</button>
						</form>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-gray-600'>
						<div className='flex flex-col items-center'>
							<FaLock className='text-3xl text-blue-400 mb-2' />
							<span>Твои данные защищены</span>
						</div>
						<div className='flex flex-col items-center'>
							<FaRocket className='text-3xl text-green-400 mb-2' />
							<span>Быстрый доступ к возможностям</span>
						</div>
					</div>
					<div className='mt-8 text-gray-400 text-sm'>
						<span>
							© {new Date().getFullYear()} AuthProject. Все права защищены.
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-200'>
			<div className='bg-white p-10 rounded-2xl shadow-2xl text-center max-w-2xl w-full animate-fade-in'>
				<h1 className='text-4xl font-extrabold mb-4 text-blue-700 flex items-center justify-center gap-2'>
					<FaRocket className='text-green-500' /> Добро пожаловать в{' '}
					<span className='text-green-600'>AuthProject</span>!
				</h1>
				<p className='text-lg text-gray-700 mb-6'>
					Современное приложение для аутентификации: регистрация, вход через
					email и Google, защищённые страницы, профиль пользователя и стильный
					интерфейс.
				</p>
				<div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
					<a
						href='/register'
						className='bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2'
					>
						<FaLock /> Зарегистрироваться
					</a>
					<a
						href='/login'
						className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
					>
						<FaGoogle /> Войти
					</a>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-gray-600'>
					<div className='flex flex-col items-center'>
						<FaLock className='text-3xl text-blue-400 mb-2' />
						<span>Безопасная аутентификация</span>
					</div>
					<div className='flex flex-col items-center'>
						<FaGoogle className='text-3xl text-green-400 mb-2' />
						<span>Вход через Google</span>
					</div>
					<div className='flex flex-col items-center'>
						<FaUserCircle className='text-3xl text-blue-600 mb-2' />
						<span>Профиль пользователя</span>
					</div>
				</div>
				<div className='mt-8 text-gray-400 text-sm'>
					<span>
						© {new Date().getFullYear()} AuthProject. Все права защищены.
					</span>
				</div>
			</div>
		</div>
	);
}
