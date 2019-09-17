import React from 'react';
import {Link} from 'gatsby';

const UncontrolledLink = ({to, children, ...rest}) => (
	<a href={to} {...rest}>
		{children}
	</a>
);
const ExternalLink = ({to, children, ...rest}) => (
	<a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
		{children}
	</a>
);
const AutoLink = props =>
	// TODO(riley): Improve this first test.
	props.to.startsWith('/blog') ? (
		<Link {...props} />
	) : props.to.match(/^(https?:)?\/\//i) ? (
		<ExternalLink {...props} />
	) : (
		<UncontrolledLink {...props} />
	);

export {UncontrolledLink, ExternalLink};
export default AutoLink;
