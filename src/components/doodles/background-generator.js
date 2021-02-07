import {colors} from '../../util/constants';
import {randSequence, lcm} from '../../util/util';
import './background-generator.css';
import React, {useState, useEffect} from 'react';

const minWidth = 100; // Tiling width. Height is calculated dynamically.
const maxWidth = 200;
const minSequenceLength = 20; // Bigger numbers = more complex patterns.
const maxSequenceLength = 200;

// For these backgrounds to tile properly, each subsequent column needs to be
// shifted up by 1px. CSS doesn't currently support that, so we do it in
// canvas. A max canvas width is set here so we don't go completely out of
// control when there's a tall repeating pattern. "Seamless" mode can be set
// to ensure a height over maxTiles is never reached, so it ensures a
// perfectly tiling pattern.
const maxTiledWidth = 10000;

const defaultProps = {
	width: minWidth + Math.floor(Math.random() * (maxWidth - minWidth) + 1),
	zoom: 6, // I think it looks better a bit chunky like this.
	dark: colors.fg,
	light: colors.bg,
	themeBias: 0.65, // 0: light | 1: dark.
	seamless: true,
	El: 'div',
};

const getState = (
	props,
	canvas = document.createElement('canvas'),
	tiledCanvas = document.createElement('canvas')
) => {
	const {width, dark, light, themeBias, seamless} = {
		...defaultProps,
		...props,
	};

	let size, height, sequence;
	do {
		sequence = randSequence(
			minSequenceLength,
			maxSequenceLength,
			themeBias
		);
		size = lcm(width, sequence.length);
		height = size / width;
	} while (seamless && height > maxTiles);

	canvas.width = width;
	canvas.height = height;

	const maxTiles = Math.floor(maxTiledWidth / width);

	const ctx = canvas.getContext('2d');
	const tiledCtx = tiledCanvas.getContext('2d');

	// Create a single tile on the canvas.
	for (let i = 0; i < size; ++i) {
		const x = i % width;
		const y = Math.floor(i / width);
		ctx.fillStyle = sequence[i % sequence.length] ? dark : light;
		ctx.fillRect(x, y, 1, 1);
	}

	// Tile the initial canvas onto a wider canvas to ensure x-axis tiling.
	const nTiles = Math.min(maxTiles, height);
	tiledCanvas.width = width * nTiles;
	tiledCanvas.height = height;
	for (let i = 0; i < nTiles; ++i) {
		let offset = -i;
		do {
			tiledCtx.drawImage(canvas, i * width, offset);
			offset += height;
		} while (offset <= height);
	}

	return [canvas, tiledCanvas, nTiles, height];
};

export default function BackgroundGenerator(props, ref) {
	const [[canvas, tiledCanvas, nTiles, height], setState] = useState([]);
	const [clicked, setClicked] = useState(false);
	useEffect(() => {
		setState(getState(props, canvas, tiledCanvas));
	}, []);
	const {width, zoom, dark, light, themeBias, El, className} = {
		...defaultProps,
		...props,
	};
	// Apply the wide, tileable canvas as a repeating background.
	return (
		<El
			onClick={() => {
				setState(getState(props, canvas, tiledCanvas));
				if (!clicked) setClicked(true);
			}}
			className={`content-node doodle doodle-background-generator${
				className ? ` ${className}` : ''
			}`}
			style={
				tiledCanvas && {
					background: `${themeBias > 0.5 ? dark : light} left top/${
						width * nTiles * zoom
					}px ${height * zoom}px url(${tiledCanvas.toDataURL()}`,
				}
			}
			{...(ref.hasOwnProperty('current') ? {ref} : {})}
		>
			{clicked || <span class="default-button">Click?</span>}
		</El>
	);
}
