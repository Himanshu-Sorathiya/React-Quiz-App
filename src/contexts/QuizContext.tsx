import {
	type Dispatch,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import questionsData from '../../data/questions.ts';

const QuizContext = createContext(
	{} as {
		questions: Question[];
		status: string;
		index: number;
		selectedIdx: null | number;
		points: number;
		highScore: number;
		numQuestions: number;
		maxPoints: number;

		dispatch: Dispatch<any>;
	}
);

export interface Question {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
	id: string;
}

interface State {
	questions: Question[];
	status: string;
	index: number;
	selectedIdx: null | number;
	points: number;
	highScore: number;
}

interface Action {
	type:
		| 'dataReceived'
		| 'dataFailed'
		| 'start'
		| 'newAnswer'
		| 'nextQuestion'
		| 'finish'
		| 'restart';
	payload?: any;
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};

		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};

		case 'start':
			return {
				...state,
				status: 'active',
			};

		case 'newAnswer':
			const question: Question = state.questions[state.index];

			return {
				...state,
				selectedIdx: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};

		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				selectedIdx: null,
			};

		case 'finish':
			return {
				...state,
				status: 'finished',
				highScore: Math.max(state.points, state.highScore),
			};

		case 'restart':
			return {
				...state,
				status: 'ready',
				index: 0,
				selectedIdx: null,
				points: 0,
			};

		default:
			return state;
	}
}

const initialState = {
	questions: [],
	status: 'loading',
	index: 0,
	selectedIdx: null,
	points: 0,
	highScore: 0,
};

function QuizProvider({ children }: any) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { questions, status, index, selectedIdx, points, highScore } = state;

	const numQuestions = questions.length;
	const maxPoints = questions.reduce(
		(acc: number, curr: { points: number }) => acc + curr.points,
		0
	);

	useEffect(() => {
		dispatch({ type: 'dataReceived', payload: questionsData });
	}, []);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				selectedIdx,
				points,
				numQuestions,
				maxPoints,
				highScore,

				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) {
		throw new Error('useQuiz must be used within a QuizProvider');
	}
	return context;
}

export { QuizProvider, useQuiz };

