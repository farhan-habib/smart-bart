<script setup>
const props = defineProps({
	msg: String
})
</script>

<template>
	<h1>Message:</h1>
	<h2>{{ msg || 'No props passed yet' }}</h2>
</template>

<style lang="scss" scoped>
	h1 {
		color: red;
	}
</style>
