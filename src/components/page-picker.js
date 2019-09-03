import React, {useState} from 'react';
import {Link} from 'gatsby';

import {ReactComponent as Planet} from '../../content/images/planet.svg';
import {ReactComponent as Keyboard} from '../../content/images/keyboard.svg';
import {ReactComponent as Rss} from '../../content/images/rss.svg';
import {ReactComponent as Pin} from '../../content/images/pin.svg';
import {ReactComponent as Repeat} from '../../content/images/repeat.svg';
import {ReactComponent as Sleep} from '../../content/images/sleep.svg';

import './page-picker.css';

const pages = {
	home: {
		Icon: Pin,
		title: 'Home',
		color: 'var(--red)',
		link: '/',
	},
	about: {
		Icon: Sleep,
		title: 'About',
		color: 'var(--magenta)',
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
		color: 'var(--cyan)',
		link: '/blog',
	},
	another: {
		Icon: Repeat,
		title: 'Another',
		color: 'var(--green)',
		link: '/blog',
	},
	subscribe: {
		Icon: Rss,
		title: 'Subscribe',
		color: 'var(--yellow)',
		link: '/subscribe',
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
					<div className="icon">
						<Icon />
					</div>
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
											<div className="icon">
												<Icon />
											</div>{' '}
											{title}
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
