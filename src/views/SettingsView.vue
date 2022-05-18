<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import HandleThemesButton from "../components/handleThemesButton.vue";
const user = userThemeSettings();

</script>

<template>
	<div style="text-align:center">
		<h2>Theme:</h2>
		<HandleThemesButton></HandleThemesButton>
	</div>
</template>

<style lang="scss">
</style>