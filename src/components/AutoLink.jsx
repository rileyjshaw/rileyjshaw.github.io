import {Link} from 'gatsby';
import React from 'react';

const UncontrolledLink = ({href, to = href, children, ...rest}) => (
	<a href={to} {...rest}>
		{children}
	</a>
);
const ExternalLink = ({href, to = href, children, ...rest}) => (
	<a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
		{children}
	</a>
);
const AutoLink = props => {
	const {to = props.href} = props;
	return (to.startsWith('/') && !to.startsWith('//')) ||
		to.match(/^(https?:)?\/\/(www\.)?rileyjshaw\.com(?![^/?#])/i) ? (
		<Link {...props} to={to} />
	) : to.match(/^(https?:)?\/\//i) ? (
		<ExternalLink {...props} />
	) : (
		<UncontrolledLink {...props} />
	);
};

export {UncontrolledLink, ExternalLink};
export default AutoLink;
