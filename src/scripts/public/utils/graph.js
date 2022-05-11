import MinHeap from "./heap.js";

class Graph{
    /*
    * Represents a node in the Graph
    * @constructor
    * @param label - the label attached to the node
    */
    static gnode = class{
        constructor(label){
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
    static gedge = class{
        constructor(start,end,weight){
            this.start = start;
            this.end = end; 
            this.weight = parseInt(weight);
        }
    }
    /*
    * The graph itself
    * @constructor
    */
    constructor(){
        this.edges = {};
        this.nodes = [];
    }
    // adds a node to the graph's node array
    // Big Oh: O(1)
    addNode(node){
        this.nodes.push(node)
    }
    // adds an edge to the graph's edge object at the index of the starting node
    // Big Oh: O(1)
    addEdge(edge){
        if(typeof this.edges[edge.start]== "undefined"){
            this.edges[edge.start] = []
        }
        this.edges[edge.start].push({start: edge.start, end: edge.end, weight: edge.weight, direction: edge.direction, color: edge.color, route: edge.route})
    }
    djikstras(start,end){
        let costs={};
        let backtrace = {};
        let mh = new MinHeap(function comparator(a,b){
            if(a != null && b!= null){
                if(a[1] < b[1]){
                    return -1;
                }
                if(a[1] == b[1]){
                    return 0;
                }
                if(a[1] > b[1]){
                    return 1;
                }
            }
        })
        costs[start] = 0;
        
        for(let i = 0; i < this.nodes.length; i++){
            if(this.nodes[i].label != start){
               
                costs[this.nodes[i].label] = Infinity
                
            }
        }
        //console.log(costs["12TH"])
        mh.add([start,0])
        while(mh.isEmpty()!=true){
            let shortest = mh.remove()
       
            let currstation = shortest[0]
            for(let i = 0; i < this.edges[currstation].length;i++){
                let neighbor = this.edges[currstation][i]
                let cost= costs[currstation] + neighbor.weight;
                if(cost < costs[neighbor.end]){
                    costs[neighbor.end] = cost;
                    backtrace[neighbor.end] = currstation
                    mh.add([neighbor.end,costs])
                
                }
            }
            
        }
        let path = [end]
        let last = end
        while (last != start){
            path.unshift(backtrace[last])
            last = backtrace[last]
        }
        console.log(path)
       
    }
    /*
    * Runs Djikstra's algorithm
    * On completion, outputs path from node A to node F and its cost to the console
    */
   /* djikstras(startlabel,endlabel){
       let start = null
        for(let i = 0; i < this.nodes.length; i++){
            if(this.nodes[i].label == startlabel){
                start = this.nodes[i]
            }
        }
        let end = this.nodes[this.nodes.length-1]
        for(let i = 0; i < this.nodes.length; i++){
            if(this.nodes[i].label == endlabel){
                end = this.nodes[i]
            }
        }
        let costs = {}
        let back = {}
        let backcosts = {}
        let mh = new MinHeap(function comparator(a,b){
            if(a != null && b!= null){
                if(a[1] < b[1]){
                    return -1;
                }
                if(a[1] == b[1]){
                    return 0;
                }
                if(a[1] > b[1]){
                    return 1;
                }
            }
        })
        mh.add([start.label,0])
        
        costs[start.label] = 0;
        for(let i = 0; i<this.nodes.length; i++){
            if(this.nodes[i].label!=start.label){
                costs[this.nodes[i].label]=Infinity
            }
        }
        console.log("IS EMPTY", mh.isEmpty())
        while(mh.isEmpty()!= true){
            let shortest = mh.remove()
            let curr = shortest[0]
            for(let i = 0; i < this.edges[curr].length; i++){
                
                let neighbor = this.edges[curr][i]
                console.log(neighbor)
                let cost = costs[curr]+ + neighbor.weight
                if(cost <= costs[neighbor.end]){
                    if(neighbor.end != curr){ // checking if self-referential
                        costs[neighbor.end] = cost
                        back[neighbor.end] = curr
                        backcosts[neighbor.end] = neighbor.weight
                        mh.add([neighbor.end, cost])
                    } 
                }
            }
        }
        let totalcost = 0
        let path = [end.label]
        let last = end.label
        while(last != start.label){
            path.unshift(back[last])
            totalcost = totalcost+ +backcosts[last]
            last = back[last]
        }
        let outputarr = []
        outputarr.push(path)
        outputarr.push(totalcost)
        return (outputarr);
        
    }*/
    /*
    * Run's Prim's Algorithm
    * On completion, outputs adjacency matrix of minimum spanning tree as calculated by Prim's to the console
    */
    prims(){
        let MST = new Graph();
        let edgeheap = new MinHeap(function comparator(a,b){
            if( a!= null && b!= null){
                if(a.weight < b.weight){
                    return -1;
                }
                if(a.weight == b.weight){
                    return 0;
                }
                if(a.weight > b.weight){
                    return 1;
                }
            }
        })
        let visited = [];
        let edges = []
        let start = this.nodes[0].label
        visited.push(start)
        while(visited.length < this.nodes.length){
            for(let i = 0; i < this.edges[start].length; i++){
                edgeheap.add(this.edges[start][i])                 
            }
            let curr = edgeheap.remove()
            while (visited.includes(curr.end)){
                curr = edgeheap.remove()
            }
            visited.push(curr.end)
            edges.push(curr)
            start = curr.end
        }
        for(let i = 0; i < visited.length; i++){
           let newnode = new Graph.gnode(visited[i])
           MST.addNode(newnode)
        }
        for(let i = 0; i < edges.length; i++){
            MST.addEdge(edges[i])
            }
     return MST;
    }
}

export {Graph};
