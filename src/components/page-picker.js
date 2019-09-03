import React, {useState} from 'react';
import {Link} from 'gatsby';

import {ReactComponent as Planet} from '../../content/images/planet.svg';
import {ReactComponent as Keyboard} from '../../content/images/keyboard.svg';
import {ReactComponent as Rss} from '../../content/images/rss.svg';

import './page-picker.css';

const pages = {
	home: {
		Icon: Planet,
		title: 'Home',
		color: 'var(--yellow)',
		link: '/',
	},
	about: {
		Icon: Planet,
		title: 'About',
		color: 'var(--red)',
		link: '/about',
	},
	explore: {
		Icon: Planet,
		title: (
			<>
				Project explorer<sup>beta</sup>
			</>
		),
		color: 'var(--blue)',
		link: '/explore',
	},
	blog: {
		Icon: Keyboard,
		title: 'Blog',
		color: 'var(--green)',
		link: '/blog',
	},
	subscribe: {
		Icon: Rss,
		title: 'Subscribe',
		color: 'var(--cyan)',
		link: '/subscribe',
	},
	another: {
		Icon: Planet,
		title: 'Another',
		color: 'var(--magenta)',
		link: '/blog',
	},
};

export {pages};

export default ({page, children}) => {
	const [open, setOpen] = useState(false);
	const {Icon, title} = pages[page];

	return (
		<div className="page-picker-wrapper">
			<div className="page-picker">
				<h1 className="page-title" onClick={() => setOpen(o => !o)}>
					<Icon />
					{title}
					<span className="arrow">{open ? '▲' : '▼'}</span>
				</h1>
				{open && (
					<ul className="page-links">
						{Object.keys(pages)
							.filter(key => key !== page)
							.map(key => {
								const {Icon, title, color, link} = pages[key];
								return (
									<li key={key} style={{background: color}}>
										<Link className="page-title" to={link}>
											<Icon /> {title}
										</Link>
									</li>
								);
							})}
					</ul>
				)}
			</div>
			{children}
		</div>
	);
};
