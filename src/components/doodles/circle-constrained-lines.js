import React, {useRef, useEffect} from 'react';
import {colors} from '../../util/constants';

import './circle-constrained-lines.css';

const {PI, cos, sin} = Math;
const L = 800;
const ROTATIONS = 10;
const R = L / 3;
const N_LINES = 1000;
const LINE_WIDTH = 1;

// Derived.
const C = L / 2;
const ANGLE_STEP = (2 * PI) / N_LINES;

export default function CircleConstrainedLines({El = 'div'}, ref) {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		ctx.globalCompositeOperation = 'overlay';
		ctx.lineWidth = LINE_WIDTH;
		ctx.strokeStyle = colors.fg;
		ctx.fillStyle = colors.co;
		ctx.arc(C, C, R * 1.03, 0, 2 * PI);
		ctx.fill();

		ctx.beginPath();
		ctx.arc(C, C, R, 0, 2 * PI);
		ctx.stroke();

		for (let i = 0; i < N_LINES; ++i) {
			const offset =
				sin((i / N_LINES) * PI * 2) *
				cos((i / N_LINES) * PI * 2) *
				PI *
				ROTATIONS;
			const angle = i * ANGLE_STEP;
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
			<canvas
				height={L}
				width={L}
				style={{
					background: colors.fg,
				}}
				ref={canvasRef}
			/>
		</El>
	);
}
