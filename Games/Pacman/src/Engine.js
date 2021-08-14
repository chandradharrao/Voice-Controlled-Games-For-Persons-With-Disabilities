import Pacman from "./Pacman.js";
import Tilemap from "./Tilemap.js";
import { oneSec,frameRate,difficulty } from "./Constants.js"
import Enemy from "./Enemy.js";

window.onload = ()=>{
    const surf = document.getElementById("gameSurf");
    const ctx = surf.getContext("2d");
    const tileSystem = new Tilemap(ctx);
    const pacman = new Pacman(ctx,null,null,tileSystem);

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

    for(let i = 0;i<numEnemies;i++){
        //generate some random non intersecting positions for enemy
        let enemy = new Enemy(4,3,tileSystem,ctx);
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
        }

    }

    setInterval(gameLoop, oneSec/frameRate);
}