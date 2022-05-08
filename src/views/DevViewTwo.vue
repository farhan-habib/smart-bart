<script setup>
import Bart from "../scripts/public/bart"
(async () => {
	let bartClient = new Bart();
	await bartClient.init();
	console.log(bartClient.getStations());

})();
</script>

<template>
</template>

<style lang="scss">
</style>