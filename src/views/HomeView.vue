<script setup>
import Button from 'primevue/button';
</script>

<template>
	<h1>Welcome to SMART BART</h1>
	<div class="container-md">
		<div class="row">
			<div class="col-12 col-md-6">
				<div class="card">
					<Button @click="$router.push('/about')">
						Learn More
					</Button>
					<div style="padding:.5em"></div>
					<Button class="p-button-outlined" @click="$router.push('/findRoute')">
						Click Here to Begin
					</Button>
				</div>
			</div>
			<div class="col-12 col-md-6">

				<img id="bartMapImage" src="https://www.ocf.berkeley.edu/~prb/wp-content/uploads/2019/08/Map.png"
					alt="Image Text" />

			</div>
		</div>
	</div>
	<!-- <div class="mydiv">
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
	</div> -->
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

#bartMapImage {
	height: 100%;
	width: 100%;
	// padding-bottom: 100%;
}
</style>

