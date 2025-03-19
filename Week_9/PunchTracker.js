let clockInTime = null;
let totalTimeInMinutes = 0;

const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");
const employeeNameInput = document.getElementById("employeeName");
const recordList = document.getElementById("recordList");
const totalTimeDisplay = document.getElementById("totalTime");

clockInBtn.addEventListener("click", function() {
    const employeeName = employeeNameInput.value.trim();

    if (employeeName === "") {
        alert("Please enter your name before clocking in.");
        return;
    }

    clockInTime = new Date();
    clockInBtn.disabled = true;
    clockOutBtn.disabled = false;

    alert(`Welcome ${employeeName}, you've clocked in at ${clockInTime.toLocaleTimeString()}.`);
});

clockOutBtn.addEventListener("click", function() {
    if (!clockInTime) {
        alert("Please clock in first.");
        return;
    }

    const clockOutTime = new Date();
    
    const timeDifferenceInMilliseconds = clockOutTime - clockInTime;
    
    const timeWorkedInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    
    const hoursWorked = Math.floor(timeWorkedInMinutes / 60);
    const minutesWorked = Math.round(timeWorkedInMinutes % 60);

    totalTimeInMinutes += timeWorkedInMinutes;
    
    const recordItem = document.createElement("li");
    recordItem.textContent = `Clocked in at: ${clockInTime.toLocaleTimeString()} - Clocked out at: ${clockOutTime.toLocaleTimeString()} | Worked: ${hoursWorked} hours and ${minutesWorked} minutes`;
    recordList.appendChild(recordItem);

    const totalHours = Math.floor(totalTimeInMinutes / 60);
    const totalMinutes = Math.round(totalTimeInMinutes % 60);
    totalTimeDisplay.textContent = `${totalHours} hours and ${totalMinutes} minutes`;

    clockInTime = null;
    clockInBtn.disabled = false;
    clockOutBtn.disabled = true;

    alert(`You've clocked out. Total time worked: ${hoursWorked} hours and ${minutesWorked} minutes.`);
});