'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Terminal from 'react-terminal-ui';

const terminalLines = [
	{ type: 'input', value: 'LOAD ".404",8,1' },
	{ type: 'output', value: 'SEARCHING FOR .404' },
	{ type: 'output', value: 'FILE NOT FOUND  ERROR' },
	{ type: 'input', value: 'READY.' },
	{ type: 'output', value: 'SYSTEM FAILURE: MATRIX NOT FOUND' },
	{ type: 'output', value: 'Похоже, вы попали не туда...' },
	{
		type: 'input',
		value: 'Введите "home" и нажмите Enter, чтобы попасть на главную страницу',
	},
];

function MatrixRainSide({ side = 'left' }) {
	const columns = 12;
	const containerRef = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (containerRef.current) {
			setHeight(containerRef.current.offsetHeight);
		}
		const handleResize = () => {
			if (containerRef.current) setHeight(containerRef.current.offsetHeight);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div
			ref={containerRef}
			className={`fixed top-0 ${
				side === 'left' ? 'left-0' : 'right-0'
			} h-full z-0 flex flex-col justify-start items-${
				side === 'left' ? 'end' : 'start'
			} pointer-events-none select-none`}
			style={{ width: '90px' }}
		>
			<div className='flex flex-col h-full justify-start items-center'>
				{Array.from({ length: columns }).map((_, i) => (
					<MatrixColumn key={i} height={height} />
				))}
			</div>
			<style jsx>{`
				.matrix-symbol {
					color: #00ff41;
					font-family: monospace;
					font-size: 1.3rem;
					opacity: 0.85;
					user-select: none;
					text-shadow: 0 0 16px #00ff41, 0 0 2px #00ff41;
				}
			`}</style>
		</div>
	);
}

function MatrixColumn({ height }) {
	const symbolCount = Math.max(18, Math.floor((height || 800) / 32));
	const [symbols, setSymbols] = useState(Array(symbolCount).fill(' '));
	useEffect(() => {
		const interval = setInterval(() => {
			setSymbols((prev) => {
				const newSyms = [...prev];
				newSyms.pop();
				newSyms.unshift(
					Math.random() > 0.5
						? String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
						: ' '
				);
				return newSyms;
			});
		}, 55 + Math.random() * 40);
		return () => clearInterval(interval);
	}, [symbolCount]);
	return (
		<div className='flex flex-col justify-start h-full'>
			{symbols.map((s, i) => (
				<span className='matrix-symbol' key={i}>
					{s}
				</span>
			))}
		</div>
	);
}

export default function NotFound() {
	const router = useRouter();
	const [terminalInput, setTerminalInput] = useState('');

	const onInput = (input) => {
		if (input.trim().toLowerCase() === 'home') {
			router.push('/');
		}
		setTerminalInput('');
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-black relative overflow-hidden'>
			<MatrixRainSide side='left' />
			<MatrixRainSide side='right' />
			<div className='w-full max-w-2xl p-4 z-10 flex flex-col items-center'>
				<div className='mb-6 text-center flex justify-center'>
					<span className='text-green-400 font-mono text-lg bg-black/80 px-4 py-2 rounded-lg shadow-lg border border-green-700 animate-pulse max-w-xl w-full'>
						Введите <b>home</b> и нажмите <b>Enter</b>, чтобы попасть на главную
						страницу
					</span>
				</div>
				<Terminal
					name='MATRIX 404 TERMINAL'
					height='500px'
					width='100%'
					colorMode='dark'
					prompt='>'
					onInput={onInput}
					value={terminalInput}
					onChange={setTerminalInput}
					terminalLineData={terminalLines}
					style={{
						background: '#0f0f0f',
						color: '#00ff41',
						fontFamily: 'monospace',
						fontSize: '1.2rem',
						borderRadius: '1.5rem',
						boxShadow: '0 0 40px #00ff41a0',
					}}
				/>
			</div>
			<style jsx global>{`
				.ReactTerminal__container {
					background: #0f0f0f !important;
					color: #00ff41 !important;
				}
				.ReactTerminal__prompt {
					color: #00ff41 !important;
				}
				.ReactTerminal__inputArea input {
					color: #00ff41 !important;
					background: #0f0f0f !important;
				}
			`}</style>
		</div>
	);
}
