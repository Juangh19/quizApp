import { useMemo } from 'react';

interface QuestionContentProps {
	data: any;
	questionNumber: number;
	isShowingAnswer: boolean;
	setIsShowingAnswer: React.Dispatch<React.SetStateAction<boolean>>;
	setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
	setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
}

const shuffleArray = (array: string[]) => {
	return [...array].sort(() => Math.random() - 0.5);
};

export const QuestionContent = ({
	data,
	questionNumber,
	isShowingAnswer,
	setIsShowingAnswer,
	setQuestionNumber,
	setIsFinished,
	score,
	setScore,
}: QuestionContentProps) => {
	console.log(data);

	const shuffledAnswers = useMemo(() => {
		const answers = [
			...data.results[questionNumber - 1].incorrect_answers,
			data.results[questionNumber - 1].correct_answer,
		];
		return shuffleArray(answers);
	}, [data, questionNumber]);

	return (
		<div className='bg-[rgba(100,117,141,0.5)]   py-6 rounded-md px-10  '>
			<div className=' flex justify-between items-center '>
				<div className='flex text-xs gap-2'>
					<span onClick={() => setIsShowingAnswer(false)}>
						Question {questionNumber} / {data.results.length}
					</span>
					<span className='capitalize'>
						Difficulty: {data.results[questionNumber - 1].difficulty}
					</span>
					<span className='capitalize'>
						Category: {data.results[questionNumber - 1].category}
					</span>
				</div>
				<span>Score: {score}</span>
			</div>
			<div>
				<h3 className='text-2xl py-4 font-semibold  '>
					{decodeURIComponent(data.results[questionNumber - 1].question)}{' '}
				</h3>
				<div className=' grid grid-cols-2 gap-2'>
					{shuffledAnswers.map((answer) => (
						<button
							onClick={() => {
								setIsShowingAnswer(true);
								setTimeout(() => {
									if (questionNumber < data.results.length) {
										setIsShowingAnswer(false);
										setQuestionNumber((prev: number) => prev + 1);
										if (
											answer === data.results[questionNumber - 1].correct_answer
										) {
											setScore((prev: number) => prev + 10);
										}
									} else {
										setIsFinished(true);
									}
								}, 1000);
							}}
							className={`bg-[rgba(100,117,141,0.7)] backdrop-blur-md hover:scale-95 transition duration-300 py-3 px-2 rounded-md
                ${
									isShowingAnswer
										? answer === data.results[questionNumber - 1].correct_answer
											? 'bg-green-400'
											: 'bg-red-400'
										: ''
								}
                `}
							key={answer}
						>
							{decodeURIComponent(answer)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
