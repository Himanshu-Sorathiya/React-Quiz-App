import { useQuiz } from '../contexts/QuizContext';

export default function Question({}) {
	const { questions, index, selectedIdx, dispatch } = useQuiz();
	const question = questions.at(index)!;

	const hasAnswered = selectedIdx !== null;

	return (
		<div>
			<h4>{question.question}</h4>

			<div className='options'>
				{question.options.map((option, idx) => (
					<button
						key={option}
						className={`btn btn-option ${idx === selectedIdx ? 'answer' : ''} ${
							hasAnswered
								? idx === question.correctOption
									? 'correct'
									: 'wrong'
								: ''
						}`}
						onClick={() => dispatch({ type: 'newAnswer', payload: idx })}
						disabled={hasAnswered}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}
