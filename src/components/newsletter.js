import React from 'react';

export default () => (
	<form
		className="newsletter-form"
		action="https://tinyletter.com/changelog"
		method="post"
		target="popupwindow"
		onsubmit="window.open('https://tinyletter.com/changelog', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
	>
		<p>
			<label>
				Newsletter signup:{' '}
				<input type="text" name="email" placeholder="you@email.com" />
			</label>
		</p>
		<input type="hidden" value="1" name="embed" />
		<input type="submit" value="Subscribe" />
	</form>
);
