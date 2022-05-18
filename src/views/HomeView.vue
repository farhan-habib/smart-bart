<script setup>
import Image from 'primevue/image';
</script>

<template>
	<h1>Welcome to SMART BART!</h1>
	<view>
		<router-link to="/findroute">View Stations on Map</router-link>
	</view>
	<div class=image>
		<Image src="https://www.bart.gov/sites/default/files/images/basic_page/system-map-everyday-until-9pm.png"
			alt="Image Text" />
	</div>
</template>

<style lang="scss">
main {
	text-align: center;
	margin-top: 5%;
}

Image {
	width: 30%;
	height: 30%;
}
</style>

