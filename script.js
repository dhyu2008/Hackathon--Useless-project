let reminders = [];
let alarmInterval;

function setReminder() {

    let medicineName =
        document.getElementById("medicineName").value;

    let medicineTime =
        document.getElementById("medicineTime").value;

    if (medicineName === "" || medicineTime === "") {
        alert("Please enter medicine name and time!");
        return;
    }

    let reminder = {
        name: medicineName,
        time: medicineTime,
        triggered: false
    };

    reminders.push(reminder);

    displayReminders();

    alert("Reminder set successfully! ⏰");

    document.getElementById("medicineName").value = "";
    document.getElementById("medicineTime").value = "";
}

function displayReminders() {

    let list =
        document.getElementById("reminderList");

    list.innerHTML = "";

    reminders.forEach(function(reminder, index) {

        let item = document.createElement("div");

        item.innerHTML =
            "💊 " + reminder.name +
            " — ⏰ " + reminder.time;

        item.style.padding = "10px";
        item.style.margin = "10px";
        item.style.background = "#eaf4ff";
        item.style.borderRadius = "8px";

        let deleteButton =
            document.createElement("button");

        deleteButton.innerText = "🗑️ Delete";

        deleteButton.onclick = function() {
            reminders.splice(index, 1);
            displayReminders();
        };

        item.appendChild(deleteButton);

        list.appendChild(item);
    });
}

function playAlarm() {

    let audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    let oscillator =
        audioContext.createOscillator();

    let gainNode =
        audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;

    gainNode.gain.value = 0.3;

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 2);
}

function checkReminders() {

    let now = new Date();

    let currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

    reminders.forEach(function(reminder) {

        if (reminder.time === currentTime &&
            !reminder.triggered) {

           playAlarm();

alert("⏰ Time to take " + reminder.name);

const payment = confirm("Pay ₹100 for this reminder?");

if (payment) {
    alert("₹100 Demo Payment Successful! ✅\nNo real money was transferred.");

    deleteLastReminder();

    alert("✅ Final call completed!\nLast reminder deleted.");
}

reminder.triggered = true;
        }

        if (reminder.time !== currentTime) {
            reminder.triggered = false;
        }

    });
}

alarmInterval = setInterval(checkReminders, 1000);
// Test Alarm

function testAlarm() {
    alert("⏰ Test Alarm Working!");
}
function showFakePayment() {
    const payment = confirm("Pay ₹100 as demo payment?");

    if (payment) {
        alert("₹100 Demo Payment Successful! ✅\nNo real money was transferred.");

        alert("✅ Final call completed!\nYour reminder is still saved.");
    } else {
        alert("Demo payment cancelled.");
    }
}
function deleteLastReminder() {
    if (reminders.length > 0) {
        reminders.pop();

        localStorage.setItem("reminders", JSON.stringify(reminders));

        displayReminders();
    }
}