<script setup>
import { userThemeSettings } from "@/stores/theme.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, nextTick } from "@vue/runtime-core";
import { ref } from "vue";

import busIcon from "../assets/bus.png";
const user = userThemeSettings();

let mapDiv;
let layers;

let bartIcon = L.icon({
	iconUrl: busIcon,
	iconSize: [10, 10],
})


/**
 * Initializes the leaflet map
 */
function setupLeafletMap() {
	let lat = 37.6643;
	let lng = -122.0993;
	let zoom = 9;

	mapDiv = L.map('bartMap').setView([lat, lng], zoom);
	layers = L.layerGroup().addTo(mapDiv);
	// map layers: both open street maps and open railway maps
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(mapDiv);
	L.tileLayer('http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', { attribution: 'Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>' }).addTo(mapDiv);

}

/**
 * clear all markers and polylines from map
 */
function clearMap() {
	layers.clearLayers();
}


/**
 * @param {Object} obj an object
 * @param {name} obj.name the name of the object
 * @param {string} obj.desc the description of the marker
 * @param {Number[]} loc an array containing two coordinates
 * @param {Number} loc[0] the latitude
 * @param {Number} loc[1] the longitude
 * 
 * Adds a marker to the map given a name description and coordinates
 **/
function addMarker({ name, desc, loc: [lat, lng], }) {
	console.log(name, desc, lat, lng);
	const marker = L.marker([lat, lng], { icon: bartIcon }).addTo(mapDiv);
	marker.addTo(layers);
	marker.bindPopup(`<b>${name}</b><br>${desc}`);
}

/**
 * 
 * @param {Object} station1 A javascript object representing a bart station, following the standards layed out in the bart api
 * @param {Object}  station2 A javascript object representing a bart station, following the standards layed out in the bart api
 * @param {*} routeArray An array of objects representing the route between the two stations
 */
function drawPolyline(station1, station2, routeArray) {
	let loc1 = [station1.gtfs_latitude, station1.gtfs_longitude];
	let loc2 = [station2.gtfs_latitude, station2.gtfs_longitude];
	let start = station1.name;
	let end = station2.name;

	let locs = [];
	console.log(routeArray[1]);
	for (const item of routeArray) {
		locs.push([item.gtfs_latitude, item.gtfs_longitude]);
	}

	let marker1 = L.marker(loc1).addTo(mapDiv);
	marker1.bindPopup('<b>Start</b><br />' + start);
	marker1.addTo(layers);

	let marker2 = L.marker(loc2).addTo(mapDiv);
	marker2.bindPopup('<b>End</b><br />' + end);
	marker2.addTo(layers);

	// the polyline needs to include the station in-between start and end
	let polyline = new L.Polyline(locs, {
		color: 'magenta',
		opacity: 0.5,
		weight: 8,
		clickable: false
	}).addTo(mapDiv).bindPopup('best route.');;
	polyline.addTo(layers);

	mapDiv.setView(loc1, 12);
}

//https://stackoverflow.com/a/70228978
defineExpose({
	addMarker,
	drawPolyline,
	clearMap,
	// testConsole
});

onMounted(() => {
	nextTick(() => {
		//need to put this here so that we can make sure that everything is properly loaded before the leafletmap is initialized
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
