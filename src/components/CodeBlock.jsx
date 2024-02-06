import React from 'react';

import {Highlight} from 'prism-react-renderer';

import '../prism-nord.css';

function CodeBlock({children, className}) {
	// Parse the className.
	const language = className?.replace(/language-/, '') || '';
	if (!language) {
		return <code className="inline-code">{children}</code>;
	}

	return (
		<Highlight code={children} language={language} theme={null}>
			{({className, tokens, getLineProps, getTokenProps}) => (
				<pre className={className}>
					{tokens.map((line, i) => {
						const lineProps = getLineProps({line, key: i});
						// Skip empty lines at the end of the code block.
						if (
							line.every(token => token.empty) &&
							i === tokens.length - 1
						) {
							return null;
						}

						return (
							<div key={i} {...lineProps}>
								{line.map((token, key) => {
									return (
										<span
											key={key}
											{...getTokenProps({token, key})}
										/>
									);
								})}
							</div>
						);
					})}
				</pre>
			)}
		</Highlight>
	);
}

export default CodeBlock;
