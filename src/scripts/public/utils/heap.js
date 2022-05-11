// PRIORITY QUEUE // HEAP
class MinHeap{
    static heapNode = class {
        /*
        * Represents a node in the minHeap
        * @constructor
        * @param data - the data (ex: a character) of the node
        * @param freq - the frequency of the character in the input
        */
        constructor(data,freq){
           this.freq = freq;
           this.data = data;
           this.left = null;
           this.right = null;
           if(this.data = "     "){
                this.data = "TAB"
           }
           if(this.data = "/n"){
               this.data = "BREAK"
           }
        }
     }
    #heap = []
    /*
    * Represents a minHeap
    * @constructor
    * @param comparator - the comparator function that determines the way that the heap is sorted
    */
    constructor( comparator ) {
        if( comparator !== null ){
           this.#comparator = comparator;
        }
       } 
    #comparator = function(a,b){
        throw "Comparator not defined!"
    }
    get length(){
        return this.#heap.length;
    }
    /*
    Adds a node to the heap
    * @param the node to be added
    * Big Oh: O(logn)
    */
    add(node){
        this.#heap.push(node)
        if(this.#heap.length > 1){
            let curr = this.#heap.length-1;
            //console.log(this.#heap[Math.floor(curr/2)].weight, node.weight,this.#comparator(this.#heap[Math.floor(curr/2)],node))
           // console.log(this.#comparator(this.#heap[Math.floor(curr/2)].weight,node.weight))
            while(curr >= 1 && this.#comparator(this.#heap[Math.floor(curr/2)],this.#heap[curr])>0){
                let temp = this.#heap[Math.floor(curr/2)]
                this.#heap[Math.floor(curr/2)] = this.#heap[curr]
                this.#heap[curr] = temp;
                curr = Math.floor(curr/2)
            }
        }
    }
    /*
    * Removes topmost node from the heap
    * Big Oh: O(log n) - since it calls heapify down
    */
    remove(){ // switch root node with furthest, rightmost node, and then delete the new furthest rightmost node and heapify up
        if( this.#heap.length == 0 ){
            return null;
        }
        let min = this.#heap[0];
        let end = this.#heap.pop()
        if( this.#heap.length > 0 ){
            this.#heap[0] = end;
            this.#heapifyDown(this.#heap,0)
        }
        return min;
    }
    /*
    *Sorts heap so that it follows the rules of a heap (i.e. in a min heap every child is greater than its parent)
    *@param arr - the heap to be sorted
    *@param index - the index at which point to start sorting the heap
    * Big OH: O(log n)
    */
    #heapifyDown(arr,index){
        let smallest = index;
        let leftindex = (index*2)+1
        let rightindex = (index*2)+2
        if(leftindex < arr.length){
            if(this.#comparator(arr[leftindex],arr[smallest]) < 0) {smallest = leftindex;}
            if(rightindex < arr.length){
                if(this.#comparator(arr[rightindex],arr[smallest]) < 0) {smallest = rightindex;}
            }
        }
        if(smallest === index){
            return;
        } 
        let tmp = arr[index]
        arr[index] = arr[smallest]
        arr[smallest] = tmp
        this.#heapifyDown(arr,smallest)
    }
    /*
    * Returns root node of heap
    * Big Oh: O(1)
    */
    peek(){
        return this.#heap[0]
    }
    /*
    *Evaluates whether or not heap is empty
    * Big Oh: O(1)
    */
    isEmpty(){
        if(this.#heap[0] != null){
            return false;
        }
        else{
            return true;
        }
    }
    /*
    *Returns the heap
    * Big Oh: O(1)
    */
    printHeap(){
        return this.#heap
    }
      
}

export default MinHeap;
