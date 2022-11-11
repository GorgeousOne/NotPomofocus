
let clockFace = document.getElementById("clock-face");
let timerButton = document.getElementById("timer-btn");
let resetButton = document.getElementById("reset-btn");
let settingsBtn = document.getElementById("settings-btn");
let settingsOverlay = document.getElementById("settings-overlay");

let totalSeconds = 10;
let currentSeconds = totalSeconds;
let timerEnd;
let isTimerRunning = false;

updateClockFace(currentSeconds);

settingsBtn.addEventListener("click", function() {
	settingsOverlay.style.display = "flex";
});

settingsOverlay.addEventListener("mousedown", function(event) {
	if (event.target !== this) {
		return;
	}
	settingsOverlay.style.display = "none";
});

timerButton.addEventListener("click", function() {
	isTimerRunning = !isTimerRunning;

	if (isTimerRunning) {
		timerButton.classList.add("toggled");
		timerButton.innerText = "stop";
		runTimer();
	} else {
		timerButton.classList.remove("toggled");
		timerButton.innerText = "start";
	}
});

resetButton.addEventListener("click", function () {
	isTimerRunning = false;
	timerButton.classList.remove("toggled");
	timerButton.innerText = "start";
	currentSeconds = totalSeconds;
	updateClockFace();
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTimer() {
	timerEnd = new Date(Date.now() + currentSeconds * 1000);

	while (currentSeconds > 0) {
		let remainingTime = getRemainingTime();
		let nextInterval = remainingTime - Math.round(remainingTime - 1);
		await sleep(nextInterval * 1000);

		if (!isTimerRunning) {
			return;
		}
		currentSeconds = Math.round(getRemainingTime());
		updateClockFace();
	}
	notifyTimerEnd();
}

//in seconds
function getRemainingTime() {
	return Math.max(0, (timerEnd - Date.now()) / 1000);
}

function updateClockFace() {
	clockFace.innerText =
		Math.floor(currentSeconds / 60).toString().padStart(2, "0") + ":" +
		(currentSeconds % 60).toString().padStart(2, "0");
}

function notifyTimerEnd() {
	currentSeconds = totalSeconds;
}
