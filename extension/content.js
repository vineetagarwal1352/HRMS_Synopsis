chrome.runtime.sendMessage({ type: "active", timestamp: Date.now() });

// Event listener for mouse clicks
document.addEventListener("click", function (event) {
  chrome.runtime.sendMessage({ type: "active", timestamp: Date.now() });
});

// Track user's location continuously
setInterval(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      chrome.runtime.sendMessage({ type: "location", data: position });
    },
    (error) => {
      console.error("Error getting location:", error);
      chrome.runtime.sendMessage({ type: "location", data: null });
    }
  );
}, 5 * 60 * 1000); // Update location every 5 minutes

