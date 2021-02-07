import './scaling-faders-demo.css';
import React, {useEffect, useState} from 'react';
import * as Tone from 'tone';

const loops = [
	{file: 'Beat1', initialVolume: 0.75},
	{file: 'Bass1', initialVolume: 0.75},
	{file: 'Layers1', initialVolume: 0.5},
	{file: 'Layers2', initialVolume: 0.25},
	{file: 'Chords1', initialVolume: 0},
	{file: 'Beat2', initialVolume: 0},
	{file: 'Flute1', initialVolume: 0},
	{file: 'Bass2', initialVolume: 0},
];
const nTracks = loops.length;

const add = (a, b) => a + b;
const bound = (n, lo, hi) => Math.max(lo, Math.min(hi, n)) || lo;

const Fader = ({onChange, value}) => (
	<div className="scaling-fader-container">
		<input
			type="range"
			onChange={onChange}
			value={value}
			min={0}
			max={1}
			step="any"
			className="scaling-fader"
		/>
	</div>
);

const FaderBank = ({values, label, onChange, className}) => (
	<div className={`scaling-faderbank ${className || ''}`}>
		<div className="scaling-faders">
			{values.map((value, i) => (
				<Fader
					key={i}
					value={value}
					onChange={({target: {value}}) => onChange(+value, i)}
				/>
			))}
		</div>
		<p className="scaling-fader-label">{label}</p>
	</div>
);

const Demo = ({players}) => {
	const [started, setStarted] = useState(false);
	const [linkedFaders, setLinkedFaders] = useState({
		volume: loops.map(loop => loop.initialVolume).reduce(add) / nTracks,
		tracks: loops.map(loop => loop.initialVolume),
		volumeLocked: !loops.some(
			({initialVolume}) => initialVolume && initialVolume < 1
		),
	});
	const [gain, setGain] = useState(0.5);
	const [simple, setSimple] = useState(false);

	const updateVolume = newVolume => {
		setLinkedFaders(({tracks}) => {
			const nActiveTracks = tracks.filter(track => track).length;
			const limitedVolume = bound(newVolume, 0, nActiveTracks / nTracks);
			const factor = (limitedVolume * nTracks) / tracks.reduce(add);

			return {
				volume: limitedVolume,
				tracks: tracks.map(unscaled => bound(factor * unscaled, 0, 1)),
				volumeLocked: limitedVolume !== newVolume,
			};
		});
	};
	const updateTrack = (newValue, i) => {
		setLinkedFaders(({volume, tracks}) => {
			let newTracks = [
				...tracks.slice(0, i),
				+newValue,
				...tracks.slice(i + 1),
			];
			if (!simple) {
				const factor =
					(volume * nTracks - newValue) /
					(newTracks.reduce(add) - newValue);
				newTracks = newTracks.map((unscaled, j) =>
					i === j ? unscaled : bound(factor * unscaled, 0, 1)
				);
			}
			return {
				volume: newTracks.reduce(add) / nTracks,
				tracks: newTracks,
				volumeLocked: !newTracks.some(track => track && track < 1),
			};
		});
	};
	const updateGain = newGain => setGain(newGain);

	// Update track volume.
	useEffect(() => {
		linkedFaders.tracks.forEach((volume, i) => {
			players[i].volume.value = Tone.gainToDb(volume);
		});
	}, linkedFaders.tracks);

	// Update master gain.
	useEffect(() => {
		Tone.Destination.volume.value = Tone.gainToDb(gain);
	}, [gain]);

	return started ? (
		<>
			<div className="scaling-faderbanks">
				<FaderBank
					label="Volume"
					values={[linkedFaders.volume]}
					onChange={updateVolume}
					className={
						linkedFaders.volumeLocked && 'scaling-fader-locked'
					}
				/>
				<FaderBank
					label="Tracks"
					values={linkedFaders.tracks}
					onChange={updateTrack}
				/>
				<FaderBank
					label="Gain"
					values={[gain]}
					onChange={updateGain}
				/>
			</div>
			<input
				id="simple-toggle"
				type="checkbox"
				className="scaling-fader-mode-toggle"
				checked={simple}
				onChange={() => setSimple(x => !x)}
			/>
			<label for="simple-toggle">Simple mode</label>
		</>
	) : (
		<button
			className="scaling-fader-button"
			onClick={() => {
				setStarted(true);
				Tone.start();
				Tone.Transport.start();
			}}
		>
			Start demo
		</button>
	);
};

export default () => {
	const [players, setPlayers] = useState([]);

	// Load the mp3s on mount.
	useEffect(() => {
		const playerPromises = loops.map(
			({file, initialVolume}) =>
				new Promise(resolve => {
					const player = new Tone.Player(
						`/mp3/loops/${file}.mp3`,
						() => resolve(player)
					).toDestination();
					player.volume.value = Tone.gainToDb(initialVolume);
				})
		);
		Promise.all(playerPromises).then(players => {
			if (players.some(player => player.disposed)) return;
			players.forEach(player => {
				player.sync();
				player.start();
			});
			Tone.Transport.bpm.value = 100;
			Tone.Transport.loop = true;
			Tone.Transport.loopStart = 0;
			Tone.Transport.loopEnd = '8:0:0';
			setPlayers(players);
		});
		return () => {
			Promise.all(playerPromises).then(players => {
				players.forEach(player => player.dispose());
			});
		};
	}, []);

	return (
		<div className="scaling-faders-demo">
			{players.length ? (
				<Demo players={players} />
			) : (
				<p className="scaling-faders-loading">Loading music…</p>
			)}
		</div>
	);
};
