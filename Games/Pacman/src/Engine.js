import Pacman from "./Pacman.js";
import Tilemap from "./Tilemap.js";
import { oneSec,frameRate,difficulty, timeForFrame, infinite } from "./Constants.js"
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

    for(let i = 0;i<numEnemies;i++){
        //generate some random non intersecting positions for enemy
        let enemy = new Enemy(4,3,tileSystem,ctx,pacman);
        enemies.push(enemy);
    }

    //resize the canvas according to designed map
    tileSystem.setSurfSize(surf);

    const gameLoop = () => {
        console.log("Game loop running...");
        tileSystem.draw();
        pacman.work();
        for(let i = 0;i<numEnemies;i++){
            enemies[i].work();
            if(enemies[i].didCollideWithPacman() && timeBetwenLastCollission >= 1){
                //alert("Life gone!");
                timeBetwenLastCollission = 0;
                pacman.handleDamage();
            }
        }
        if(pacman.isGameOver){
            if(playOnce){
                goSound.play();
                playOnce = false;
            }
        }
        timeBetwenLastCollission += timeForFrame;
    }

    setInterval(gameLoop, oneSec/frameRate);
}