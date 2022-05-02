const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	productionSourceMap: true,
	configureWebpack: {
		plugins: [
		require('unplugin-vue-components/webpack')({ 
			resolvers: [require('unplugin-vue-components/resolvers').PrimeVueResolver({ /* options */ })],
			dts: false,
			dirs: "src/components"	
		}),
		],
	},
});
