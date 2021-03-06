import ColorChannelSplitter from '../components/color-channel-splitter';
import SiteNav from '../components/site-nav';
import './page-header.css';
import ThemeToggleButton from './theme-toggle-button';
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
