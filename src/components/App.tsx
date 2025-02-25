import { useQuiz } from '../contexts/QuizContext';
import Error from './Error';
import FinishScreen from './FinishScreen';
import Header from './Header';
import Loader from './Loader';
import Main from './Main';
import NextButton from './NextButton';
import Progress from './Progress';
import Question from './Question';
import StartScreen from './StartScreen';

export default function App() {
	const { status } = useQuiz();

	return (
		<div className='app'>
			<Header />

			<Main>
				{status === 'loading' && <Loader />}

				{status === 'error' && <Error />}

				{status === 'ready' && <StartScreen />}

				{status === 'active' && (
					<>
						<Progress />

						<Question />

						<NextButton />
					</>
				)}

				{status === 'finished' && <FinishScreen />}
			</Main>
		</div>
	);
}
