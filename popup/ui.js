const UI =
{
    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderBlockedList(); 
        this.renderHamster(); 
    },

    cacheElements() {
        this.input = document.getElementById("siteInput");
        this.addBtn = document.getElementById("addBtn");
        this.siteList = document.getElementById("siteList");
        this.page1 = document.getElementById("page1");
        this.page2 = document.getElementById("page2");
        this.goToPage1 = document.getElementById("goToPage1");
        this.goToPage2 = document.getElementById("goToPage2");
        this.hamster = document.getElementById("hamster");
        this.siteList = document.getElementById("siteList");
        this.goToPromptBlockedAddition = document.getElementById("goToPromptBlockedAddition");
    },

    async bindEvents() {
        this.goToPage2.onclick = () => {
            this.page1.classList.remove("active");
            this.page2.classList.add("active");
        };

        this.goToPage1.onclick = () => {
            this.page2.classList.remove("active");
            this.page1.classList.add("active");
        };

        this.addBtn.onclick = async () => {
            const site = this.input.value.trim();
            if (!site) return;
            console.log(site);
            const sites = await Storage.getBlockedSites();
            console.log(sites);

            if (sites.length === 0) {
                await Storage.setStartTime(Date.now());
            }
            if (!sites.includes(site)) {

                sites.push(site);
                await Storage.setBlockedSites(sites); 
                this.renderBlockedList();
                this.renderHamster();
            }
        }
    },

    async renderBlockedList() {
        try {
            const sites = await Storage.getBlockedSites();
            this.siteList.innerHTML = "";

            sites.forEach((site, i) => {
                const p = document.createElement("p");
                p.textContent = site;

                const rm = document.createElement("button");
                rm.textContent = "delete";
                rm.classList.add("delete-button");
                rm.onclick = async () => {
                    const updatedSites = [...sites];
                    updatedSites.splice(i, 1);
                    await Storage.setBlockedSites(updatedSites);
                    this.renderBlockedList();
                    this.renderHamster();

                    if (updatedSites.length === 0) {
                        await Storage.clearStartTime();
                    } else {
                        await Storage.setStartTime(Date.now());
                    }
                };

                p.appendChild(rm);
                this.siteList.appendChild(p);
            });
        } catch (error) {
            console.error("Error rendering blocked list:", error);
        }
    },

    async renderHamster() {
        try {
            this.hamsterImage = document.getElementById("hamsterImage");
            this.hamsterStreak = document.getElementById("hamsterStreak");
            this.hamsterGoal = document.getElementById("hamsterGoal");
            this.hamsterTickle = document.getElementById("hamsterTickle");
            this.hamsterComfortMessage = document.getElementById("hamsterComfortMessage"); 

            const sites = await Storage.getBlockedSites();
            if (sites.length === 0) {
                if(!this.goToPromptBlockedAddition.classList.contains("active"))
                {
                    this.goToPromptBlockedAddition.classList.add("active");
                }
                this.hamster.classList.remove("active");
                this.siteList.classList.remove("active");
                return;
            }
            else
            {
              
                if(!this.hamster.classList.contains("active"))
                {
                    this.siteList.classList.add("active");
                    this.hamster.classList.add("active");
                }
                this.goToPromptBlockedAddition.classList.remove("active");
            }

            const startTime = await Storage.getStartTime();
            const stage = Hamster.getHamsterStage(startTime);
            hamsterImage.src = Hamster.getImage(stage);

            const days = Math.floor((Date.now() - startTime) / (1000 * 60 * 60 * 24));
            this.hamsterStreak.textContent = `${days} days streak :3`;

            const randomMessage = Hamster.getMessage(); 
            this.hamsterComfortMessage.textContent = randomMessage; 


            if (stage === "baby") {
                hamsterGoal.textContent = `${7 - days} day(s) to become a teen`;
            }
            else if (stage === "teen") {
                hamsterGoal.textContent = `${30 - days} day(s) to become an adult`;
            }
            else {
                hamsterGoal.textContent = `You're finally an adult! Super proud of you :3`;
            }

            this.hamsterTickle.onclick = () => {
                this.animateTickle(stage);
            }
        }
        catch (error) {
            console.error("Error rendering blocked list: ", error);
        }

    },

    animateTickle(stage) {
        const img = document.getElementById("hamsterImage");
        if (!img) return;

        const original = Hamster.getImage(stage);
        const replacement = Hamster.getFeedImage(stage);

        img.src = replacement;
        setTimeout(() => img.src = original, 700);
    }
}