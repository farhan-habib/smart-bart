<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import { onMounted, nextTick } from "@vue/runtime-core";
import { ref } from "vue";

const user = userThemeSettings();

function setupLeafletMap() {
	const mapDiv = L.map("bartMap").setView(L.latLng(37, -122), 17);

	// L.control.layers(createLeafletTileLayers()).addTo(mapDiv);
createLeafletTileLayers().addTo(mapDiv);
	return mapDiv;
}


function createLeafletTileLayers() {

return L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
	maxZoom:20,
})

// return L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
// 		maxZoom: 20,
// 		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// 	});

// //just for testing

// 	//https://stackoverflow.com/questions/33343881/leaflet-in-google-maps
// 	let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
// 		maxZoom: 20,
// 		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// 	});
// 	let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
// 		maxZoom: 20,
// 		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// 	});
// 	let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
// 		maxZoom: 20,
// 		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// 	});
// 	let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
// 		maxZoom: 20,
// 		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// 	});
// 	return { googleStreets, googleHybrid, googleSat, googleTerrain };
}



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
	
	height:100%;
	width:100%;
	// border: 10px solid #000;
}
</style>
