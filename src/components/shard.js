import React, {useState} from 'react';

import Fit from './fit-4';

export default ({children}) => {
	const [[rA, rB, rC, rD]] = useState([
		Math.random(),
		Math.random(),
		Math.random(),
		Math.random(),
	]);
	return (
		<Fit
			text={children}
			style={{position: 'relative', marginBottom: '-0.25em'}}
		>
			{rA < 0.5 && (
				<span
					className="shard"
					aria-hidden="true"
					style={{
						[`border${
							rA < 0.25 ? 'Right' : 'Left'
						}`]: '90vw solid #000',
						borderBottom: `${rB * 0.4}em solid transparent`,
						borderTop: `${rC * 0.4}em solid transparent`,
						bottom: `${rD / 2}em`,
					}}
				/>
			)}
		</Fit>
	);
};
