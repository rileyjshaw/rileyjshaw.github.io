import React, {useState} from 'react';
import {Link} from 'gatsby';

import {ReactComponent as MenuIcon} from '../../content/images/menu.svg';
import {useKeyPress} from '../util/hooks';

import './site-nav.css';

export default () => {
	const [open, setOpen] = useState(false);
	useKeyPress('Escape', () => setOpen(false));

	return (
		<nav className="site-nav">
			<button
				aria-expanded={open}
				aria-controls="menu"
				aria-haspopup="true"
				id="menubutton"
				className={open ? 'open' : 'closed'}
				onClick={() => setOpen(o => !o)}
			>
				{open ? '✖' : <MenuIcon />}
			</button>
			<ul
				aria-labelledby="menubutton"
				id="menu"
				role="menu"
				hidden={!open}
				onClick={() => setOpen(o => !o)}
			>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/explore">Projects</Link>
				</li>
				<li>
					<Link to="/blog">Blog</Link>
				</li>
				<li>
					<Link to="/subscribe">Subscribe</Link>
				</li>
			</ul>
		</nav>
	);
};
