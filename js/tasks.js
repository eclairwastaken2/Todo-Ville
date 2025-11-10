import { saveTasks as saveToStorage, loadTasks as loadFromStorage } from "./storage.js";

export class TaskManager {
    constructor(taskInput, addBtn, taskList, onUpdateState, modal, modalWarning) {
        this.taskInput = taskInput;
        this.addBtn = addBtn;
        this.taskList = taskList;
        this.tasks = [];
        this.onUpdateState = onUpdateState;
        this.modal = modal; 

        this.addBtn.addEventListener('click', () => {
            this.addTask(); 
        });
        this.taskInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    addTask() {
        const value = this.taskInput.value.trim();
        if (!value) {
            if(this.modalWarning) 
                this.modalWarning.innerHTML = "input an entry please :)";
            return;
        }
        this.tasks.push(value);
        this.saveTasks();
        this.renderTasks();
        this.onUpdateState("attack", true);
        this.modal.style.display = 'none'; 
        this.taskInput.value = ""; 
        if(this.modalWarning) 
            this.modalWarning.innerHTML = "";
    }

    completeTask(i) {
        this.tasks.splice(i, 1);
        this.saveTasks();
        this.renderTasks();
        this.onUpdateState('jump', true);
        if (this.onTaskComplete) this.onTaskComplete(20);
    }

    renderTasks() {
        const { tasks, taskList } = this;
        taskList.style.display = tasks.length > 0 ? 'block' : 'none';
        taskList.innerHTML = '';

        tasks.forEach((task, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${task}</td>
                <td><button class="btn">done</button></td>
            `;
            tr.querySelector('button').onclick = () => this.completeTask(i);
            taskList.appendChild(tr);
        });
    }

    saveTasks() {
        saveToStorage(this.tasks);
    }

    loadTasks() {
        loadFromStorage(loaded => {
            this.tasks = loaded;
            this.renderTasks();
        });
    }
}