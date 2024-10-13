///////////DEPOSIT///////////
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io' // Use 'https://api.shasta.trongrid.io' for testnet
});

const websiteWalletAddress = 'TVMaoswGWX5gQAkE1Q68oc96ZXPE6PnHb6'; // Replace with your actual website wallet address

async function monitorDeposit() {
    const depositAmount = document.getElementById('depositAmount').value;

    if (depositAmount > 0) {
        document.getElementById('status').innerText = `Awaiting deposit of ${depositAmount} TRX...`;

        // Monitor the transaction in real-time
        await tronWeb.trx.getCurrentBlock().then(block => {
            const blockNumber = block.block_header.raw_data.number;

            // Poll for new transactions in blocks every 10 seconds
            setInterval(async function() {
                const latestBlock = await tronWeb.trx.getCurrentBlock();
                const latestBlockNumber = latestBlock.block_header.raw_data.number;

                if (latestBlockNumber > blockNumber) {
                    console.log(`Checking transactions from block ${blockNumber} to ${latestBlockNumber}...`);
                    checkForTransactions(blockNumber, latestBlockNumber, depositAmount);
                }
            }, 10000); // 10 seconds interval for polling
        });
    }
}

// Function to check for transactions in specific block range
async function checkForTransactions(startBlock, endBlock, depositAmount) {
    for (let blockNum = startBlock; blockNum <= endBlock; blockNum++) {
        const block = await tronWeb.trx.getBlock(blockNum);

        block.transactions.forEach(async (tx) => {
            if (tx.raw_data.contract[0].parameter.value.to_address === tronWeb.address.toHex(websiteWalletAddress)) {
                const amountSun = tx.raw_data.contract[0].parameter.value.amount;
                const amountTRX = tronWeb.fromSun(amountSun);

                if (amountTRX == depositAmount) {
                    document.getElementById('status').innerText = `Deposit of ${amountTRX} TRX received successfully!`;
                    updateUserBalance(amountTRX); // Update the user's dashboard with the deposit amount
                }
            }
        });
    }
}

function updateUserBalance(amount) {
    let user = localStorage.getItem('username');
    let userBalance = localStorage.getItem('userBalance') || 0;
    let newBalance = parseFloat(userBalance) + parseFloat(amount);
    
    localStorage.setItem('userBalance', newBalance); // Update the user's balance
    alert(`Your new balance is: ${newBalance} TRX`);
}