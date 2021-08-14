import Pacman from "./Pacman.js";
import Tilemap from "./Tilemap.js";

const frameRate = 60;
const oneSec = 1000; //in msec
const tileSize = 32; //in px

window.onload = ()=>{
    const surf = document.getElementById("gameSurf");
    const ctx = surf.getContext("2d");
    const tileSystem = new Tilemap(ctx);
    const pacman = new Pacman(ctx,null,null);

    //resize the canvas according to designed map
    tileSystem.setSurfSize(surf);

    const gameLoop = () => {
        console.log("Game loop running...");
        tileSystem.draw();
        pacman.draw();
    }

    setInterval(gameLoop, oneSec/frameRate);
}