import Header from '@/components/Header';
import Providers from '@/components/Providers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Auth NextJs and Firebase',
	description: 'Auth NextJs and Firebase',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
			>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
