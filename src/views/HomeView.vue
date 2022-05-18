<script setup>
import Button from 'primevue/button';
</script>

<template>
	<div class="mydiv">
		<img class="bgimage" src="https://www.ocf.berkeley.edu/~prb/wp-content/uploads/2019/08/Map.png"
			alt="Image Text" />
		<div class="other">
			<h1>Welcome to SMART BART</h1>
			<view>
				<Button @click="$router.push('/about')">
					Learn More
				</Button>
				<br>
				<br>
				<Button class="p-button-outlined" @click="$router.push('/findRoute')">
					Click Here to Begin
				</Button>
			</view>
		</div>
	</div>
</template>

<style lang="scss">
.mydiv {
	z-index: 1;
	position: relative;
}

.bgimage {
	width: 100%;
	opacity: 0.5;
}

.other {
	position: absolute;
	top: 1%;
	left: 1%;
}
</style>

