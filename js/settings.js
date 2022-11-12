
minuteInput.addEventListener("focusout", function (event) {
	let minutes = parseFloat(event.target.value);

	if (isNaN(minutes) || minutes <= 0 ) {
		minutes = 1;
	}
	minutes = Math.min(10000, minutes);
	let seconds = Math.round(minutes * 60);
	setTimerDuration(seconds, Math.max(1, seconds - (totalSeconds - currentSeconds)))
});