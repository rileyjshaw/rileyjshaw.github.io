import {ReactComponent as MenuIcon} from '../../content/images/menu.svg';
import {useKeyPress} from '../util/hooks';
import './site-nav.css';
import {Link} from 'gatsby';
import React, {useState} from 'react';

const links = [
	['/', 'Home'],
	['/about', 'About'],
	['/lab', 'Lab'],
	['/blog', 'Blog'],
	['/subscribe', 'Subscribe'],
];

export default ({fromPage}) => {
	const [open, setOpen] = useState(false);
	const [activePage, setActivePage] = useState(fromPage);
	useKeyPress('Escape', () => setOpen(false));
	return (
		<nav className="site-nav">
			<button
				aria-controls="menu"
				aria-expanded={open}
				aria-haspopup="true"
				aria-label="Toggle navigation"
				className={open ? 'open' : 'closed'}
				data-target="#menu"
				data-toggle="collapse"
				id="menubutton"
				onClick={() => setOpen(o => !o)}
				type="button"
			>
				{open ? '✖' : <MenuIcon />}
			</button>
			<ul
				aria-labelledby="menubutton"
				className={open ? '' : 'hidden'}
				// hidden={!open}
				id="menu"
				onClick={() => setOpen(false)}
				role="menu"
			>
				{links.map(([href, name]) => (
					<li
						className={activePage === name ? 'active' : ''}
						key={name}
					>
						{/* TODO: Setting state here throws warning. */}
						<Link
							getProps={props => {
								if (
									props.isCurrent ||
									(props.isPartiallyCurrent &&
										href.length > 1)
								)
									setActivePage(name);
							}}
							state={{fromPage: activePage}}
							to={href}
						>
							{name}
						</Link>
					</li>
				))}
				<li
					aria-hidden="true"
					className="underline"
					key="underline"
				></li>
			</ul>
		</nav>
	);
};
