import {useIdle, useStickyState} from '../util/hooks';
import Blocker from './blocker';
import './layout.css';
import React, {useState, useEffect} from 'react';

// TODO(April 2021): Just trying to be kind and clear out unused keys, but
// delete this once April comes around.
const unusedLocalStorageKeys = [
	'ascending',
	'nodeTypes',
	'sortIdx',
	'tagStates',
	'typeStates',
].map(name => `LAB_V1_${name}`);

const Layout = ({children}) => {
	const [isBlockerOpen, setIsBlockerOpen] = useState(false);
	const [nTimesClosed, setNTimesClosed] = useStickyState(
		0,
		'nTimesClosedBlocker',
		{scope: 'session'}
	);
	useIdle(60000 * 4 * (nTimesClosed + 1), () => setIsBlockerOpen(true));
	useEffect(() => {
		unusedLocalStorageKeys.forEach(key =>
			window.localStorage.removeItem(key)
		);
	}, []);

	return (
		<>
			{isBlockerOpen && (
				<Blocker
					onClose={() => {
						setIsBlockerOpen(false);
						setNTimesClosed(n => n + 1);
					}}
				/>
			)}
			<div className="site-content">{children}</div>
		</>
	);
};

export default Layout;
