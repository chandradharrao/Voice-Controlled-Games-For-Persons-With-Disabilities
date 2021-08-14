import { tileSize,up,down,left,right,keycodes,velocity } from "./Constants.js";
export default class Pacman{
    //x,y - world pos
    constructor(ctx,x,y){
        //world pos
        this.x = x;
        this.y = y;
        this.#initPos();
        
        //for drawing purpose
        console.log("Pacman ctx " + ctx);
        this.ctx = ctx;
       // this.tileMap = tileMap;

        //for animation purpose
        this.currState = 0;
        this.states = this.#loadImages();

        //for movement
        this.currMovDir = null;
        this.chkNxtMovDir = null;
        //register any keyboard down movement to move player
        document.addEventListener("keydown",this.#handleKeyDown);
    }

    //private methods
    #leftMov(){
        //if we are moving in the right dir currenlty,only then definetly we can move to thr right since we cam from the left
        if(this.currMovDir === right)
            this.currMovDir = left;
        //Else we need to check for collisions in the req dir
        this.chkNxtMovDir = left;
        this.#move();
    }

    #rightMov(){
        //if moving to left currenlty,only then we can definetly move to the right.
        if(this.currMovDir == left)
            this.currMovDir = right;
        //else check for collision
        this.chkNxtMovDir = right;
    }

    #downMov(){
        if(this.currMovDir == up)
           this.currMovDir = down;
        this.chkNxtMovDir = down;
    }

    #upMov(){
        if(this.currMovDir == down)
           this.currMovDir = up;
        this.chkNxtMovDir = up;
    }

    //moving to a new dir is allowed only if pacman is completely inside the grid and not halfway through it.
    #move(){
        //check if pacman wants to move in a new dir
        if(this.currMovDir !== this.chkNxtMovDir){
            //if yes,check if its completely inside a grid
            if(this.x%tileSize === 0 && this.y%tileSize === 0){
                //if yes,check for collission and change dir
                //if no collission,then change currdir to new dir
                this.currMovDir = this.chkNxtMovDir;
            }
        }

        //move the pacman in the currDir
        switch(this.currMovDir){
            case up:
                this.y -= velocity;
                break;
            case down:
                this.y += velocity;
                break;
            case left:
                this.x -= velocity;
                break;
            case right:
                this.x += velocity;
                break;
        }
    }

    #handleKeyDown(event){
        switch(event.keyCode){
            case keycodes.w:
                this.#upMov();
                break;
            case keycodes.a:
                this.#leftMov();
                break;
            case keycodes.s:
                this.#downMov();
                break;
            case keycodes.d:
                this.#rightMov();
                break;
            default:
                //continue currState itself
                this.chkNxtMovDir = this.currMovDir;
                break;
        }
    }

    #loadImages(){
        const state0 = new Image();
        state0.src = "../assets/pacman-1.png";

        const state1 = new Image();
        state1.src = "../assets/pacman-2.png";

        const state2 = new Image();
        state2.src = "../assets/pacman-3.png";

        //for animation purpose
        return [state0,state1,state2];
    }

    #giveImage(){
        return this.states[this.currState];
    }

    //world pos
    #initPos(){
        if(this.x == null || this.y == null){
            this.x = 2*tileSize;
            this.y = 2*tileSize;
        }
    }

    draw(){
        this.ctx.drawImage(this.#giveImage(),this.x,this.y);
    }
}