let settingsBtn = document.getElementById("settings-btn");
let settingsOverlay = document.getElementById("settings-overlay");

settingsBtn.addEventListener("click", function() {
	settingsOverlay.style.display = "flex";
});

settingsOverlay.addEventListener("mousedown", function(event) {
	if (event.target !== this) {
		return;
	}
	settingsOverlay.style.display = "none";
})