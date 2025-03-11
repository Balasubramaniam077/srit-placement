function validateLogin() {
    let rollNumber = document.getElementById('rollNumber').value;
    let batchNumber = document.getElementById('batchNumber').value;

    if (rollNumber.length < 2) {
        alert("Invalid Roll Number");
        return;
    }

    if (!batchNumber || batchNumber < 1 || batchNumber > 3) {
        alert("Invalid Batch Number (Enter 1, 2, or 3)");
        return;
    }

    let lastTwoDigits = rollNumber.slice(-2);
    let lastDigit = parseInt(lastTwoDigits) % 2;
    let pdfType = (lastDigit === 0) ? "even" : "odd";

    sessionStorage.setItem("pdfType", pdfType);
    sessionStorage.setItem("batchNumber", `batch_${batchNumber}`);

    window.location.href = "pdf.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let pdfType = sessionStorage.getItem("pdfType");
    let batchNumber = sessionStorage.getItem("batchNumber");

    if (pdfType && batchNumber) {
        document.getElementById('pdfViewer').src = `pdfs/${batchNumber}/${pdfType}/test.pdf`;
        startTimer();
    }
});

function startTimer() {
    let timeLeft = 25;
    let timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            window.location.href = "exit.html";
        }
        timeLeft--;
    }, 1000);
}
