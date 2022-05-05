<script setup>
import { ref, onMounted } from "vue";
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
	},

	{
		label: "Settings",
		icon: 'pi pi-fw pi-cog',
		to: "/settings",
	},
	{
		seperator: true,
	},
	{
		label: "Dev",
		icon: "pi pi-fw pi-code",
		to: "/dev"
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
