
 
import { tileSize,WALL,ORB1,up,down,right,left,velocity, ORB2, NOITEM } from "./Constants.js";

export default class Tilemap{
    constructor(ctx){
        this.ctx = ctx;

        this.orb1 = new Image();
        this.orb1.src = "../assets/orb.png";

        this.wall = new Image();
        this.wall.src = "../assets/wall.png";

        this.noItem = new Image();
        this.noItem.src = "../assets/empty.png";
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

    //check if anything edible is present
    edibleAt(i,j){
        switch(this.visualGrid[i][j]){
            case ORB1:
                return ORB1;
            case ORB2:
                return ORB2;
            default:
                return null;
        }
    }

    //collission checking function given current index and toMove direction
    willCollideWith(entityID,j,i,toMoveDir){
        switch(toMoveDir){
            case up:
                i -= velocity;
                break;
            case down:
                i += velocity;
                break;
            case left:
                j -= velocity;
                break;
            case right:
                j += velocity;
                break;
            default:
                console.log("No way this is possible...");
                break;
        }
        //alert("i coord " + i);
        //alert("j coord " + j)
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

            case NOITEM:
                this.ctx.drawImage(this.noItem,this.gridToWorld(j),this.gridToWorld(i));
                break;
        }
    }
}