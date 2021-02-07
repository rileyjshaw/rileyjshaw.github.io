import React, {useState} from 'react';
import {Link} from 'gatsby';

import './palette-test-tool.css';

// sRGB luminance(Y) values
const rY = 0.212655,
	gY = 0.715158,
	bY = 0.072187;

// Inverse of sRGB "gamma" function. (approx 2.2)
function inv_gam_sRGB(ic) {
	const c = ic / 255.0;
	if (c <= 0.04045) return c / 12.92;
	else return Math.pow((c + 0.055) / 1.055, 2.4);
}

// sRGB "gamma" function (approx 2.2)
function gam_sRGB(v) {
	if (v <= 0.0031308) v *= 12.92;
	else v = 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055;
	return Math.floor(v * 255 + 0.5);
}

// GRAY VALUE ("brightness")
function gray(r, g, b) {
	return gam_sRGB(
		rY * inv_gam_sRGB(r) + gY * inv_gam_sRGB(g) + bY * inv_gam_sRGB(b)
	);
}

function multiply(c1, c2) {}

const tests = [
	{
		name: 'multiply',
		colors: ['W', 'MY', 'CY', 'CM', 'C', 'M', 'Y', 'CMY'],
		combine(mix, palette) {
			return mix.length === 1
				? palette[order.indexOf(mix)]
				: this.combine(
						mix.split('').map(c => palette[order.indexOf(c)])
				  );
		},
	},
];

const order = 'WRGBCMYK';
const initial = [
	'fff', // W
	'ff4136', // R
	'2ecc40', // G
	'0074d9', // B
	'00bcd4', // C
	'e91e63', // M
	'ffdc00', // Y
	'000', // K
];

const PaletteTestTool = () => {
	const [palette, setPalette] = useState(initial);
	const [R, G, B, C, M, Y] = palette;
	return (
		<main className="palette-test-tool">
			<h1 className="title">Palette test tool</h1>
			<Link className="subtitle" to="/">
				rileyjshaw.com
			</Link>

			<ul className="palette-tests">
				<li className="palette-test">
					<h2 className="list-name">Colors</h2>
					<ul className="color-list">
						{palette.map((color, i) => (
							<li
								key={i}
								className="color-item"
								style={{background: `#${color}`}}
							>
								<input
									type="text"
									value={`#${color}`}
									onChange={e => {
										const newValue = e.target.value
											.replace(/#/g, '')
											.toLowerCase();
										if (
											newValue.length === 3 ||
											newValue.length === 6
										)
											setPalette(p => [
												...p.slice(0, i),
												newValue,
												...p.slice(i + 1),
											]);
									}}
								/>
							</li>
						))}
					</ul>
				</li>
				<li className="palette-test multiply-test">
					<h2 className="list-name">Multiply</h2>
					<ul className="color-list">
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${M}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${Y}`}
								></rect>
							</svg>
						</li>
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${C}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${Y}`}
								></rect>
							</svg>
						</li>
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${C}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${M}`}
								></rect>
							</svg>
						</li>
						<li
							className="color-item"
							style={{background: `#${C}`}}
						></li>
						<li
							className="color-item"
							style={{background: `#${M}`}}
						></li>
						<li
							className="color-item"
							style={{background: `#${Y}`}}
						></li>
						<li className="palette-item bottom">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${C}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${M}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${Y}`}
								></rect>
							</svg>
						</li>
					</ul>
				</li>
				<li className="palette-test screen-test">
					<h2 className="list-name">Screen</h2>
					<ul className="color-list">
						<li
							className="color-item"
							style={{background: `#${R}`}}
						></li>
						<li
							className="color-item"
							style={{background: `#${G}`}}
						></li>
						<li
							className="color-item"
							style={{background: `#${B}`}}
						></li>
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${G}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${M}`}
								></rect>
							</svg>
						</li>
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${R}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${B}`}
								></rect>
							</svg>
						</li>
						<li className="color-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${R}`}
								></rect>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1 1"
							>
								<rect
									height={1}
									width={1}
									fill={`#${G}`}
								></rect>
							</svg>
						</li>
					</ul>
				</li>
				<>
					{palette.map(color => (
						<li className="palette-test">
							<ul className="color-list">
								<li
									className="color-item"
									style={{background: `#${color}`}}
								></li>
							</ul>
						</li>
					))}
				</>
			</ul>
		</main>
	);
};

export default PaletteTestTool;
