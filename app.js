document.addEventListener("DOMContentLoaded", () => {
    const clock = document.getElementById("clock");
    const dateDisplay = document.getElementById("date");
    const formatSelect = document.getElementById("format");
    const themeSelect = document.getElementById("theme");
    const alarmInput = document.getElementById("alarm-time");
    const setAlarmButton = document.getElementById("set-alarm");
    const cancelAlarmButton = document.getElementById("cancel-alarm");
    let alarmTime = null;
    let alarmTimeout = null;

    // Load saved theme and format
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFormat = localStorage.getItem("format") || "24";
    themeSelect.value = savedTheme;
    formatSelect.value = savedFormat;
    document.body.className = savedTheme;

    // Update clock every second
    function updateClock() {
        const now = new Date();
        const hours = formatSelect.value === "12"
            ? ((now.getHours() % 12) || 12)
            : now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const ampm = formatSelect.value === "12" ? (now.getHours() >= 12 ? "PM" : "AM") : "";

        clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        dateDisplay.textContent = now.toLocaleDateString(undefined, options);

        // Check alarm
        if (alarmTime && `${hours}:${minutes}` === alarmTime) {
            alert("Alarm ringing!");
            alarmTime = null; // reset alarm after it rings
        }
    }

    // Set the selected theme
    themeSelect.addEventListener("change", () => {
        const theme = themeSelect.value;
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    });

    // Set the selected format
    formatSelect.addEventListener("change", () => {
        localStorage.setItem("format", formatSelect.value);
        updateClock(); // Refresh clock display immediately
    });

    // Set alarm
    setAlarmButton.addEventListener("click", () => {
        if (alarmInput.value) {
            alarmTime = alarmInput.value;
            alert(`Alarm set for ${alarmTime}`);
        }
    });

    // Cancel alarm
    cancelAlarmButton.addEventListener("click", () => {
        alarmTime = null;
        alert("Alarm canceled");
    });

    setInterval(updateClock, 1000); // Update clock every second
    updateClock(); // Initial call
});