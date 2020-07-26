const withCSS = require("@zeit/next-css");
module.exports = withCSS({
	/* my next config */
	exportPathMap: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId }
	) {
		return {
			"/": { page: "/" },
			"/settings": { page: "/settings" },
			"/changelog": { page: "/changelog" },
		};
	},
});
