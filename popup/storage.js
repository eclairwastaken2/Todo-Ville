const Storage =
{
    getBlockedSites() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get("blockedSites", (data) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(data.blockedSites || []); // Ensure we return an array
                }
            });
        });
    },

    setBlockedSites(sites) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({ blockedSites: sites }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    },

    getStartTime() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get("startTime", (data) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(data.startTime); 
                }
            });
        });
    },


    setStartTime(time){
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({ startTime: time }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    },

    clearStartTime()
    {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.remove("startTime", () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    },
};
