import { useQuiz } from '../contexts/QuizContext';

export default function FinishScreen({}) {
	const { points, maxPoints, highScore, dispatch } = useQuiz();

	const percentage = (points / maxPoints) * 100;

	return (
		<>
			<p className='result'>
				You scored <strong>{points}</strong> out of {maxPoints} (
				{Math.ceil(percentage)})%
			</p>

			<p className='highScore'>(HighScore: {highScore} points)</p>

			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart Quiz
			</button>
		</>
	);
}
