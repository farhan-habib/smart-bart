<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import HandleThemesButton from "../components/handleThemesButton.vue";
const user = userThemeSettings();

</script>

<template>
	<!-- <ToggleButton v-model="user.isDarkMode" onLabel="Dark mode" offLabel="Light Mode" onIcon="pi pi-moon"
		offIcon="pi pi-sun" /> -->
	<HandleThemesButton></HandleThemesButton>

</template>

<style lang="scss">
</style>