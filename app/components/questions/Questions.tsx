import { CircularProgress } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { use, useMemo, useState } from 'react';
import { QuestionContent } from './QuestionContent';
import Confetti from 'react-confetti/dist/types/Confetti';
import ReactConfetti from 'react-confetti';

const Questions = ({
	url,
	setIsPlaying,
}: {
	url: string;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	console.log(url);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['questions', url],
		queryFn: async () => {
			const res = await fetch(url);
			return res.json();
		},
	});
	const [questionNumber, setQuestionNumber] = useState(1);
	const [isShowingAnswer, setIsShowingAnswer] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [score, setScore] = useState(0);

	if (isLoading) return <CircularProgress aria-label='Loading...' />;

	if (isError) return <div>{error.message}</div>;

	return (
		<div>
			{isFinished === false ? (
				<QuestionContent
					data={data}
					questionNumber={questionNumber}
					isShowingAnswer={isShowingAnswer}
					setIsFinished={setIsFinished}
					setIsShowingAnswer={setIsShowingAnswer}
					setQuestionNumber={setQuestionNumber}
					score={score}
					setScore={setScore}
				/>
			) : (
				<div>
					<ReactConfetti
						style={{
							position: 'fixed',
							pointerEvents: 'none',
							width: '100%',
							height: '100%',
							top: 0,
							left: 0,
						}}
					/>
					<h3 className='text-5xl'>Your Score: {score}</h3>
				</div>
			)}
			<div className='w-full py-4 underline grid place-items-center'>
				<button onClick={() => setIsPlaying(false)}>Back Home</button>
			</div>
		</div>
	);
};
export default Questions;
