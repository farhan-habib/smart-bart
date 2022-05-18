<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, nextTick } from "@vue/runtime-core";
import { ref } from "vue";

import busIcon from "../assets/bus.png";
const user = userThemeSettings();

let mapDiv;


let bartIcon = L.icon({
	iconUrl: busIcon,
	iconSize: [10, 10],
})


function setupLeafletMap() {
	let lat = 37.6643;
	let lng = -122.0993;
	let zoom = 9;

	mapDiv = L.map('bartMap').setView([lat, lng], zoom);

	//mapDiv = L.map("bartMap").setView(L.latLng(37.8044, -122.4194), 10);
	//L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, { maxZoom: 20 }).addTo(mapDiv);
	// map layers: both open street maps and open railway maps
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(mapDiv);
	L.tileLayer('http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', { attribution: 'Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>' }).addTo(mapDiv);

}

function addMarker({ name, desc, loc: [lat, lng], }) {
	console.log(name, desc, lat, lng);
	const marker = L.marker([lat, lng], { icon: bartIcon }).addTo(mapDiv);
	marker.bindPopup(`<b>${name}</b><br>${desc}`);
	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

function drawPolyline(loc1, loc2) {
	let polyline = new L.Polyline([loc1, loc2], {
		color: 'magenta',
		opacity: 0.5,
		weight: 8,
		clickable: false
	}).addTo(mapDiv).bindPopup('best route.');;

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
