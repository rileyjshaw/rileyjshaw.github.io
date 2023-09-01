import ClientOnly from './ClientOnly';
import {withSettings} from './SettingsProvider';
import './ThemeToggleButton.css';
import React, {useCallback, useMemo, useRef} from 'react';

// TODO: Eye should definitely follow the mouse.

const THEME_NAMES = ['system', 'light', 'dark'];
const THEME_ATTRIBUTES = {
	system: {
		name: 'System',
		pupil: {
			cx: 35,
			cy: 50,
			r: 5,
		},
		iris: {
			r: 12,
		},
		gear: {
			size: 0,
		},
	},
	light: {
		name: 'Light',
		pupil: {
			cx: 35,
			cy: 50,
			r: 0,
		},
		iris: {
			r: 8,
		},
		gear: {
			size: 40,
		},
	},
	dark: {
		name: 'Dark',
		pupil: {
			cx: 25,
			cy: 46,
			r: 11,
		},
		iris: {
			r: 10,
		},
		gear: {
			size: 0,
		},
	},
};

function ThemeToggleButton({uid, settings: {themeKey, setThemeKey}}) {
	const mainAnimationRef = useRef(null);

	const refCallback = useCallback(node => {
		mainAnimationRef.current = node;
		node?.beginElement();
	}, []);

	const themeNameIdx = useMemo(
		() => THEME_NAMES.indexOf(themeKey),
		[themeKey],
	);
	const pastThemeKey =
		THEME_NAMES[
			(themeNameIdx + THEME_NAMES.length - 1) % THEME_NAMES.length
		];
	const themeAttributes = THEME_ATTRIBUTES[themeKey];
	const pastThemeAttributes = THEME_ATTRIBUTES[pastThemeKey];

	const gearSize = themeAttributes.gear.size;
	const prevGearSize = pastThemeAttributes.gear.size;
	// Original SVG path size: 850.4.
	const gearScale = gearSize / 850.4;

	const animationTriggerId = `${uid}AnimationTrigger`;
	const eyemaskId = `${uid}Eyemask`;
	const eyelidsId = `${uid}Eyelids`;
	const eyeballId = `${uid}Eyeball`;

	return (
		<ClientOnly>
			<button
				className="theme-toggle-button"
				onClick={() => {
					mainAnimationRef.current?.beginElement();
					setThemeKey(
						THEME_NAMES[(themeNameIdx + 1) % THEME_NAMES.length],
					);
				}}
			>
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="100%"
					height="100%"
					viewBox="0 0 70 100"
					fill="currentColor"
					stroke="currentColor"
					fontSize="12"
				>
					<animate
						ref={refCallback}
						id={animationTriggerId}
						begin="indefinite"
					/>
					<path
						id={eyelidsId}
						d="M 5 50 c 20 -20, 40 -20, 60 0 M5 50 c 20 20, 40 20, 60 0"
						fill="none"
						vectorEffect="non-scaling-stroke"
						strokeWidth="3"
						strokeLinecap="round"
					>
						<animate
							attributeType="XML"
							attributeName="d"
							values="M 5 50 c 20 -20, 40 -20, 60 0 M5 50 c 20 20, 40 20, 60 0; M5 50 c 20 0, 40 0, 60 0 M5 50 c 20 0, 40 0, 60 0; M5 50 c 20 -20, 40 -20, 60 0 M5 50 c 20 20, 40 20, 60 0"
							keyTimes="0;0.1;1"
							dur="1s"
							begin={`${animationTriggerId}.begin`}
							restart="always"
							fill="remove"
							calcMode="spline"
							keySplines=".42 0 1 1;0 0 .59 1"
						/>
					</path>
					<defs>
						<clipPath id={eyeballId}>
							<use href={`#${eyelidsId}`} />
						</clipPath>
						<mask id={eyemaskId}>
							<rect height="100" width="100" fill="#fff" />
							<circle
								{...themeAttributes.pupil}
								fill="#000"
								stroke="none"
							>
								<animate
									attributeType="XML"
									attributeName="r"
									begin={`${animationTriggerId}.begin`}
									values={`${pastThemeAttributes.pupil.r};${themeAttributes.pupil.r}`}
									keyTimes="0;1"
									dur="1s"
									restart="always"
									fill="remove"
								/>
								<animate
									attributeType="XML"
									attributeName="cx"
									begin={`${animationTriggerId}.begin`}
									values={`${pastThemeAttributes.pupil.cx};${themeAttributes.pupil.cx}`}
									keyTimes="0;1"
									dur="1s"
									restart="always"
									fill="remove"
								/>
								<animate
									attributeType="XML"
									attributeName="cy"
									begin={`${animationTriggerId}.begin`}
									values={`${pastThemeAttributes.pupil.cy};${themeAttributes.pupil.cy}`}
									keyTimes="0;1"
									dur="1s"
									restart="always"
									fill="remove"
								/>
							</circle>
						</mask>
					</defs>
					<text width="50" dy="-0.5em">
						<textPath
							href={`#${eyelidsId}`}
							strokeWidth={0}
							startOffset="25%"
							style={{textAnchor: 'middle'}}
						>
							Site theme:
						</textPath>
					</text>
					<text width="50" dy="1em">
						<textPath
							href={`#${eyelidsId}`}
							strokeWidth={0}
							startOffset="75%"
							style={{textAnchor: 'middle', letterSpacing: 2}}
							y="10"
						>
							{themeAttributes.name}
						</textPath>
					</text>
					<g clipPath={`url(#${eyeballId})`}>
						<g mask={`url(#${eyemaskId})`}>
							<circle {...themeAttributes.iris} cx="35" cy="50">
								<animate
									attributeType="XML"
									attributeName="r"
									begin={`${animationTriggerId}.begin`}
									values={`${pastThemeAttributes.iris.r};${
										pastThemeAttributes.iris.r * 2
									};${themeAttributes.iris.r}`}
									keyTimes="0;0.1;1"
									dur="1s"
									restart="always"
									fill="remove"
								/>
							</circle>
							{/* Sun path by Alvaro Cabrera https://thenounproject.com/vendetusvectores */}
							<path
								transform={`translate(${(70 - gearSize) / 2} ${
									(100 - gearSize) / 2
								}) scale(${gearScale})`}
								d="M709.1,468.3c-26.7-1.3-51.6-7.4-72.6-22.7l-1.2-8.5l2.1-8.2c30.7-4.4,54.6-16.6,73.3-34.3c26.5-25.1,56-35,92.9-36.1 c-34.7-17.5-67.2-13.9-99.6-2.3c-25.2,9-50.6,12.9-75.8,6.8l-4.3-7.3l-1.2-8.4c26.7-15.9,43.9-36.2,54.4-59.7 c14.9-33.3,38.5-53.9,72.2-69c-38.7-2.9-67.3,13-92.9,36.2c-19.8,18-42.1,31.3-67.7,35.2l-6.4-4.8l-4.5-7.7 c18.6-24.9,26.8-50.2,27.5-76c1-36.4,14.9-64.5,40.2-91.4c-36.9,12.1-57.2,37.9-72,69.1c-11.4,24.2-26.9,44.9-49,58.4l-7.9-2 l-7-5.3c7.7-30.1,5.6-56.6-3.6-80.7c-13-34-10.9-65.1,2.3-99.6c-29.5,25.3-38.5,56.7-40.2,91.2c-1.3,26.6-7.5,51.7-22.6,72.6 L437,215l-8.3-2.2c-4.4-30.7-16.5-54.5-34.2-73.3c-25.1-26.5-35-56-36.1-92.9c-17.5,34.7-13.9,67.2-2.3,99.6 c9,25.1,12.9,50.7,6.8,75.8l-7.2,4.2l-8.6,1.3c-15.9-26.7-36.2-44-59.8-54.5c-33.3-14.9-53.9-38.5-69-72.2 c-2.9,38.7,13,67.5,36.2,93.1c18,19.8,31.3,41.8,35.3,67.4l-4.9,6.5l-7.6,4.4c-24.9-18.6-50.3-26.8-76.1-27.5 c-36.4-1-64.4-14.9-91.3-40.2c12.1,36.9,37.8,57.3,69,72c24.2,11.4,44.9,26.7,58.5,48.8l-2.1,8.1l-5.2,7 c-30.1-7.7-56.7-5.6-80.8,3.6c-34,13-65.1,11.1-99.7-2.1c25.3,29.5,56.8,38.4,91.3,40.1c26.6,1.3,51.6,7.4,72.6,22.6l1.2,8.6 l-2.1,8.2c-30.7,4.4-54.5,16.5-73.3,34.2c-26.5,25.1-56,35.2-92.9,36.3c34.7,17.5,67.2,13.7,99.7,2.1c25.1-9,50.6-12.9,75.7-6.8 l4.3,7.3l1.2,8.5c-26.7,15.9-44,36.3-54.5,59.8c-14.9,33.3-38.4,53.7-72,68.9c38.7,2.9,67.4-13,93-36.2 c19.8-18,41.8-31.3,67.4-35.3l6.5,4.9c2,3.4,4.8,7.9,4.8,7.9c-18.5,24.9-26.8,50.3-27.5,76c-0.9,36.4-14.6,64.4-39.9,91.4 c36.9-12.2,57.2-37.9,71.9-69.1c11.4-24.1,26.5-44.9,48.5-58.5l8.3,2.1l6.6,4.9c-7.7,30.1-5.6,56.8,3.7,80.8 c13,34,10.9,65.2-2.2,99.7c29.5-25.3,38.4-56.8,40.1-91.3c1.3-26.7,7.6-51.6,22.8-72.6l8.4-1.2l8.2,2.1 c4.4,30.7,16.6,54.5,34.3,73.2c25.1,26.5,35,56,36.1,92.9c17.5-34.7,13.8-67.2,2.2-99.7c-9-25.2-12.9-50.6-6.8-75.8l7.3-4.3 l8.4-1.2c15.9,26.7,36.3,44,59.8,54.5c33.3,14.9,53.7,38.4,68.8,72.1c2.9-38.7-13-67.4-36.1-92.9c-17.9-19.8-31.2-41.9-35.2-67.5 l5.1-6.8l7.3-4.2c24.9,18.6,50.4,26.7,76.2,27.4c36.4,1,64.4,15,91.2,40.3c-12.1-36.9-37.9-57.2-69.1-72 c-24.1-11.4-44.8-26.8-58.3-48.9l2.2-8.3l5.1-6.8c30.1,7.7,56.7,5.6,80.8-3.6c34-13,65.1-10.9,99.6,2.3 C775.1,479.2,743.6,470,709.1,468.3z"
							>
								<animateTransform
									attributeType="XML"
									attributeName="transform"
									type="translate"
									values={`${
										(1 - prevGearSize / gearSize) * 425.2
									} ${
										(1 - prevGearSize / gearSize) * 425.2
									};0 0`}
									keyTimes="0;1"
									begin={`${animationTriggerId}.begin`}
									dur="1s"
									restart="always"
									additive="sum"
								/>
								<animateTransform
									attributeType="XML"
									attributeName="transform"
									type="scale"
									values={`${prevGearSize / gearSize};1`}
									keyTimes="0;1"
									begin={`${animationTriggerId}.begin`}
									dur="1s"
									restart="always"
									additive="sum"
								/>
								<animateTransform
									attributeType="XML"
									attributeName="transform"
									type="rotate"
									from="0 425.2 425.2"
									to="360 425.2 425.2"
									dur="20s"
									restart="never"
									repeatCount="indefinite"
									additive="sum"
								/>
							</path>
						</g>
					</g>
				</svg>
			</button>
		</ClientOnly>
	);
}

export default withSettings(ThemeToggleButton);
