'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import React, { useState } from 'react';

import {
	Category,
	Difficulty,
	Options,
	Type,
	categories,
	difficulties,
	types,
} from '@/utils/options';
import OptionButton from './components/OptionButton';
import { useQuery } from '@tanstack/react-query';
import Questions from './components/questions/Questions';

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [options, setOptions] = useState<Options>({
		category: 'Sports',
		difficulty: 'Easy',
		type: 'Multiple Choice',
	});
	console.log(options);

	const selectOption = (option: Category | Difficulty | Type) => {
		console.log(option, 2);
		if (Object.values(categories).includes(option as Category)) {
			setOptions((prev) => ({ ...prev, category: option as Category }));
		} else if (Object.values(difficulties).includes(option as Difficulty)) {
			setOptions((prev) => ({ ...prev, difficulty: option as Difficulty }));
		} else if (Object.values(types).includes(option as Type)) {
			setOptions((prev) => ({ ...prev, type: option as Type }));
		}
	};

	return (
		<div className='flex flex-col max-w-full px-12 gap-12 items-center justify-center text-white'>
			<h1
				className={`font-bold transition-all duration-300  ${
					isPlaying ? 'text-4xl' : 'text-8xl'
				}   `}
			>
				Quiz App
			</h1>
			{isPlaying ? (
				<Questions
					setIsPlaying={setIsPlaying}
					url={`https://opentdb.com/api.php?amount=10&category=${
						options.category === 'Art'
							? '25'
							: options.category === 'Celebrities'
							? '26'
							: options.category === 'Geography'
							? '22'
							: options.category === 'History'
							? '23'
							: options.category === 'Politics'
							? '24'
							: options.category === 'Sports'
							? '21'
							: '21'
					}&difficulty=${
						options.difficulty === 'Easy'
							? 'easy'
							: options.difficulty === 'Medium'
							? 'medium'
							: options.difficulty
							? 'Hard'
							: 'hard'
					}&type=${
						options.type === 'Multiple Choice' ? 'multiple' : 'boolean'
					}&encode=url3986`}
				/>
			) : (
				<>
					<div className='flex justify-center items-center gap-8'>
						<div className='flex flex-col items-center gap-2 font-light'>
							<h3>Category</h3>
							<OptionButton
								selectOption={selectOption}
								options={Object.values(categories)}
							/>
						</div>
						<div className='flex flex-col items-center gap-2 font-light'>
							<h3>Difficulty</h3>
							<OptionButton
								selectOption={selectOption}
								options={Object.values(difficulties)}
							/>
						</div>
						<div className='flex flex-col items-center gap-2 font-light'>
							<h3>Type</h3>
							<OptionButton
								selectOption={selectOption}
								options={Object.values(types)}
							/>
						</div>
					</div>
					<Button
						onClick={() => setIsPlaying(true)}
						disableRipple
						className="relative text-blue-800  overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
						size='lg'
					>
						Start the quiz!
					</Button>
				</>
			)}
		</div>
	);
}
