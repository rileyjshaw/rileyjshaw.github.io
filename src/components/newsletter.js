import React from 'react';

import './newsletter.css';

export default () => (
	<form
		className="newsletter-form"
		action="https://tinyletter.com/changelog"
		method="post"
		target="popupwindow"
		onSubmit={() => {
			if (typeof window !== 'undefined') {
				window.open(
					'https://tinyletter.com/changelog',
					'popupwindow',
					'scrollbars=yes,width=800,height=600'
				);
				return true;
			}
		}}
	>
		<label
			htmlFor="newsletter-email"
			style={{fontSize: 18, fontWeight: 'bold'}}
		>
			Subscribe to my newsletter for major updates:
		</label>
		<div className="bottom-row">
			<input
				type="text"
				name="email"
				placeholder="you@email.com"
				id="newsletter-email"
			/>
			<input type="hidden" value="1" name="embed" />
			<input type="submit" value="Subscribe" />
		</div>
	</form>
);
