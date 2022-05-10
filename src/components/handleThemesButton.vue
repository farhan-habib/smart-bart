<template>
	<Dropdown :options="userPref.modes" v-model="userPref.mode" placeholder="Select theme" />
	<!-- <Button @click="next()">
		<i v-if="mode === 'dark'" i-carbon-moon inline-block align-middle class="align-middle" />
		<i v-if="mode === 'light'" i-carbon-sun inline-block align-middle class="align-middle" />
		<i v-if="mode === 'cafe'" i-carbon-cafe inline-block align-middle class="align-middle" />
		<i v-if="mode === 'contrast'" i-carbon-contrast inline-block align-middle class="align-middle" />

		<span class="ml-2 capitalize">{{ mode }}</span>
	</Button> -->

	<!-- <Button @click="next()" v-model:label="mode" /> -->



</template>

<script setup>
// import Vue from 'vue';
import { useColorMode } from '@vueuse/core';
import { useCycleList } from '@vueuse/core';
import { userThemeSettings } from "@/stores/theme.js";
let userPref = userThemeSettings();

// const modes = ['md-dark', 'lara-dark', 'lara-light', 'md-light'];
// const modes = ['md-dark', 'md-light'];
// const mode = useColorMode({
// 	attribute: 'theme',
// 	modes: { ...modes.reduce((a, v) => ({ ...a, [v]: v }), {}) },
// 	//horrible one liner of code, basically turns an array of [a, b, c] into {a:a, b:b, c:c}
// 	//https://stackoverflow.com/a/36388401
// });


</script>
