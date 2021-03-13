import {ReactComponent as MenuIcon} from '../../content/images/menu.svg';
import {useKeyPresses} from '../util/hooks';
import './site-nav.css';
import ThemeToggleButton from './theme-toggle-button';
import {Link} from 'gatsby';
import React, {useMemo, useState} from 'react';

const links = [
	['/', 'Home'],
	['/about', 'About'],
	['/lab', 'Lab'],
	['/blog', 'Blog'],
	['/subscribe', 'Subscribe'],
];

export default ({location}) => {
	const [open, setOpen] = useState(false);
	const keyHandlers = useMemo(
		() => ({
			Escape: {onDown: () => setOpen(false)},
		}),
		[setOpen]
	);
	useKeyPresses(keyHandlers);
	return (
		<nav className="site-nav">
			<button
				aria-controls="site_nav_menu"
				aria-expanded={open}
				aria-haspopup="true"
				aria-label="Toggle navigation"
				className={`site-nav-menu-button ${open ? 'open' : 'closed'}`}
				data-target="#site_nav_menu"
				data-toggle="collapse"
				id="site_nav_menu_button"
				onClick={() => setOpen(o => !o)}
				type="button"
			>
				{open ? '✖' : <MenuIcon />}
			</button>
			<ul
				aria-labelledby="site_nav_menu_button"
				className={open ? '' : 'hidden'}
				id="site_nav_menu"
				role="menu"
			>
				{links.map(([href, name]) => (
					<li
						className={
							location.pathname === href ||
							(href.length > 1 &&
								location.pathname.startsWith(href))
								? 'active'
								: ''
						}
						key={name}
						onClick={() => setOpen(false)}
					>
						<Link to={href}>{name}</Link>
					</li>
				))}
				<li
					aria-hidden="true"
					className="underline"
					key="underline"
				></li>
				<li className="settings">
					<ThemeToggleButton uid="navThemeToggle" />
				</li>
			</ul>
		</nav>
	);
};
