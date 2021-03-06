// Shared internal utility functions for the util/ directory.
// External functions should go into util.js.
export const cssColorProperty = (color, variant, withVar = false) => {
	const colorProperty = `--color-${color}${
		variant === 'main' ? '' : `-${variant}`
	}`;
	return withVar ? `var(${colorProperty})` : colorProperty;
};
