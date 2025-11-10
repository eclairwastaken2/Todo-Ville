import { saveXp, saveLevel, loadXp, loadLevel } from "./storage.js";

export class XPManager {
    constructor(barCtx, statsCtx, width, maxHeight) {
        this.barCtx = barCtx; 
        this.statsCtx = statsCtx; 
        this.level = 1; 
        this.xp = 0; 
        this.nextLevelXp = 100; 
        this.maxHeight = maxHeight;
        this.width = width; 

        this.drawBar(); 
    }

    addXp(amount) {
        this.xp += amount; 
        if (this.xp >= this.nextLevelXp) {
            this.level++; 
            this.xp -= this.nextLevelXp; 
            this.nextLevelXp = Math.floor(this.nextLevelXp * 1.35);
        }
        this.save(); 
        this.drawBar(); 
    }

    drawBar() {
        const barCtx = this.barCtx;
        const statsCtx = this.statsCtx; 
        const progress = this.xp / this.nextLevelXp * this.maxHeight;

        barCtx.clearRect(0, 0, this.width, this.maxHeight);
        barCtx.fillStyle = "#472416";
        barCtx.fillRect(0, 0, this.width, this.maxHeight);
        barCtx.fillStyle = "#40BD51";
        barCtx.fillRect(0, this.maxHeight - progress, this.width, progress);
        
        statsCtx.clearRect(0, 0, 200, 200);
        statsCtx.fillStyle = "#fff";
        statsCtx.strokeStyle = "black"; 
        statsCtx.lineWidth = 2; 
        statsCtx.font = "15px sans-serif";
        statsCtx.textAlign = "right";     
        statsCtx.textBaseline = "top";   
        const padding = 10;         
        const rightEdge = 200 - padding;

        statsCtx.strokeText(`Lv ${this.level}`, rightEdge, 10);
        statsCtx.fillText(`Lv ${this.level}`, rightEdge, 10);
        statsCtx.strokeText(`${this.xp} / ${this.nextLevelXp}`, rightEdge, 30);
        statsCtx.fillText(`${this.xp} / ${this.nextLevelXp}`, rightEdge, 30);
    }

    save() {
        saveLevel(this.level); 
        saveXp(this.xp); 
    }

    load() {
        loadXp(loaded => {
            this.xp = loaded; 
            this.drawBar(); 
        })

        loadLevel(loaded => {
            this.level = loaded; 
            this.drawBar(); 
        })
    }
}