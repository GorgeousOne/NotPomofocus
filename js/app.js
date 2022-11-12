// const appHeight = () => {
// 	const doc = document.documentElement
// 	doc.style.setProperty('--app-height', `${window.innerHeight}px`)
// }
// window.addEventListener('resize', appHeight)
// appHeight()

let clockFace = document.getElementById("clock-face");
let timerButton = document.getElementById("timer-btn");
let resetButton = document.getElementById("reset-btn");
let settingsBtn = document.getElementById("settings-btn");

let settingsOverlay = document.getElementById("settings-overlay");
let minuteInput = document.getElementById("minute-input");

let totalSeconds;
let currentSeconds;
let timerEnd;
let isTimerRunning = false;

setTimerDuration(25 * 60);

settingsBtn.addEventListener("click", (event) => openSettings(event));
settingsBtn.addEventListener("touchstart", (event) => openSettings(event));

function openSettings(event) {
	event.preventDefault();
	settingsOverlay.style.display = "flex";
}

settingsOverlay.addEventListener("mousedown", (event) => {
	if (event.target !== settingsOverlay) {
		return;
	}
	settingsOverlay.style.display = "none";
});

timerButton.addEventListener("click", (event) => toggleTimer(event));
timerButton.addEventListener("touchstart", (event) => toggleTimer(event));

function toggleTimer(event) {
	event.preventDefault();

	if (isTimerRunning) {
		pauseTimer();
	} else {
		startTimer();
	}
}

resetButton.addEventListener("click", (event) => resetTimer(event));
resetButton.addEventListener("touchstart", (event) => resetTimer(event));

function resetTimer(event) {
	event.preventDefault();
	pauseTimer();
	setTimerDuration(totalSeconds);
}

function updateClockFace() {
	clockFace.innerText =
		Math.floor(currentSeconds / 60).toString().padStart(2, "0") + ":" +
		(currentSeconds % 60).toString().padStart(2, "0");
}

function startTimer()  {
	isTimerRunning = true;
	timerButton.classList.add("toggled");
	timerButton.innerText = "stop";

	if (currentSeconds === 0) {
		currentSeconds = totalSeconds;
	}
	timerEnd = new Date(Date.now() + currentSeconds * 1000);
	updateClockFace();
	runTimer();
}

function pauseTimer() {
	isTimerRunning = false;
	timerButton.classList.remove("toggled");
	timerButton.innerText = "start";
}

function notifyTimerEnd() {
	pauseTimer();
}

function setTimerDuration(newTotalSeconds, newCurrentSeconds=newTotalSeconds) {
	totalSeconds = newTotalSeconds;
	currentSeconds = newCurrentSeconds;
	minuteInput.value = parseFloat((totalSeconds / 60).toFixed(3));

	if (isTimerRunning) {
		timerEnd = new Date(Date.now() + currentSeconds * 1000);
	}
	updateClockFace();
}

async function runTimer() {
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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}