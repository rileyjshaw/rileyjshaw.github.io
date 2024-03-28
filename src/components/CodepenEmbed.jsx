import React from 'react';

function CodepenEmbed({slug, title, defaultTab = 'result'}) {
	return (
		<>
			<iframe
				height="300"
				style={{width: '100%'}}
				scrolling="no"
				title={title}
				src={`https://codepen.io/rileyjshaw/embed/${slug}?default-tab=${defaultTab}`}
				frameBorder="no"
				loading="lazy"
				allowtransparency="true"
				allowFullScreen
			>
				See the Pen{' '}
				<a href={`https://codepen.io/rileyjshaw/pen/${slug}`}>
					{title}
				</a>{' '}
				by Riley Shaw (
				<a href="https://codepen.io/rileyjshaw">@rileyjshaw</a>) on{' '}
				<a href="https://codepen.io">CodePen</a>.
			</iframe>
		</>
	);
}

export default CodepenEmbed;
