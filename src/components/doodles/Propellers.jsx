import {ABSTRACT_COLORS} from '../../util/constants';
import {withSettings} from '../SettingsProvider';
import './Propellers.css';
import React, {useRef, useState, useEffect, useMemo} from 'react';

const SIZE_UNSCALED = 520;

// Helper function: triangle wave.
function tri(x) {
	return 1 - 2 * Math.abs(Math.round(x / 2) - x / 2);
}

const variants = [
	{
		nLines: 10,
		lineWidth: 4,
		lineLengthFactor: 1,
		speed: 5,
		getAngle: (t, isOdd) =>
			(Math.PI / 2) * (tri(t / Math.PI) + isOdd + 0.5),
	},
	{
		nLines: 8,
		lineWidth: 20,
		lineLengthFactor: 1 / 1.5,
		speed: 2,
		getAngle: (t, isOdd) => t + isOdd + 0.5,
	},
	{
		nLines: 13,
		lineWidth: 3,
		lineLengthFactor: 1 / 1.6,
		speed: 10 / 3,
		getAngle: (t, isOdd, x, y, nLines) =>
			(Math.PI / 2) * (t + isOdd + (x + y * 4) / nLines),
	},
	{
		nLines: 13,
		lineWidth: 80 / 1.92,
		lineLengthFactor: 1 / 1.92,
		speed: 10 / 3,
		globalCompositeOperation: 'xor',
		isStarkClear: true,
		getAngle: (t, isOdd) => t + isOdd + 0.5,
	},
];

const Propellers = React.forwardRef(function Propellers(
	{El = 'div', settings: {theme}, onFullCycle},
	ref,
) {
	const SIZE = SIZE_UNSCALED * window.devicePixelRatio;

	const animationFrameRef = useRef(null);
	const canvasRef = useRef(null);
	const settingsRef = useRef({colors: null, variant: null});
	const themeColors = useMemo(() => ABSTRACT_COLORS[theme], [theme]);

	const initialVariantIdxOffset = useRef(
		Math.floor(Math.random() * variants.length),
	);
	const [variantIdxOffset, setVariantIdxOffset] = useState(0);

	useEffect(() => {
		if (variantIdxOffset > 0 && variantIdxOffset % variants.length === 0) {
			onFullCycle?.();
		}
	}, [variantIdxOffset]);

	const variantIdx =
		(initialVariantIdxOffset.current + variantIdxOffset) % variants.length;

	useEffect(() => {
		settingsRef.current.colors = themeColors;
	}, [themeColors]);

	useEffect(() => {
		settingsRef.current.variant = variants[variantIdx];
	}, [variantIdx]);

	useEffect(() => {
		function draw() {
			animationFrameRef.current = window.requestAnimationFrame(draw);

			const canvas = canvasRef.current;
			if (!canvas) return;

			const {
				colors,
				variant: {
					nLines,
					speed,
					lineWidth = 1,
					lineLengthFactor = 3 / 4,
					globalCompositeOperation = 'source-over',
					isStarkClear,
					getAngle,
				},
			} = settingsRef.current;

			// Derived constants.
			const lineSpacing = SIZE / nLines;
			const lineLength = lineSpacing * lineLengthFactor;
			const centerSpacings = Array.from(
				{length: nLines},
				(_, n) => (n + 0.5) * lineSpacing,
			);

			const ctx = canvas.getContext('2d');
			ctx.fillStyle = `${colors.bg}2a`;
			ctx.strokeStyle = colors.fg;
			ctx.lineWidth = window.devicePixelRatio * lineWidth;
			ctx[isStarkClear ? 'clearRect' : 'fillRect'](
				0,
				0,
				canvas.width,
				canvas.height,
			);
			ctx.globalCompositeOperation = globalCompositeOperation;

			// Animation starts here.
			const t = (Date.now() / 1000) * speed;
			for (let y = 0; y < nLines; ++y) {
				const cy = centerSpacings[y];
				for (let x = 0; x < nLines; ++x) {
					const isOdd = (x + y) % 2;
					const direction = isOdd ? 1 : -1;

					const angle = getAngle(t, isOdd, x, y, nLines);

					const cx = centerSpacings[x];
					const dx = Math.cos(angle) * lineLength;
					const dy = Math.sin(angle) * lineLength * direction;

					ctx.beginPath();
					ctx.moveTo(cx - dx, cy - dy);
					ctx.lineTo(cx + dx, cy + dy);
					ctx.stroke();
				}
			}
			ctx.restore();
		}
		animationFrameRef.current = window.requestAnimationFrame(draw);
		return () => {
			window.cancelAnimationFrame(animationFrameRef.current);
		};
	}, []);

	return (
		<El
			{...(ref?.hasOwnProperty('current') ? {ref} : {})}
			className="content-node doodle doodle-propellers"
			onClick={() => setVariantIdxOffset(i => i + 1)}
		>
			<canvas height={SIZE} width={SIZE} ref={canvasRef} />
		</El>
	);
});

export default withSettings(Propellers);
