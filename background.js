chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "sessionEnd") {
        console.log("Session end!"); 

        chrome.storage.local.set({ sessionActive: false });
        
        chrome.notifications.create({
            type: "basic", 
            iconUrl: "icon.png", 
            title: "Focus Session Ended!", 
            message: "Session completed!", 
            priority: 2
        }); 
    }
}); 