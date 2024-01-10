# Icon sources

Gatsby’s [SVGR](https://react-svgr.com/) integration is sketchy, and [SVGR has a really simple CLI mode](https://react-svgr.com/docs/cli/).

## How to add a new SVG icon

At some point it would be nice to switch back to using a Gatsby plugin, if a good one surfaces. But I barely use icons on this site, so having an extra build step really isn’t a big deal.

1. Add the SVG to this folder (`/icons/`).
2. Run `npm run generate-icons` to convert the SVG to a React component.
3. Import the icon from `src/icons/`.

## Style tag stripping

The favicon SVG has a `<style>` tag so that it can switch between light and dark themes. Since this isn’t needed in the React component, it’s stripped out with an SVGO config in `svgr.config.js`.
