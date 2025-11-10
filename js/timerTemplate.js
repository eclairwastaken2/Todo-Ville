async function loadTimerTemplate() {
  try {
    const response = await fetch('../popup/timer.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('beforeend', html);

    const template = document.getElementById('timerTemplate');
    if (!template) throw new Error("Template not found");

    const clone = template.content.cloneNode(true);
    const timerArea = document.getElementById('timerArea');
    if (!timerArea) throw new Error("Timer area not found");

    timerArea.appendChild(clone);

    console.log("Timer template loaded successfully!");

    initTimer();
  } catch (err) {
    console.error('Error loading template:', err);
  }
}

function initTimer() {
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  function setupArrow(idUp, idDown, input, max) {
    document.getElementById(idUp).onclick = () => {
      input.value = (parseInt(input.value) + 1) % (max + 1);
    };
    document.getElementById(idDown).onclick = () => {
      input.value = (parseInt(input.value) - 1 + (max + 1)) % (max + 1);
    };
  }

  setupArrow("h-up", "h-down", hours, 23);
  setupArrow("m-up", "m-down", minutes, 59);
  setupArrow("s-up", "s-down", seconds, 59);

  startBtn.addEventListener("click", () => {
    const totalSeconds =
      parseInt(hours.value) * 3600 +
      parseInt(minutes.value) * 60 +
      parseInt(seconds.value);

    if (totalSeconds <= 0) {
      alert("Please set a time greater than 0.");
      return;
    }

    const endTime = Date.now() + totalSeconds * 1000;
    chrome.storage.local.set({ sessionEnd: endTime, sessionActive: true });
    chrome.alarms.create("sessionEnd", { delayInMinutes: totalSeconds / 60 });

    updateTimerUI(endTime);
  });

  chrome.storage.local.get(["sessionEnd", "sessionActive"], data => {
    if (data.sessionActive && data.sessionEnd > Date.now()) {
      updateTimerUI(data.sessionEnd);
    }
  });
}

loadTimerTemplate();