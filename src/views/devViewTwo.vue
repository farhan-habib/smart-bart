<!-- vbase-3-setup -->
<template>
	<h1>Dev View (two)</h1>
</template>

<script setup>
(async () => {
	//bart client
	let Bart = require("@/scripts/public/bart");
	let bartClient = new Bart();
	await bartClient.init();

	bartClient.getStations();
	bartClient.getRoutes();
})();
</script>

<style lang="scss" scoped>
</style>