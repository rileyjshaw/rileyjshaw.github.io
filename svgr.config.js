// NOTE: I use a <style> tag in the Favicon SVG to set the fill color based on
//       prefers-color-scheme. 'removeStyleElement' tells SVGO to remove the
//       <style> tag before converting it into a React component for use on the
//       site itself.
module.exports = {
	svgoConfig: {
		plugins: ['preset-default', 'removeStyleElement'],
	},
};
