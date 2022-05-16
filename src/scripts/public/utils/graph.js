import MinHeap from "./heap.js";

class Graph{
    /*
    * Represents a node in the Graph
    * @constructor
    * @param label - the label attached to the node
    */
    static gnode = class{
        constructor(label, isTransfer){
            this.label = label;
            this.isTransfer = isTransfer

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
        constructor(start,end,weight,color,direction){
            this.start = start;
            this.end = end; 
            this.weight = parseInt(weight);
            this.color = color;
            this.direction = direction
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
        this.edges[edge.start].push({start: edge.start, end: edge.end, weight: edge.weight, direction: edge.direction, color: edge.color})
    }
    djikstras(start,end){
        let costs={};
        let backtrace = {};
        let backcosts = {};
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
            let transferfee = 0
            let currstation = shortest[0]
            for(let i = 0; i < this.edges[currstation].length;i++){
                let neighbor = this.edges[currstation][i]
                for(let j = 0; j < this.nodes.length; j++){
              
                    if(this.nodes[j].label == currstation){
                        
                        if(this.nodes[j].isTransfer == true){
                            transferfee = 1
                        }
                    }
                }
                let cost= costs[currstation] + neighbor.weight;
             
                if(cost < costs[neighbor.end]){
                    costs[neighbor.end] = cost;
                    backtrace[neighbor.end] = currstation
                    backcosts[neighbor.end] = cost + transferfee
                    mh.add([neighbor.end,costs])
                
                }
            }
            
        }
        let path = [end]
        let last = end
        let totalcost = 0
        while (last != start){
            path.unshift(backtrace[last])
            totalcost = totalcost+ + backcosts[last]
            last = backtrace[last]
        }
        return path
       
    }
}

export {Graph};
