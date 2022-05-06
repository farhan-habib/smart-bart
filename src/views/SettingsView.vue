<script setup>
import { userThemeSettings } from "@/stores/theme.js";
const user = userThemeSettings();

</script>

<template>
	<ToggleButton v-model="user.isDarkMode" onLabel="Dark mode" offLabel="Light Mode" onIcon="pi pi-moon"
		offIcon="pi pi-sun" />

</template>

<style lang="scss">
</style>