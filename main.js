//Center - 1

//First ring - 6
//Second ring - 12
//Third ring - 12


let costs = [2000, 2500, 3250, 4000, 5000];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bloodWeb;

//360 degrees = 2*Math.PI
//Divide it by six to get all six points
const three6t = 2 * Math.PI;

function drawBloodWeb() {
    generateBloodweb(10);
    let x = 500;
    let y = 500;

    

    ctx.beginPath();
    ctx.arc(x,y,25,0,2*Math.PI);
    ctx.fillStyle = "#D90500";
    ctx.fill(); 

    drawRing(x, y,300,12,3);

    ctx.translate(x, y);                
    ctx.rotate( (Math.PI / 180) * 15);  
    ctx.translate(-x, -y);             
  
    drawRing(x, y,200,12,2);

    ctx.translate(x, y);                
    ctx.rotate( (Math.PI / 180) * 15);  
    ctx.translate(-x, -y);  

    drawRing(x, y,100,6,1);
    for(let x=0;x!=bloodWeb.length;x++)
    {
     for(let y=0;y!=bloodWeb[x].length;y++)
     {
         for(let z=0;z!= bloodWeb[x][y].getNumOfConnections();z++)
         {
             ctx.beginPath();
             ctx.moveTo(bloodWeb[x][y].getX(),bloodWeb[x][y].getY());
             ctx.lineTo(bloodWeb[x][y].getConnectedNodes()[z].getX(),bloodWeb[x][y].getConnectedNodes()[z].getY());
             ctx.stroke();
         } 
     }
    }
}

function drawRing(x, y, radius,numberOfPoints,layer) {
    let a = three6t / numberOfPoints
    for (var i = 0; i < numberOfPoints; i++) {
        ctx.beginPath();
        let rx = x + radius * Math.cos(a * i);
        let ry =  y + radius * Math.sin(a * i);
        ctx.arc(rx, ry,25,0,2*Math.PI);
        if(bloodWeb[layer][i] != null)
        {
            bloodWeb[layer][i].setX(rx); bloodWeb[layer][i].setY(ry);
            if(bloodWeb[layer][i].getCost() == costs[0]){ctx.fillStyle = "#4A3A2B";}
            else if(bloodWeb[layer][i].getCost() == costs[1]){ctx.fillStyle = "#9D832E";}
            else if(bloodWeb[layer][i].getCost() == costs[2]){ctx.fillStyle = "#145718";}
            else if(bloodWeb[layer][i].getCost() == costs[3]){ctx.fillStyle = "#46215E";}
            else if(bloodWeb[layer][i].getCost() == costs[4]){ctx.fillStyle = "#A80E3B";}
            ctx.fill(); 
        }
    }
}

function generateBloodweb(numOfItems) {
    if (numOfItems > 30 || numOfItems < 1) { return; }
    bloodWeb = [[new bloodNode("Center", 0, 0)], [], [], []];

    let rings = [0, 0, 0];

    //generate ring sizes
    rings[1] = randomIntFromInterval(Math.ceil(numOfItems / 3.5 > 6 ? 6 : numOfItems / 3.5), (numOfItems > 6 ? 6 : numOfItems)); numOfItems = numOfItems - rings[1];
    if (numOfItems > 0) {
        rings[2] = randomIntFromInterval(Math.ceil(numOfItems / 2.5 > 12 ? 12 : numOfItems / 2.5), (numOfItems > 12 ? 12 : numOfItems)); numOfItems = numOfItems - rings[2];
        if (numOfItems > 0) { rings[3] = numOfItems; numOfItems = 0; }
    }
    // end of ring size generation

    console.log(rings);

    for (let x = 1; x != rings.length; x++) {
        for (let y = 0; y != rings[x]; y++) {
            let rarity = 0;

            if(x <= 1)
            {
                rarity = costs[weightedRandom(5,2,2,1,0)];
            }
            else if (x <=2)
            {
                rarity = costs[weightedRandom(2,2.75,3,2,0.25)];
            }
            else
            {
                rarity = costs[weightedRandom(1,3,3,2,1)];
            }
            console.log(rarity);
            let currentNode = new bloodNode("placeholder",rarity , x);

            let connectionNode;
            let found = false;
            while (!found) {
                let z = randomIntFromInterval(0, bloodWeb[x - 1].length - 1);
                if (bloodWeb[x - 1][z].getNumOfConnections() < 6) {
                    connectionNode = bloodWeb[x - 1][z];
                    found = true;
                }
                else {
                    z++;
                }
            }

            currentNode.addBloodEdge(connectionNode);
            connectionNode.addBloodEdge(currentNode);
            bloodWeb[x].push(currentNode);
        }
    }

    console.log(bloodWeb[0]);
    console.log(bloodWeb[1]);
    console.log(bloodWeb[2]);
    console.log(bloodWeb[3]);
}

function weightedRandom(b,y,g,p,i)
{
    if((b+y+g+p+i) == 10)
    {
        b=(b/10);
        y= (y/10)+b;
        g= (g/10)+y; 
        p= (p/10)+g; 
        i= (i/10)+p;
        let num = Math.random();
        if(num <= b){return 0;}
        if(num <= y){return 2;}
        if(num <= g){return 1;}
        if(num <= p){return 3;}
        if(num <= i){return 4;}
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

