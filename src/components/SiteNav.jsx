import MenuIcon from '../icons/Menu';
import {useKeyPresses} from '../util/hooks';
import './SiteNav.css';
import ThemeToggleButton from './ThemeToggleButton';
import {Link} from 'gatsby';
import React, {useLayoutEffect, useMemo, useState} from 'react';

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
		[setOpen],
	);
	useKeyPresses(keyHandlers);

	// Prevent scrolling when the menu is open.
	useLayoutEffect(() => {
		if (open) {
			document.body.style.position = 'fixed';
			document.body.style.top = `-${window.scrollY}px`;
			document.body.style.width = '100%';
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [open]);

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
				<li className="settings">
					<ThemeToggleButton uid="navThemeToggle" />
				</li>
			</ul>
		</nav>
	);
};
