import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useColorMode } from "@vueuse/core";

const modes = ["md-dark", "md-light"];

export const userThemeSettings = defineStore({
	// id is required so that Pinia can connect the store to the devtools
	id: "userTheme",
	state: () => ({
		// isDarkMode: useLocalStorage("useDarkMode", true),
		modes,
		mode: useColorMode({
			attribute: "theme",
			modes: { ...modes.reduce((a, v) => ({ ...a, [v]: v }), {}) },
			//horrible one liner of code, basically turns an array of [a, b, c] into {a:a, b:b, c:c}
			//https://stackoverflow.com/a/36388401
		}),
	}),
	getters: {},
	actions: {},
});
