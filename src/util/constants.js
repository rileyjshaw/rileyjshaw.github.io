// TODO(riley): Can this merge with the CSS defs?
export const colors = {
	co: '#eee',
	bg: '#faf9f7',
	red: '#ff4136',
	green: '#2ecc40',
	blue: '#0074d9',
	cyan: '#00bcd4',
	magenta: '#e91e63',
	yellow: '#ffdc00',
	fg: '#0a0b08',
};

export const isRenderingOnServer = typeof window === 'undefined';
export const isRenderingOnClient = !isRenderingOnServer;
