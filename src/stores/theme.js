import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const userThemeSettings = defineStore({
	// id is required so that Pinia can connect the store to the devtools
	id: "userTheme",
	state: () => ({
		isDarkMode: useLocalStorage("useDarkMode", true),
	}),
	getters: {},
	actions: {},
});
