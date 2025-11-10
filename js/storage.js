export function saveTasks(tasks) {
    chrome.storage.local.set({ tasks });
}

export function loadTasks(callback) {
    chrome.storage.local.get('tasks', (data) => {
        callback(data.tasks || []);
    }); 
}

export function saveXp(xp) {
    chrome.storage.local.set({ xp }); 
}

export function saveLevel(level) {
    chrome.storage.local.set({ level }); 
}

export function loadXp(callback) {
    chrome.storage.local.get('xp', (data) => {
        callback(data.xp ?? 0)
    })
}

export function loadLevel(callback) {
    chrome.storage.local.get('level', (data) => {
        callback(data.level ?? 1)
    })
}