<script setup>
	import { Graph } from "@/scripts/public/utils/graph.js";
	import Bart from "@/scripts/public/bart"
(async () => {
let bartClient = new Bart();
    await bartClient.init();
    getRoute({bartStations: bartClient.getStations(), bartRoutes: bartClient.getRoutes()}, "MCAR", "BALB")
    function getRoute({bartStations, bartRoutes}, beginningStation, endingStation){
		let stations = bartClient.getStations();
		let bartRouteGraph = new Graph()
    let i = 0;
    let istransfer = false;
    let transferstations = ["MCAR","19TH","COLS","BAYF","BALB"]
    while(stations[i]){
        istransfer = false
        for(let j = 0; j < transferstations.length; j++){
            if(transferstations[j] == stations[i].abbr){
                istransfer = true
            }
        }
        let graphnode = new Graph.gnode(stations[i].abbr,istransfer)
        bartRouteGraph.addNode(graphnode) // adds every station to node array in graph
        i++
    }
    let routes = bartClient.getRoutes();
    let j = 0; 
    let start = null
    let end = null
    let weight = 0 
    let color = null
    let direction = null
    while(routes[j]){
        let endpoints = routes[j].config.station
        let color = routes[j].color
        let direction = routes[j].direction
        
        let route = routes[j].name
        for(let i = 0; i < endpoints.length; i++){ // looks at direct edges (i.e. no transfers)
            let start = endpoints[i]
            let end = endpoints[i+1] // edge immediately after
            let graphedge = new Graph.gedge(start,end,0,color,direction) // weight is 0 because weight represents transfers & it is direct
            bartRouteGraph.addEdge(graphedge)
            
        }
        j++
    }
    let x = 0
    let transfertest = {}
    while(routes[x]){
        let endpoints = routes[x].config.station;
        let color = routes[x].color
        transfertest[color] = []
        let direction = routes[x].direction
        let route = routes[x].name
        for(let i = 0; i < endpoints.length; i++){
            let start = endpoints[i]
            for(let m = 0; m < transferstations.length; m++){
                if(transferstations[m]===start){

                    transfertest[color].push(start)
                }
            }
        }
        x++
    }
    for(let i = 0; i < routes.length; i++){
        let color = routes[i].color;
        let direction = routes[i].direction
        for(let j = 0; j < transfertest[color].length; j++){
            let start = transfertest[color][j]
            let transferedge = new Graph.gedge(start,start,1,color,direction)
            bartRouteGraph.addEdge(transferedge)
        }
	}
	console.log(bartRouteGraph.djikstras(beginningStation,endingStation))
	}
})();
// friendly reminder: npm run serve to start up webpage to look at stuff :)
</script>

<template>
	<h1>Dev View (two)</h1>
</template>

<style lang="scss">
</style>
