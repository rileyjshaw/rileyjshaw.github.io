import ColorChannelSplitter from './ColorChannelSplitter';
import SiteNav from './SiteNav';
import './PageHeader.css';
import ThemeToggleButton from './ThemeToggleButton';
import {Link} from 'gatsby';
import React from 'react';

export default ({location}) => (
	<header className="page-header" id="page-header" tabIndex="-1">
		<Link to="/">
			<ColorChannelSplitter El="h1" className="title">
				The digital <span>landfill of</span> <span>Riley J.</span>{' '}
				<span>Shaw</span>
			</ColorChannelSplitter>
		</Link>
		<SiteNav location={location} />
		<ThemeToggleButton uid="headerThemeToggle" />
	</header>
);
