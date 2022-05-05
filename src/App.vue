<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue"
</script>

<template>
	<header>
		This is where stuff like the navbar goes
		<RouterLink to="/">Home</RouterLink>
		|
		<RouterLink to="/about">About</RouterLink>
	</header>
	<RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
</style>
