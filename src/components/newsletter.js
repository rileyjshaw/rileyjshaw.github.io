import {isRenderingOnClient} from '../util/constants';
import './newsletter.css';
import React from 'react';

export const Form = () => (
	<form
		className="newsletter-form"
		action="https://tinyletter.com/changelog"
		method="post"
		target="popupwindow"
		onSubmit={() => {
			if (isRenderingOnClient) {
				window.open(
					'https://tinyletter.com/changelog',
					'popupwindow',
					'scrollbars=yes,width=800,height=600'
				);
				return true;
			}
		}}
	>
		<label htmlFor="newsletter-email">
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

export default () => (
	<div className="newsletter">
		<Form />
		<p>
			My newsletter dispatches brief, infrequent updates about what I'm
			working on, where I live, or whatever I'm especially excited about.
		</p>
	</div>
);
