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

	L.control.layers(createLeafletTileLayers()).addTo(mapDiv);

	return mapDiv;
}


function createLeafletTileLayers(){
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
return {googleStreets, googleHybrid, googleSat, googleTerrain};
}



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