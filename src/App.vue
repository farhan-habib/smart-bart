<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { userThemeSettings } from "@/stores/theme.js";
import { GlobalBartClient } from "./stores/bartStore";


//initializing some global properties with pinia
GlobalBartClient();
userThemeSettings();


// import darkMode from "@/styles/"
let navBarItems = ref([
	{
		label: "Home",
		icon: "pi pi-fw pi-home",
		to: "/",
	},
	{
		label: "About",
		icon: "pi pi-fw pi-info-circle",
		to: "/about",
	},
	{
		label: "Settings",
		icon: "pi pi-fw pi-cog",
		to: "/settings",
	},
	{
		label: "Find Route",
		icon: "pi pi-fw pi-map",
		to: "/findRoute",
	}
]);
</script>

<template>
	<header>
		<TabMenu v-model:model="navBarItems" />
	</header>
	<RouterView />
</template>

<style lang="scss">
@import "@/styles/base.scss";
</style>
