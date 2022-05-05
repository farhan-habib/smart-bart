<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

let navBarItems = ref([
	{
		label: "Home",
		icon: 'pi pi-fw pi-home',
		to: "/"
	},
	{
		label: "About",
		icon: 'pi pi-fw pi-info-circle',
		to: "/about"
	}
]);
</script>

<template>
	<header>
		<TabMenu :model="navBarItems" />
	</header>
	<RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
</style>
