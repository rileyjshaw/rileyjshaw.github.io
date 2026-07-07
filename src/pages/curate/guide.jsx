import PickOne from '../../components/PickOne';
import SEO from '../../components/SEO';
import './guide.css';
import {Link} from 'gatsby';
import React, {useMemo, useState} from 'react';

const mellowMovies = {
	question: 'I want to watch something…',
	choices: ['Emotional', 'Pretty'],
	branches: [
		{
			question: 'I want to watch something…',
			choices: ['Happy', 'Sad'],
			branches: ['Amelie', 'Moonlight'],
		},
		{
			question: 'Pretty how?',
			choices: ['Lighting', 'Sound'],
			branches: ['Blade Runner', 'Stop Making Sense'],
		},
	],
};

const excitingMovies = {
	question: 'What sort of setting?',
	choices: ['Expansive', 'Confined'],
	branches: [
		{
			question: 'Do you fuck with time?',
			choices: ['Ya', 'No way'],
			branches: [
				{
					question: "What did you mean earlier by 'Exciting'?",
					choices: ['Cerebral', 'Action-packed'],
					branches: ['Primer', 'Tenet'],
				},
				'Jurassic Park',
			],
		},
		{
			question: 'I want to be…',
			choices: ['Thrilled', 'Inspired'],
			branches: ['The Interview', '12 Angry Men'],
		},
	],
};

const root = {
	question: 'Which vibe movie are you feeling?',
	choices: ['Mellow', 'Exciting'],
	branches: [mellowMovies, excitingMovies],
};

const GuidePage = () => {
	const [step, setStep] = useState(root);

	const [answer, left, right] = useMemo(() => {
		return [
			typeof step === 'string' && (
				<p className="answer">
					Alright, try <a href="https://imdb.com">{step}!</a>
				</p>
			),
			step.choices?.[0],
			step.choices?.[1],
		];
	}, [step]);
	return (
		<div className="guide-page">
			<SEO title="Guide" />
			<Link className="exit" to="/lab">
				𝘅
			</Link>
			<PickOne
				question={step.question}
				answer={answer}
				left={left}
				right={right}
				onPick={choice => {
					setStep(prevStep => prevStep.branches[choice]);
				}}
			/>
		</div>
	);
};

export default GuidePage;
