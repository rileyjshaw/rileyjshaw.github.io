// Coolness sorter: builds sources/cool.json, a SORTED array of project uids
// ordered from least cool (index 0) to coolest (end). It looks like:
//
//   ['DWEET_123', 'ICON_4315', 'PROJECT_ZONIN']
//
// It doesn’t need to contain every project, but it must stay sorted.
//
// The sorter takes all the projects, filters out anything that’s already
// ranked, orders the rest from low → high coolness (old scraped rankings),
// then binary-inserts them one at a time. Each comparison asks “Which is
// cooler?”; each placement is written straight to disk by the curation
// server, so progress is never lost. Requires `npm run curate`.
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import ContentNode from '../../components/ContentNode';
import PickOne from '../../components/PickOne';
import SEO from '../../components/SEO';
import useAllProjects from '../../util/use-all-projects';

import './cool.css';

export function Head(props) {
	return <SEO {...props} title="Curate coolness" />;
}

// Types that never show up in the labs coolness ordering.
const EXCLUDED_TYPES = ['post', 'tumblr', 'commit'];

// Links inside a card should be followable (to check a project out) without
// registering as a pick.
function stopLinkClicks(event) {
	if (event.target.closest('a')) event.stopPropagation();
}

function ProjectCard({node, uid}) {
	if (!node) {
		// A ranked uid that no longer exists in the scraped data.
		return (
			<div className="project-card missing-project">
				<p>Unknown project</p>
				<code>{uid}</code>
			</div>
		);
	}
	return (
		<div className="project-card" onClickCapture={stopLinkClicks}>
			<ContentNode {...node} />
		</div>
	);
}

function CurateCool() {
	const allProjects = useAllProjects();
	const projectsByUid = useMemo(
		() => new Map(allProjects.map(p => [p.uid, p])),
		[allProjects],
	);

	// The authoritative ranking lives in sources/cool.json; this mirrors it.
	const [sortedCool, setSortedCool] = useState(null);
	const [skippedUids, setSkippedUids] = useState(() => new Set());
	const [isSaving, setIsSaving] = useState(false);
	const [lastInsertedUid, setLastInsertedUid] = useState(null);

	const syncSortedCool = useCallback(async () => {
		const response = await fetch('/_curate/static/sources/cool.json');
		setSortedCool(await response.json());
	}, []);

	useEffect(() => {
		syncSortedCool();
	}, [syncSortedCool]);

	// Projects that still need a ranking, least cool first (by the old
	// scraped ratings) so the list grows from the bottom up.
	const candidates = useMemo(() => {
		if (!sortedCool) return [];
		const ranked = new Set(sortedCool);
		return allProjects
			.filter(
				p =>
					!EXCLUDED_TYPES.includes(p.type) &&
					!ranked.has(p.uid) &&
					!skippedUids.has(p.uid),
			)
			.sort((a, b) => (a.coolness ?? 100) - (b.coolness ?? 100));
	}, [allProjects, sortedCool, skippedUids]);
	const candidate = candidates[0];

	// Binary search window into sortedCool for the current candidate. The
	// window is keyed by uid so a new candidate (or a re-synced list) starts
	// fresh without needing a reset effect.
	const [searchState, setSearchState] = useState(null);
	const isCurrentSearch =
		candidate && searchState?.uid === candidate.uid && sortedCool;
	const lo = isCurrentSearch ? searchState.lo : 0;
	const hi = isCurrentSearch
		? Math.min(searchState.hi, sortedCool.length)
		: (sortedCool?.length ?? 0);
	const mid = Math.floor((lo + hi) / 2);
	const pivotUid = sortedCool?.[mid];
	const pivotNode = projectsByUid.get(pivotUid);

	const saveInsertion = useCallback(
		async (uid, index) => {
			setIsSaving(true);
			try {
				const response = await fetch('/_curate/cool', {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify([uid, index, sortedCool.length]),
				});
				if (!response.ok) throw new Error(await response.text());
				setSortedCool(await response.json());
				setLastInsertedUid(uid);
			} catch (error) {
				// cool.json changed underneath us (or the server is down).
				// Re-sync; the derived search window restarts the candidate.
				console.error(error);
				await syncSortedCool();
			} finally {
				setIsSaving(false);
			}
		},
		[sortedCool, syncSortedCool],
	);

	// The window has collapsed: we’ve found the insertion point.
	useEffect(() => {
		if (!candidate || isSaving || lo < hi) return;
		saveInsertion(candidate.uid, lo);
	}, [candidate, isSaving, lo, hi, saveInsertion]);

	const handlePick = useCallback(
		choice => {
			if (isSaving || lo >= hi) return;
			// Left (0) means the candidate is cooler than the pivot, so it
			// belongs higher in the ascending list.
			setSearchState({
				uid: candidate.uid,
				lo: choice === 0 ? mid + 1 : lo,
				hi: choice === 0 ? hi : mid,
			});
		},
		[candidate, isSaving, lo, hi, mid],
	);

	const skipProject = useCallback(() => {
		if (!candidate) return;
		setSkippedUids(prev => new Set(prev).add(candidate.uid));
	}, [candidate]);

	const undoLast = useCallback(async () => {
		if (!lastInsertedUid || isSaving) return;
		setIsSaving(true);
		try {
			const response = await fetch(`/_curate/cool/${lastInsertedUid}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error(await response.text());
			setSortedCool(await response.json());
			setLastInsertedUid(null);
		} catch (error) {
			console.error(error);
			await syncSortedCool();
		} finally {
			setIsSaving(false);
		}
	}, [lastInsertedUid, isSaving, syncSortedCool]);

	if (!sortedCool) {
		return <p className="curate-cool-page all-done">Loading…</p>;
	}

	const comparisonsLeft = hi > lo ? Math.ceil(Math.log2(hi - lo + 1)) : 0;

	return (
		<div className="curate-cool-page">
			<div className="progress">
				<strong
					style={{
						color:
							candidates.length < 30
								? 'var(--color-green)'
								: candidates.length < 60
									? 'var(--color-yellow)'
									: 'var(--color-red)',
					}}
				>
					{candidates.length}
				</strong>{' '}
				projects to go!
				{candidate && comparisonsLeft > 0 && (
					<span className="comparisons">
						{' '}
						(≤{comparisonsLeft} picks for this one)
					</span>
				)}
			</div>
			{candidate ? (
				<>
					{hi > lo && !isSaving ? (
						<PickOne
							question="Which is cooler?"
							left={<ProjectCard node={candidate} />}
							right={
								<ProjectCard node={pivotNode} uid={pivotUid} />
							}
							onPick={handlePick}
						/>
					) : (
						<p className="all-done">Saving…</p>
					)}
					<div className="buttons">
						<button onClick={skipProject}>Skip</button>
						{lastInsertedUid && (
							<button onClick={undoLast}>Undo last</button>
						)}
					</div>
				</>
			) : (
				<p className="all-done">
					All done! {sortedCool.length} projects ranked. 🎉
				</p>
			)}
		</div>
	);
}

export default CurateCool;
