
 
import { tileSize,WALL,ORB1,up,down,right,left,velocity } from "./Constants.js";

export default class Tilemap{
    constructor(ctx){
        this.ctx = ctx;

        this.orb1 = new Image();
        this.orb1.src = "../assets/orb.png"

        this.wall = new Image();
        this.wall.src = "../assets/wall.png"
    }

    visualGrid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,1,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    //collission checking function
    willCollideWith(entityID,x,y,toMoveDir){
        switch(toMoveDir){
            case up:
                y -= velocity;
                break;
            case down:
                y += velocity;
                break;
            case left:
                x -= velocity;
                break;
            case right:
                x += velocity;
                break;
            default:
                console.log("No way this is possible...");
                break;
        }

        let j = this.worldToGrid(x);
        let i = this.worldToGrid(y);
        alert("i coord " + i);
        alert("j coord " + j)
        return this.visualGrid[i][j] === entityID;
    }

    setSurfSize(surf){
        surf.width = this.visualGrid[0].length*tileSize;
        surf.height = this.visualGrid.length*tileSize;
    }

    draw(){
        console.log("Tiles drawing on");
        console.log("ctx" + this.ctx);
        //grid col#->x coord in world
        //grid row# ->y coord in world
        for(let i = 0;i<this.visualGrid.length;i++){
            for(let j = 0;j<this.visualGrid[i].length;j++){
                let aTile = this.visualGrid[i][j];
                this.#drawTile(i,j,aTile)
            }
        }
    }

    gridToWorld(k){
        return k*tileSize;
    }

    worldToGrid = (k) => {
        return Math.floor(k/32);
    }

    //private method
    #drawTile(i,j,aTile){
        this.ctx.clearRect(this.gridToWorld(j),this.gridToWorld(i),tileSize,tileSize);
        switch(aTile){
            case WALL:
                this.ctx.drawImage(this.wall,this.gridToWorld(j),this.gridToWorld(i))
                break;

            case ORB1:
                this.ctx.drawImage(this.orb1,this.gridToWorld(j),this.gridToWorld(i))
                break;
        }
    }
}