import {getThemeColor} from '../../util/util';
import {withSettings} from '../SettingsProvider';
import './CircleConstrainedLines.css';
import React, {useRef, useState, useEffect, useContext, useMemo} from 'react';

const {PI, cos, sin, pow} = Math;
const L = 800;
const R = L / 3;

// Derived.
const C = L / 2;

const variants = [
	{
		getOffset: (i, nLines) =>
			sin((i / nLines) * PI * 2) * cos((i / nLines) * PI * 2) * PI * 10,
		nLines: 800,
		lineWidth: 1,
		globalCompositeOperation: 'overlay',
	},
	{
		getOffset: (i, nLines) =>
			pow(sin((i / nLines) * 2 * PI) * cos((i / nLines) * 2 * PI), 2) *
			2 *
			PI *
			2,
		nLines: 800,
		lineWidth: 1,
		globalCompositeOperation: 'overlay',
	},
	{
		getOffset: (i, nLines) => (i / nLines) * 2 * PI * 1.5,
		nLines: 100,
		lineWidth: 2,
		globalCompositeOperation: 'source-over',
	},
];

const CircleConstrainedLines = React.forwardRef(
	function CircleConstrainedLines({El = 'div', settings: {theme}}, ref) {
		const canvasRef = useRef(null);
		const [variant, setVariant] = useState(
			Math.floor(Math.random() * variants.length),
		);
		const getColor = useMemo(() => getThemeColor(theme), [theme]);
		useEffect(() => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const {getOffset, nLines, lineWidth, globalCompositeOperation} =
				variants[variant];

			const angleStep = (2 * PI) / nLines;
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.globalCompositeOperation = globalCompositeOperation;
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = getColor('fg')();
			ctx.fillStyle = getColor('bg', 'mute')();
			ctx.arc(C, C, R * 1.03, 0, 2 * PI);
			ctx.fill();

			ctx.beginPath();
			ctx.arc(C, C, R, 0, 2 * PI);
			ctx.stroke();

			for (let i = 0; i < nLines; ++i) {
				const offset = getOffset(i, nLines);
				const angle = i * angleStep;
				const x1 = cos(angle) * R;
				const y1 = sin(angle) * R;
				const x2 = cos(angle + offset) * R;
				const y2 = sin(angle + offset) * R;

				ctx.beginPath();
				ctx.moveTo(C + x1, C + y1);
				ctx.lineTo(C + x2, C + y2);
				ctx.stroke();
			}
		}, [variant, theme]);
		return (
			<El
				{...(ref?.hasOwnProperty('current') ? {ref} : {})}
				className="content-node doodle doodle-constrained-lines"
			>
				<canvas
					height={L}
					width={L}
					ref={canvasRef}
					onClick={() => setVariant(v => (v + 1) % variants.length)}
				/>
			</El>
		);
	},
);

export default withSettings(CircleConstrainedLines);
