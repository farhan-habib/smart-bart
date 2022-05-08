import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

import * as scssSyntax from "postcss-scss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		Components({
			resolvers: [PrimeVueResolver()],
			extensions: ["vue"],
			dts: false,
			dirs: "",
		}),
	],
	css: {
		postcss: {
			syntax: scssSyntax,
			plugins: [
				/**
				 * NOTE: this postcss plugin removes the "":root" selector from primevue css selectors nested
				 * inside `[theme=themename]` selectors, so that one theme doesnt overwrite the other theme's variables
				 * credit to omri#1999 for helping me with this
				 * **/
				{
					postcssPlugin: "remove-root",
					Once(css) {
						css.walkRules((rule) => {
							if (
								//only affects stuff inside of the [theme="themename"] selectors so that we can use the root selector ourselves.
								/\[theme=(?:.*)\]/.test(rule.selector) &&
								rule.selector.includes(":root")
							) {
								/**
								 * Replaces
								 * :root{
								 * }
								 *
								 * with
								 *
								 * {
								 * }
								 * in order to stop imported themes from polluting the root selector with variables.
								 */
								rule.selector = rule.selector.replace(
									/\s*:root\s*/g,
									""
								);
							}
						});
					},
				},
			],
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
