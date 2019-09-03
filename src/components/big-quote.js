import React, {useState} from 'react';

import {ReactComponent as Repeat} from '../../content/images/repeat.svg';

import './big-quote.css';

const quotes = [
	{
		children:
			'If we do not understand how complex technologies function, how systems of technologies interconnect, and how systems of systems interact, then we are powerless within them, and their potential is more easily captured by selfish elites and inhuman corporations… this understanding cannot be limited to the practicalities of how things work: it must be extended to how things came to be, and how they continue to function in the world in ways that are often invisible and interwoven. What is required is not understanding, but literacy.',
		source: (
			<>
				James Bridle,{' '}
				<cite>New Dark Age: Technology and the End of the Future</cite>
			</>
		),
		cite: 'https://www.versobooks.com/books/2698-new-dark-age',
	},
	{
		children:
			'You have not sufficiently understood power relationships in the control society unless you have understood how it works and who it works for.',
		source: (
			<>
				Alexander Galloway,{' '}
				<cite>
					Protocol: How Control Exists After Decentralization
				</cite>
			</>
		),
		cite: 'https://mitpress.mit.edu/books/protocol',
	},
	{
		children:
			'Who benefits from automation, and who loses, is ultimately a consequence not of the robots themselves, but of who owns them.',
		source: (
			<>
				Peter Frase, <cite>Four Futures: Life After Capitalism</cite>
			</>
		),
		cite: 'https://www.versobooks.com/books/1847-four-futures',
	},
	{
		children:
			'The future is one where technology is reclaimed by everyone.',
		source: (
			<>
				Zach Mandeville, <cite>The Future Will be Technical</cite>
			</>
		),
		cite:
			'https://coolguy.website/writing/the-future-will-be-technical/background().html',
	},
	{
		children:
			'A simply functional understanding of systems is insufficient; one needs to be able to think about histories and consequences too. Where did these systems come from, who designed them and what for, and which of these intentions still lurk within them today?',
		source: (
			<>
				James Bridle,{' '}
				<cite>New Dark Age: Technology and the End of the Future</cite>
			</>
		),
		cite: 'https://www.versobooks.com/books/2698-new-dark-age',
	},
];

export {quotes};

export default props => {
	let showRefreshButton = false;
	const [quoteIndex, setQuoteIndex] = useState(
		Math.floor(Math.random() * quotes.length)
	);
	if (!props.children) {
		props = quotes[quoteIndex];
		showRefreshButton = true;
	}
	const {children, cite, source} = props;
	return (
		<div className={`big-quote ${showRefreshButton ? '' : 'no-refresh'}`}>
			<blockquote cite={cite}>
				<p>{children}</p>
				{source && <footer>– {source}</footer>}
			</blockquote>
			{showRefreshButton && (
				<button
					className="refresh"
					onClick={() =>
						setQuoteIndex(
							prevIndex => (prevIndex + 1) % quotes.length
						)
					}
				>
					<Repeat />
				</button>
			)}
		</div>
	);
};
