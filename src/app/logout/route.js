import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST() {
	cookies().set('token', '', { maxAge: 0 });
	cookies().set('email', '', { maxAge: 0 });
	redirect('/login');
}
