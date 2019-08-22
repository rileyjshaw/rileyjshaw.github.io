import React from 'react';
import {Link} from 'gatsby';

const ExternalLink = ({to, children, ...rest}) => (
	<a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
		{children}
	</a>
);
const AutoLink = props =>
	props.to.startsWith('/blog') ? (
		<Link {...props} />
	) : (
		<ExternalLink {...props} />
	);

export {ExternalLink};
export default AutoLink;
