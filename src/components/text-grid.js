import React from 'react';

export default React.forwardRef(
	(
		{children, size: [xSize, ySize], classPrefix = 'text-grid', ...rest},
		ref
	) => (
		<div
			className={`${classPrefix}-grid`}
			style={{
				display: 'grid',
				gridTemplate: `repeat(${ySize}, 1fr) / repeat(${xSize}, 1fr)`,
			}}
			{...rest}
			ref={ref}
		>
			{children.split('').map((letter, i) => (
				<span
					className={`${classPrefix}-item`}
					key={`${children}-${i}`}
				>
					{letter}
				</span>
			))}
		</div>
	)
);
