<!-- vbase-3-setup -->
<template>
	<h1>Dev Page</h1>
	<div class="bartMapContainer">
		<bartMap />
	</div>
</template>

<script setup>
import bartMap from "@/components/map.vue";
let Bart = require("@/scripts/public/bart");
let bartClient = new Bart();

bartClient.init();
</script>

<style lang="scss" scoped>
.bartMapContainer {
	width: 500px;
	height: 500px;
}
</style>