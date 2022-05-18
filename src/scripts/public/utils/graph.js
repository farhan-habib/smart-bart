import MinHeap from "./heap.js";

class Graph {
	/*
	 * Represents a node in the Graph
	 * @constructor
	 * @param label - the label attached to the node
	 */
	static gnode = class {
		constructor(label) {
			this.label = label;
			this.transfers = []
		}
	}
	/*
	 * Represents an edge in the Graph
	 * @constructor
	 * @param start - the starting node of the edge
	 * @param end - the ending node of the edge
	 * @param weight - the weight of the edge
	 */
	static gedge = class {
		constructor(start, end, weight) {
			this.start = start;
			this.end = end;
			this.weight = parseInt(weight);
		}
	}
	/*
	 * The graph itself
	 * @constructor
	 */
	constructor() {
		this.edges = {};
		this.nodes = [];
	}
	// adds a node to the graph's node array
	// Big Oh: O(1)
	addNode(node) {
		this.nodes.push(node)
	}
	// adds an edge to the graph's edge object at the index of the starting node
	// Big Oh: O(1)
	addEdge(edge) {
		if (typeof this.edges[edge.start] == "undefined") {
			this.edges[edge.start] = []
		}
		this.edges[edge.start].push({
			start: edge.start,
			end: edge.end,
			weight: edge.weight,
			direction: edge.direction,
			color: edge.color,
			route: edge.route
		})
	}
	/*
	 * Djikstra's Algorithm
	 * @param start - the starting node of the path
	 * @param end - the ending node of the path
	 * @return returns the path using the least number of stations between the start and the end as a list of every station
	 * 
	 */
	djikstras(start, end) {
		let costs = {};
		let backtrace = {};
		let mh = new MinHeap(function comparator(a, b) {
			if (a != null && b != null) {
				if (a[1] < b[1]) {
					return -1;
				}
				if (a[1] == b[1]) {
					return 0;
				}
				if (a[1] > b[1]) {
					return 1;
				}
			}
		})
		costs[start] = 0; // cost of the starting node is 0
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].label != start) { // makes the cost of every node except the starting node infinity
				costs[this.nodes[i].label] = Infinity
			}
		}
		mh.add([start, 0])
		while (mh.isEmpty() != true) { // will look at the [node,cost] pair with the lowest cost
			let shortest = mh.remove()
			let currstation = shortest[0]
			for (let i = 0; i < this.edges[currstation].length; i++) { // looks at every edge starting from the current station
				let neighbor = this.edges[currstation][i]
				let cost = costs[currstation] + neighbor.weight;
				if (cost < costs[neighbor.end]) { // if the current stored cost is more than the cost using the edge information
					costs[neighbor.end] = cost; 
					backtrace[neighbor.end] = currstation
					mh.add([neighbor.end, costs])
				}
			}
		}
		let path = [end]
		let last = end
		while (last != start) {
			path.unshift(backtrace[last])
			last = backtrace[last]
		}
		return (path)
	}
}
export {
	Graph
};