const WALL = 1;
const ORB1 = 0;
const PACMAN = 2;   
import { tileSize } from "./Constants.js";

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

    //private method
    #drawTile(i,j,aTile){
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