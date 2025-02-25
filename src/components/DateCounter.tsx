import { useReducer } from 'react';

type Action =
	| { type: 'inc' }
	| { type: 'dec' }
	| { type: 'setCount'; payload: number }
	| { type: 'setStep'; payload: number }
	| { type: 'reset' };

function reducer(state: { step: number; count: number }, action: Action) {
	switch (action.type) {
		case 'inc':
			return { ...state, count: state.count + state.step };

		case 'dec':
			return { ...state, count: state.count - state.step };

		case 'setCount':
			return { ...state, count: action.payload };

		case 'setStep':
			return { ...state, step: action.payload };

		case 'reset':
			return { step: 1, count: 0 };

		default:
			return state;
	}
}

function DateCounter() {
	const initialState = {
		count: 0,
		step: 1,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const { count, step } = state;

	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={(e) => dispatch({ type: 'setStep', payload: +e.target.value })}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={() => dispatch({ type: 'dec' })}>-</button>
				<input
					value={count}
					onChange={(e) => dispatch({ type: 'setCount', payload: +e.target.value })}
				/>
				<button onClick={() => dispatch({ type: 'inc' })}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
