<script setup>
	import { Graph } from "@/scripts/public/utils/graph.js";
	import Bart from "@/scripts/public/bart"
import { GlobalBartClient } from "@/stores/bartStore";

	let bartClient = GlobalBartClient();

	console.log(bartClient.bartClient.getStations());
(async () => {

let bartRouteGraph = new Graph();

	//bart client
	let bartClient = new Bart();
	await bartClient.init();



	let stations = bartClient.getStations();
	let i = 0;
	let transferstations = ["MCAR","19TH","COLS","BAYF","BALB"]
	while(stations[i]){
		let graphnode = new Graph.gnode(stations[i].abbr)
		bartRouteGraph.addNode(graphnode) // adds every station to node array in graph
		i++
	}
	let routes = bartClient.getRoutes();
	let j = 0; 
	let start = null
	let end = null
	let weight = 0 
	while(routes[j]){
		let endpoints = routes[j].config.station
			
		
		let route = routes[j].name
		for(let i = 0; i < endpoints.length; i++){ // looks at direct edges (i.e. no transfers)

			let start = endpoints[i]
			let end = endpoints[i+1] // edge immediately after
			let graphedge = new Graph.gedge(start,end,0) // weight is 0 because weight represents transfers & it is direct
			bartRouteGraph.addEdge(graphedge)
		}
		j++
	}

	//console.log("GRAPH",bartRouteGraph.nodes)
	// figuring out transfers
	let count = 0
	for(let m = 0; m < routes.length; m++){
		let route = routes[m]
		//console.log(route)
		
		let stations = []
		for(let i = 0; i < route.config.station.length; i++){
			let curr = route.config.station[i]
		 	//console.log(curr,bartRouteGraph.edges[curr])
			count ++
		}
		//console.log(count)
	}
	 for(let i = 0; i < routes.length; i++){
		let currroute = routes[i].config.station
		 let currname = routes[i].name
		 for(let j = 0; j < currroute.length; j++){
			 let currstation = currroute[j]
			 for(let k = 0; k < routes.length; k++){
				 let otherroute = routes[k].config.station
				 let othername = routes[k].name
				 for(let x = 0; x < otherroute.length; x++){
					 if(othername != currname && otherroute[x] == currstation){
						 for(let q = 0; q < transferstations.length; q++){
							 		
							 if(transferstations[q] == currstation){
								 let graphedge = new Graph.gedge(currstation,currstation,1)
								 bartRouteGraph.addEdge(graphedge)
							 }
						 }
					 }
					 
				 }
			 }
			 
		 }
	 }
	bartRouteGraph.djikstras("SBRN","SHAY")
	 /*for(let x = 0; x < routes.length; x++){
		 let currname= routes[x].name;
		 let currroute = routes[x].config.station
		 console.log(routes.length)
	 }*/
	 //console.log(routes)
	 //console.log(transferstations)
})();
// friendly reminder: npm run serve to start up webpage to look at stuff :)

</script>

<template>
	<h1>Dev View (two)</h1>
</template>

<style lang="scss">
</style>