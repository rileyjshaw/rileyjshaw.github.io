import React, {useState} from 'react';
import {Link} from 'gatsby';

import {ReactComponent as MenuIcon} from '../../content/images/menu.svg';
import {useKeyPress} from '../util/hooks';
import Wrap from './wrap';

import './site-nav.css';

export default () => {
	const [open, setOpen] = useState(false);
	useKeyPress('Escape', () => setOpen(false));

	return (
		<nav class="site-nav">
			<button
				aria-expanded={open}
				aria-controls="menu"
				className={open ? 'open' : 'closed'}
				onClick={() => setOpen(o => !o)}
			>
				{open ? '✖' : <MenuIcon />}
			</button>
			<ul id="menu" hidden={!open}>
				<li>
					<Link to="/">
						<Wrap>Home</Wrap>
					</Link>
				</li>
				<li>
					<Link to="/about">
						<Wrap>About</Wrap>
					</Link>
				</li>
				<li>
					<Link to="/projects">
						<Wrap>Projects</Wrap>
					</Link>
				</li>
				<li>
					<Link to="/blog">
						<Wrap>Blog</Wrap>
					</Link>
				</li>
				<li>
					<Link to="/subscribe">
						<Wrap>Subscribe</Wrap>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
