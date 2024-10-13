document.addEventListener('DOMContentLoaded', (event) => {
    displayUserInfo();
});

function displayUserInfo() {
    const username = localStorage.getItem('username');
    if (username) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            document.getElementById('dashboardUsername').innerText = `Username: ${username}`;
            document.getElementById('dashboardWallet').innerText = `Wallet Address: ${users[username].wallet}`;
        } else {
            alert('User not found!');
            window.location.href = 'sign-up-cryptoking.html'; // Redirect to login page if user not found
        }
    } else {
        alert('Please log in!');
        window.location.href = 'sign-up-cryptoking.html'; // Redirect to login page if not logged in
    }
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = 'sign-up-cryptoking.html'; // Redirect to login page on logout
}

// Fetch user details from localStorage
const username = localStorage.getItem('username');
const amountOfTRX = localStorage.getItem('trxAmount') || 0; // Default to 0 TRX if no amount deposited yet

if (username) {
    document.getElementById('usernameDisplay').innerText = username;
    document.getElementById('trxAmount').innerText = `${amountOfTRX} TRX`;
} else {
    // Redirect to login if no user is logged in
    alert('You are not logged in!');
    window.location.href = 'sign-up-cryptoking.html';
}

// Logout function
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('trxAmount');
    window.location.href = 'sign-up-cryptoking.html'; // Redirect to login page
}

// Countdown Timer Functionality
let countdownTime = localStorage.getItem('withdrawalTime'); // Fetch countdown from localStorage
if (!countdownTime) {
    // Set the countdown to 168 hours from the current time if not set
    const now = new Date().getTime();
    countdownTime = now + 168 * 60 * 60 * 1000; // 168 hours in milliseconds
    localStorage.setItem('withdrawalTime', countdownTime);
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownTime - now;

    if (distance < 0) {
        document.getElementById('timer').innerText = "Withdrawal Available!";
    } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timer').innerText = `${Math.floor(distance / (1000 * 60 * 60 * 24))}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Update the countdown every second
setInterval(updateTimer, 1000);
