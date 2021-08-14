import Pacman from "./Pacman.js";
import Tilemap from "./Tilemap.js";
import { oneSec,frameRate,difficulty, timeForFrame, infinite, powerdotNil } from "./Constants.js"
import Enemy from "./Enemy.js";

window.onload = ()=>{
    const surf = document.getElementById("gameSurf");
    const ctx = surf.getContext("2d");

    //ui panel
    const uiSurf = document.getElementById("uiSurf");
    const uictx = uiSurf.getContext("2d");
    //alert(uictx)

    const tileSystem = new Tilemap(ctx);
    const pacman = new Pacman(ctx,null,null,tileSystem,uictx,uiSurf);

    //create an array of enemies
    let enemies = [];
    //config for each difficulty level
    let numEnemies = 1;
    let health = 0;
    //set config
    switch(difficulty){
        case 1:
            numEnemies = 1;
            health = 1;
            break;
    }

    //gameover sound 
    let goSound = new Audio("../assets/gameover.wav");
    let playOnce = true;
    let timeBetwenLastCollission = infinite;

    //eating enemy sound
    let eatEnemy = new Audio("../assets/eatenemy.mp3");

    for(let i = 0;i<numEnemies;i++){
        //generate some random non intersecting positions for enemy
        let enemy = new Enemy(4,3,tileSystem,ctx,pacman);
        enemies.push(enemy);
    }

    //resize the canvas according to designed map
    tileSystem.setSurfSize(surf);

    const gameLoop = () => {
        if(pacman.isGameOver == false){
            console.log("Game loop running...");
            tileSystem.draw();
            pacman.work();
            //temp array
            let temp = [];
            for(let i = 0;i<enemies.length;i++){
                enemies[i].work();
                //if powerdot is not active then enemy eats pacman
                if(enemies[i].didCollideWithPacman() && pacman.powerdotState === powerdotNil && timeBetwenLastCollission >= 1){
                    temp.push(enemies[i]);
                    //alert("Life gone!");
                    timeBetwenLastCollission = 0;
                    pacman.handleDamage();
                }
                //if powerdot is active,pacman eats enemy
                else if(enemies[i].didCollideWithPacman() && pacman.powerdotState !== powerdotNil){
                    pacman.score += 10;
                    eatEnemy.play();
                }
                //if not eaten let it stay
                else{
                    temp.push(enemies[i]);
                }
            }
            //discrard enemy only when its is eaten by pacman.Hence dont include in temp array
            enemies = temp 

            //winning
            if(!pacman.isGameOver && enemies.length===0){
                //draw game winnig screen
            }

            //loosing
            if(pacman.isGameOver){
                if(playOnce){
                    goSound.play();
                    //draw game over screen
                    playOnce = false;
                }
            }
            timeBetwenLastCollission += timeForFrame;
        }else{
            ctx.drawImage()
        }
    }

    setInterval(gameLoop, oneSec/frameRate);
}