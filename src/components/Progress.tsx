import { useQuiz } from '../contexts/QuizContext';

export default function Progress({}) {
	const { index, numQuestions, points, maxPoints, selectedIdx } = useQuiz();

	return (
		<header className='progress'>
			<progress
				max={numQuestions}
				value={index + Number(selectedIdx !== null)}
			/>

			<p>
				Question: <strong>{index + 1}</strong> / {numQuestions}
			</p>

			<p>
				Points: <strong>{points}</strong> / {maxPoints}
			</p>
		</header>
	);
}
