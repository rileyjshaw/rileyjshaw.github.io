import React from 'react';

export default ({caption, children, width}) => (
	<figure className="blog-figure">
		{width ? <div width={width}>{children}</div> : children}
		<figcaption>{caption}</figcaption>
	</figure>
);
