import { useQuiz } from '../contexts/QuizContext';

export default function NextButton({}) {
	const { dispatch, selectedIdx, index, numQuestions } = useQuiz();

	if (selectedIdx === null) return <button style={{ display: 'none' }}></button>;

	if (index < numQuestions - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);

	if (index === numQuestions - 1)
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);

	return <button style={{ display: 'none' }}></button>;
}
