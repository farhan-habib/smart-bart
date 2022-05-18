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

				<img id="bartMapImage" src="@/assets/bartMap.png" alt="Image Text" />

			</div>
		</div>
	</div>
</template>

<style lang="scss">
#bartMapImage {
	height: 100%;
	width: 100%;
	// padding-bottom: 100%;
}
</style>

