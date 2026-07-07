// Gatsby’s lmdb/msgpackr dependencies crash on Node majors newer than the
// one pinned in .nvmrc (RangeError: "length" is outside of buffer bounds),
// so fail fast with a useful message instead.
import fs from 'fs';

const wanted = fs
	.readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8')
	.trim();
const wantedMajor = parseInt(wanted, 10);
const currentMajor = parseInt(process.versions.node, 10);

if (currentMajor !== wantedMajor) {
	console.error(
		`\nThis project needs Node ${wanted} (you’re on ${process.versions.node}).` +
			'\nGatsby’s lmdb/msgpackr dependencies crash on other majors.' +
			'\n\nFix:  nvm use\n',
	);
	process.exit(1);
}
