import {
	Graph
} from "@/scripts/public/utils/graph.js";
/*
* @param bartStations - a list of all of the BART stations
* @param bartRoutes - a list of all of the BART routes (including names, abbreviations, colors, directions, and the stations on them)
* @param beginningStation - the station the user is starting at for the path
* @param endingStation - the station the user is ending at for the path
* @return returns the shortest path from the beginning to the ending stations as calculated by Djikstra's algorithm
*/ 
export default function routeFindingAlgorithm({
		bartStations,
		bartRoutes
	},
	beginningStation,
	endingStation
) {
	let stations = bartStations;
	let bartRouteGraph = new Graph();
	let i = 0;
	let istransfer = false;
	let transferstations = ["MCAR", "19TH", "COLS", "BAYF", "BALB"];
	while (stations[i]) {
		istransfer = false;
		for (let j = 0; j < transferstations.length; j++) {
			if (transferstations[j] == stations[i].abbr) { // evaluates if the current station is a transfer station
				istransfer = true;
			}
		}
		let graphnode = new Graph.gnode(stations[i].abbr, istransfer);
		bartRouteGraph.addNode(graphnode); // adds every station to node array in graph
		i++;
	}
	let routes = bartRoutes;
	let j = 0;
	while (routes[j]) {
		let endpoints = routes[j].config.station; // all of the stations on a route
		let color = routes[j].color; // the color of the route
		let direction = routes[j].direction; // the direction (North or South) of the route
		let route = routes[j].name;
		for (let i = 0; i < endpoints.length; i++) {
			// looks at direct edges (i.e. no transfers)
			let start = endpoints[i];
			let end = endpoints[i + 1]; // edge immediately after
			let graphedge = new Graph.gedge(start, end, 0, color, direction); // weight is 0 because weight represents transfers & it is direct
			bartRouteGraph.addEdge(graphedge);
		}
		j++;
	}
	let x = 0;
	let transfertest = {};
	while (routes[x]) {
		let endpoints = routes[x].config.station;
		let color = routes[x].color;
		transfertest[color] = [];
		for (let i = 0; i < endpoints.length; i++) {
			let start = endpoints[i];
			for (let m = 0; m < transferstations.length; m++) {
				if (transferstations[m] === start) {
					transfertest[color].push(start); // adds the transfer station on a route to the list of stations on the route
				}
			}
		}
		x++;
	}
	for (let i = 0; i < routes.length; i++) {
		let color = routes[i].color;
		let direction = routes[i].direction;
		for (let j = 0; j < transfertest[color].length; j++) { // every transfer station on a route
			let start = transfertest[color][j];
			let transferedge = new Graph.gedge(
				start,
				start,
				1,
				color,
				direction
			);
			bartRouteGraph.addEdge(transferedge);
		}
	}
	return bartRouteGraph.djikstras(beginningStation, endingStation);
}