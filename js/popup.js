import { StateManager } from "./stateManager.js";
import { TaskManager } from "./tasks.js";
import { XPManager } from "./xp.js";

// character and bg setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); 
const manager = new StateManager(ctx);  

const canvasBg = document.getElementById("gameBg");
const ctxBg = canvasBg.getContext("2d");
const bgImage = new Image();
bgImage.src = "../sprites/background/enchantbg.png";

// to do set up
const taskInput = document.getElementById("taskInput"); 
const addBtn = document.getElementById("addBtn"); 
const taskList = document.getElementById("taskList"); 
const modal = document.getElementById('entryModal');
const modalWarning = document.getElementById('modalWarning');

const taskManager = new TaskManager(taskInput, addBtn, taskList, (state, revertToIdle) => {manager.setState(state, revertToIdle);}, modal, modalWarning);

// xp set up
const canvasLevel = document.getElementById("levelCanvas"); 
const ctxXp = canvasLevel.getContext("2d");  
const canvasStats = document.getElementById("levelStatsCanvas"); 
const ctxStats = canvasStats.getContext("2d");

const xpManager = new XPManager(ctxXp, ctxStats, canvasLevel.width, canvasLevel.height); 


bgImage.onload = () => {
  ctxBg.drawImage(bgImage, 0, 0, canvasBg.width, canvasBg.height);
};

function loop(timestamp) {
    manager.update(timestamp); 
    requestAnimationFrame(loop); 
}
requestAnimationFrame(loop); 

// task manager
taskManager.onTaskComplete = (xp) => xpManager.addXp(xp);
taskManager.loadTasks(); 
xpManager.load(); 