import React, {useRef, useEffect} from 'react';
import {colors} from '../../util/constants';

import './circle-constrained-lines.css';

const {PI, cos, sin, pow} = Math;
const L = 800;
const R = L / 3;
const N_LINES = 800;

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

export default function CircleConstrainedLines({El = 'div'}, ref) {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const {
			getOffset,
			nLines,
			lineWidth,
			globalCompositeOperation,
		} = variants[Math.floor(Math.random() * variants.length)];

		const angleStep = (2 * PI) / nLines;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = globalCompositeOperation;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = colors.fg;
		ctx.fillStyle = colors.co;
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
	}, []);
	return (
		<El
			{...(ref.hasOwnProperty('current') ? {ref} : {})}
			className="content-node doodle doodle-constrained-lines"
		>
			<canvas height={L} width={L} ref={canvasRef} />
		</El>
	);
}