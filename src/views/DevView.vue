<!-- vbase-3-setup -->
<template>
	<h1>Dev Page</h1>
</template>

<script setup>
let Bart = require("@/scripts/public/bart");
let bartClient = new Bart();

bartClient.init();
</script>

<style lang="scss" scoped>
</style>