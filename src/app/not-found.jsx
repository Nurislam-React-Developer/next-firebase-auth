'use client';
import { useRouter } from 'next/navigation';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100'>
      <div className='bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fade-in'>
        <FaExclamationTriangle className='text-6xl text-yellow-500 mb-4 mx-auto' />
        <h1 className='text-3xl font-extrabold mb-2 text-red-600'>404 — Страница не найдена</h1>
        <p className='text-gray-700 mb-6'>
          Упс! Такой страницы не существует или она была удалена.
        </p>
        <button
          onClick={() => router.push('/')}
          className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
        >
          На главную
        </button>
      </div>
    </div>
  );
} 