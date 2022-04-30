<template>
	<div class="bartMap" id="bartMap" ref="bartMap"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";
import { onMounted, nextTick } from "@vue/runtime-core";
import { ref } from "vue";

function setupLeafletMap() {
	const mapDiv = L.map("bartMap").setView(L.latLng(37, -122), 17);

	L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
	}).addTo(mapDiv);

	L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
	}).addTo(mapDiv);

	return mapDiv;
}
// L.tileLayer(
// 		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
// 		{
// 			attribution:
// 				'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 			maxZoom: 18,
// 			id: "mapbox/streets-v11",
// 			accessToken: "XXX",
// 		}
// 	).addTo(mapDiv);
// }
onMounted(() => {
	nextTick(() => {
		setupLeafletMap();
	});
});
</script>
    
<style lang="scss" scoped>
.bartMap {
	width: 100%;
	height: 100%;
	border: 10px solid #000;
}
</style>