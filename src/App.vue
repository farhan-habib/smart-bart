<template>
	<div class="themeDiv">
		<ToggleButton v-model="isLightMode" onIcon="pi pi-sun" offIcon="pi pi-moon" />
		<ToggleButton v-model="checked" onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check"
			offIcon="pi pi-times" />
		<nav>
			<router-link to="/">Home</router-link>
			|
			<router-link to="/about">About</router-link>
			|
			<router-link to="/dev">Dev</router-link>
			|
			<router-link to="/dev2">Dev2</router-link>
		</nav>
		<router-view />
	</div>
</template>
<script setup>

import { ref } from 'vue';
let checked = ref(false);
let isLightMode = ref(true);
// let ss = document.createElement("link");
// ss.rel = "stylesheet";
// ss.type = "text/css";
// ss.href = "STYLES.CSS";
// document.head.appendChild(ss);
// function swapTheme() {
// 	isLightMode.value = !isLightMode.value;
// 	ss.href = isLightMode.value ? "STYLES.CSS" : "STYLES_DARK.CSS";
// }


</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

body {
	margin: 0;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: var(--surface-a);
	font-family: var(--font-family);
	font-weight: 400;
	color: var(--text-color);
}
</style>
