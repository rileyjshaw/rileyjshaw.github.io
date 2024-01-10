import './BlogBanner.css';
import React from 'react';

const bannerTypes = {
	edit: {
		title: 'Edit',
	},
	note: {
		title: 'Note',
	},
	update: {
		title: 'Update',
	},
};

export default ({children, date, type = 'update'}) => (
	<div className={`blog-banner blog-banner-${type}`}>
		<div className="blog-banner-title">
			{bannerTypes[type].title}
			{date ? (
				<>
					{' '}
					<span className="blog-banner-date">{date}</span>
				</>
			) : null}
		</div>
		<div className="blog-banner-content">{children}</div>
	</div>
);

export const BlogBannerGroup = ({children}) => (
	<div className="blog-banner-group">{children}</div>
);
