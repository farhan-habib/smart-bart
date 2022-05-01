<template>
	<div class="about">
		<h1>This is an about page</h1>

		<InputText type="text" v-model="text" />
	</div>
</template>

<script setup>
const text = "e";
import InputText from "primevue/inputtext/sfc";
</script>

<style lang="scss" scoped>
</style>


