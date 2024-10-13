/////////WITHDRAW////////
function withdrawTRX() {
    // Check if user is signed in
    const username = localStorage.getItem('username');
    const depositTime = localStorage.getItem('depositTime'); // The time the deposit was made

    const currentTime = new Date().getTime(); // Current timestamp
    const hoursPassed = (currentTime - depositTime) / (1000 * 60 * 60); // Convert to hours
    const withdrawTime = 168; // 168 hours = 7 days

    const statusDiv = document.getElementById('status');
    
    if (!username) {
        // If the user is not logged in
        statusDiv.innerText = "Please sign up & deposit to enjoy our service.";
        return;
    }

    if (!depositTime) {
        // No deposit made
        statusDiv.innerText = "Please make a deposit first.";
        return;
    }

    if (hoursPassed >= withdrawTime) {
        // Withdrawal time has been reached
        statusDiv.innerText = "TRX will be sent to you shortly.";
        // Add your withdrawal logic here (e.g., blockchain transaction)
    } else {
        // Still waiting for the withdrawal time to be reached
        const hoursLeft = (withdrawTime - hoursPassed).toFixed(2);
        statusDiv.innerText = `Wait! Remains ${hoursLeft} hours to withdraw.`;
    }
}

// For testing: Simulate deposit time by saving it to localStorage
function simulateDeposit() {
    localStorage.setItem('depositTime', new Date().getTime()); // Set the current timestamp
    alert('Deposit time simulated! You can now test the withdrawal process.');
}

// Uncomment the following line to simulate a deposit for testing:
// simulateDeposit();