import { tileSize,oneSec, WALL,enemyVelocity,up,down,left,right, timeForFrame } from "./Constants.js";


export default class Enemy {
    constructor(i,j,tileMap,ctx){
        this.i = i;
        this.j = j;
        this.tileMap = tileMap;
        this.ctx = ctx;
        this.skipCounter = 0;

        //behaviour state
        this.currBehState = 0;
        //starting direction of movement
        this.currMovDir = right;
        //change direction after random amount time
        this.dirTimer = this.#random(1,5);

        //animation state
        this.currAnimState = 0;
        this.states = this.#loadImages();
        setInterval(() => {
            this.currAnimState = (this.currAnimState+1)%4;
        }, oneSec/5);
    }

    //random value between min and max
    #random(min,max) {
        return min + Math.floor(Math.random(min,max)+1)
    }

    #loadImages(){
        let states = [];
        for(let i = 1;i<=6;i++){
            let state = new Image();
            state.src = `../assets/enemy-1-${i}.png`;
            states.push(state);
        }
        return states;
    }

    fetchAnimFrame(){
        return this.states[this.currAnimState];
    }

    work(){
        //move enemy based on the randomly changing direction
        //if movement in currDir doesnt make it collide
        if(this.skipCounter%20==0 && !this.tileMap.willCollideWith(WALL,this.j,this.i,this.currMovDir)){
            let I = this.i;
            let J = this.j;
            //alert(`row:${I},col:${J}`)

            //alert("Curr move dir " + this.currMovDir)
            switch(this.currMovDir){
                case up:
                    I -= enemyVelocity;
                    break;
                case down:
                    I += enemyVelocity;
                    break;
                case left:
                    //console.log("Moving left...");
                    J -= enemyVelocity;
                    break;
                case right:
                    //alert("Moving right...");
                    J += enemyVelocity;
                    break;
                default:
                    console.log("No way this is possible...");
                    break;
            }

            if( this.tileMap.visualGrid[I][J] !== WALL){
                this.i = I;
                this.j = J;
            }
            
        }
        //move once in 20 frames
        this.skipCounter = (this.skipCounter+1)%20;

        //manual timer to change dir
        this.dirTimer -= timeForFrame;
        console.log(this.dirTimer);
        //reset timer if it becomes zero
        if(this.dirTimer < 0) this.dirTimer = 0;
        if(this.dirTimer == 0){
            this.currMovDir = Math.floor(Math.random()*4);
            this.dirTimer = this.#random(1,5);
            //alert(this.dirTimer);
        };

        //drawing
        this.ctx.drawImage(this.fetchAnimFrame(),this.j*tileSize,this.i*tileSize);
    }
}