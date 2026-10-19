const edges = [
    { source: "A", destination: "B", weight: 10 },
    { source: "A", destination: "C", weight: 6 },
    { source: "A", destination: "D", weight: 5 },
    { source: "B", destination: "D", weight: 15 },
    { source: "C", destination: "D", weight: 4 },
    

];

console.log("Office Network Connections:");

edges.forEach(edge =>{
    console.log(
        `${edge.source} - ${edge.destination}: ${edge.weight}`
    );
});

edges.sort((a,b) => a.weight - b.weight);

console.log("\nConnections sorted by cost")

edges.forEach(edge =>{
    console.log(
        `${edge.source} - ${edge.destination}: ${edge.weight}`
    );
});

class UnionFind{
    constructor(vertices){
        this.parent ={};

        vertices.forEach(vertex => {
            this.parent[vertex] =vertex;

        });
    } 

    find (vertex){
        if(this.parent[vertex] === vertex){
            return vertex;
        }
        return this.find(this.parent[vertex]);
    }
    union(vertex1, vertex2){
        const root1 = this.find(vertex1);
        const root2 = this.find(vertex2);

        if(root1 === root2){
            return false;
        }

        this.parent[root2] = root1;
        return true;
    }
}

function kruskalMST(vertices,edges){ 
    const unionFind = new UnionFind(vertices);
    const mst = [];
    let totalCost = 0;

    //processing the edges from the cheapest to the most expensive
    edges.sort((a,b)=> a.weight - b.weight);

    for(const edge of edges){
        if(unionFind.union(edge.source,edge.destination)){
            mst.push(edge);
            totalCost += edge.weight;
        }

        //To stop when all vertices are connected
        if(mst.length === vertices.length -1 ){
            break;
        }
    }
    console.log("\nMinimum Spanning Tree:");

    mst.forEach(edge =>{
        console.log(
           `${edge.source} - ${edge.destination}: ${edge.weight}` 
        );
    });
    console.log("Total Network Cost:", totalCost);

    return {mst, totalCost};
}

const vertices =["A", "B", "C", "D"];
kruskalMST(vertices, edges);
