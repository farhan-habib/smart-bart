<template>
	<div class="about">
		<h1>This is an about page</h1>
		<HomeView></HomeView>
		<InputText type="text" v-model="text" />
	</div>
</template>

<script setup>
import HomeView from './HomeView.vue';
// import HelloWorld from '@/components/HelloWorld.vue';
// import InputText from "primevue/inputtext/sfc";
const text = "e";
</script>

<style lang="scss" scoped>
</style>


