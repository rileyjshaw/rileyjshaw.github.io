// Some initial work at trying to get an infinite scroll page going.

import React, {useState, useLayoutEffect, useRef} from 'react';
import {InView} from 'react-intersection-observer';

import './scroll-loop.css';

const Page = ({page}) => (
	<div className="fullscreen plus">
		<p>Page {page}</p>
	</div>
);

const Quote = ({children, onChange}) => {
	return (
		<InView
			threshold={0.3}
			className="fullscreen"
			onChange={(inView, entry) => {
				if (
					entry.isIntersecting &&
					entry.boundingClientRect.y > 0 &&
					inView
				)
					onChange(inView);
			}}
		>
			{children}
		</InView>
	);
};

const FullPage = ({page, onChange}) => {
	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	useLayoutEffect(() => {
		setHeight(ref.current.clientHeight);
	});

	return (
		<div ref={ref}>
			<Page page={page} />
			<Quote onChange={(...args) => onChange(height, ...args)}>
				<p>"Quote {page}"</p>
			</Quote>
		</div>
	);
};

const ScrollLoop = () => {
	const [page, setPage] = useState(1);
	const [[topPage, bottomPage], setPages] = useState([]);
	/*

	Page content
	Fullscreen quote
	Page content
	Fullscreen quote
	Etc.

	When you scroll into the quote with +ve Y, bottomPage becomes topPage,
	destroy old topPage, create new bottomPage.

	If you scroll out of the quote with +ve Y, topPage becomes bottomPage,
	destroy old bottomPage, create new topPage.

	*/

	function handlePageChange(height, inView) {
		if (inView) {
			setPage(p => p + 1);
			// window.scrollBy(0, -height);
		} else {
			setPage(p => p - 1);
			// window.scrollBy(0, height);
		}
	}
	return (
		<div className="scroll-container">
			{Array.from(
				{length: 1000},
				(_, i) =>
					page + 1 > i && (
						<FullPage
							page={`${i + 1} / ${page}`}
							onChange={handlePageChange}
							key={i}
						/>
					)
			)}
		</div>
	);
};

export default ScrollLoop;
