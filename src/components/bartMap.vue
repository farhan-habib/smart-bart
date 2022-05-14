<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, nextTick } from "@vue/runtime-core";
import { ref } from "vue";

const user = userThemeSettings();

let mapDiv;

function setupLeafletMap() {
	mapDiv = L.map("bartMap").setView(L.latLng(37.8044, -122.4194), 17);
	L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, { maxZoom: 20 }).addTo(mapDiv);
}

function addMarker([lat, lng]) {
	const marker = L.marker([lat, lng]).addTo(mapDiv);
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}




//https://stackoverflow.com/a/70228978
defineExpose({
	addMarker,

	// testConsole
});

onMounted(() => {
	nextTick(() => {
		setupLeafletMap();
	});
});
</script>




<template>
	<div class="bartMap" id="bartMap" ref="bartMap"></div>
</template>



<style lang="scss" scoped>
.bartMap {
	height: 100%;
	width: 100%;
}
</style>
