import { tileSize,up,down,left,right,keycodes,velocity, WALL } from "./Constants.js";

export default class Pacman{
    //x,y - world pos
    constructor(ctx,x,y,tileMap){
        //world pos
        this.x = x;
        this.y = y;
        this.#initPos();
        
        //for drawing purpose
        console.log("Pacman ctx " + ctx);
        this.ctx = ctx;
        this.tileMap = tileMap;

        //for animation purpose
        this.currState = 0;
        this.states = this.#loadImages();

        //for movement
        this.currMovDir = null;
        this.chkNxtMovDir = null;
        //register any keyboard down movement to move player
        document.addEventListener("keydown",this.#handleKeyDown);
    }

     //moving to a new dir is allowed only if pacman is completely inside the grid and not halfway through it and not colliding.
     #move(){
        //conditions to move pacman
        let cond1 = this.currMovDir !== this.chkNxtMovDir;
        let cond2 = this.x%tileSize === 0 && this.y%tileSize === 0;
        let cond3 = !(this.tileMap.willCollideWith(WALL,this.y,this.x,this.chkNxtMovDir));

        if(cond1 && cond2 && cond3){
           // this.currMovDir = this.chkNxtMovDir;
        }

        //check if pacman wants to move in a new dir
        if(this.currMovDir !== this.chkNxtMovDir){
            alert("wants to move...");
            //if yes,check if its completely inside a grid
            if(this.x%tileSize === 0 && this.y%tileSize === 0){
                alert("Yes inside grid block...")
                //if yes,check for collission and change dir
                if(!this.tileMap.willCollideWith(WALL,this.y,this.x,this.chkNxtMovDir)){
                    alert("No collission..");
                    //if no collission,then change currdir to new dir
                    this.currMovDir = this.chkNxtMovDir;
                }else alert("Collision..."); 
            }
        } 

        //move the pacman in the currDir
        //alert("Curr mov dir " + this.currMovDir)
        switch(this.currMovDir){
            case up:
                this.y -= velocity;
                break;
            case down:
                this.y += velocity;
                break;
            case left:
                console.log("Moving left...");
                this.x -= velocity;
                break;
            case right:
                alert("Moving right...");
                this.x += velocity;
                break;
            default:
                console.log("No way this is possible...");
                break;
        }
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
        alert("right move...");
        //if moving to left currenlty,only then we can definetly move to the right.
        if(this.currMovDir == left)
            this.currMovDir = right;
        //else check for collision
        this.chkNxtMovDir = right;
        alert("Check next move dir " + this.chkNxtMovDir);
        this.#move();
    }

    #downMov(){
        if(this.currMovDir == up)
           this.currMovDir = down;
        this.chkNxtMovDir = down;
        this.#move();
    }

    #upMov(){
        if(this.currMovDir == down)
           this.currMovDir = up;
        this.chkNxtMovDir = up;
        this.#move();
    }

    //using arrow function since we want "this" to be the pacman obj and not the dom
    #handleKeyDown = (event)=> {
        //alert(event.keyCode);
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
                alert("Pressed d....")
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