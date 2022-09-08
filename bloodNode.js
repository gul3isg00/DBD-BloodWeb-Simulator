class bloodNode {
    constructor(item, cost, layer) {
        this.item = item;
        if (cost == 0 || cost == 2000 || cost == 2500 || cost == 3250 || cost == 4000 || cost == 5000) { this.cost = cost; }
        this.connectedNodes = [];
        this.layer = layer;
        this.x = 0;
        this.y = 0;
    }

    getNumOfConnections()
    {
        return this.connectedNodes.length;
    }


    getConnectedNodes()
    {
        return this.connectedNodes;
    }


    getCost()
    {
        return this.cost;
    }

    setX(x)
    {
        this.x = x;
    }

    setY(y)
    {
        this.y = y;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }
    
    getItem()
    {
        return this.item;
    }

    addBloodEdge(newNode) {
        if (newNode == null) { return; }
        if (this.getNumOfConnections() < 6) {this.connectedNodes.push(newNode); }
    }
}