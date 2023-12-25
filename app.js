// app.js
let web3;
let contract;
let connectedWalletAddress;

// Replace this placeholder with your actual ABI
const contractAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EthSent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "sendEth",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
const contractAddress = '0xba37e01b264b401c7a7288d3e5c18f46d52c0c6d';
async function connectWallet() {
    try {
        // Check if ethers is defined
        if (typeof ethers === 'undefined') {
            throw new Error('Ethers library is not loaded');
        }

        // Connect to Metamask
        if (window.ethereum) {
            web3 = new ethers.providers.Web3Provider(window.ethereum);
            // Continue with the connection
            await window.ethereum.enable();

             // Check if the network is Goerli
             const network = await web3.getNetwork();
             if (network.chainId !== 5) { // 5 is the chain ID for Goerli
                 alert('Please switch your MetaMask network to Goerli');
                 return;
             }
 

            // Update contract address here with your actual contract address
            const contractAddress = '0xba37e01b264b401c7a7288d3e5c18f46d52c0c6d';
            contract = new ethers.Contract(contractAddress, contractAbi, web3.getSigner());

            // Update connected wallet address
            const accounts = await web3.listAccounts();
            connectedWalletAddress = accounts[0];

            // Display connected wallet address
            const connectedWalletSection = document.getElementById('connectedWalletSection');
            if (connectedWalletSection) {
                const connectedWalletAddressElement = document.getElementById('connectedWalletAddress');
                if (connectedWalletAddressElement) {
                    connectedWalletAddressElement.innerText = `Connected Wallet: ${connectedWalletAddress}`;
                }

                connectedWalletSection.style.display = 'block';
            } else {
                console.error('Connected wallet section not found');
            }

            console.log('Connected to wallet');
        } else {
            alert('Please install Metamask to use this feature');
        }
    } catch (error) {
        console.error('Error connecting to wallet:', error.message);
    }
}


async function sendEth() {
    try {
        const receiverAddressInput = document.getElementById('receiverAddress');
        const amountInput = document.getElementById('amount');

        // Check if elements are found
        if (!receiverAddressInput || !amountInput) {
            console.error('Cannot find input elements');
            return;
        }

        const receiverAddress = receiverAddressInput.value;
        const amountInEther = amountInput.value.toString();

        // Convert amount to wei
        const amount = ethers.utils.parseEther(amountInEther);

        const network = await web3.getNetwork();
        if (network.chainId !== 5) { // 5 is the chain ID for Goerli
            alert('Please switch your MetaMask network to Goerli');
            return;
        }

        // Call the smart contract function
        else{
        const tx = await contract.sendEth(receiverAddress, { value: amount });
        const receipt = await tx.wait();

        console.log('Transaction Receipt:', receipt);
        console.log('Transaction Hash:', receipt.transactionHash);

        alert('ETH sent successfully!');
        trxreceipt.innerText = receipt;
        trxhash.innerText = receipt.transactionHash;
    }
    } catch (error) {
        console.error('Error sending ETH:', error.message);
        console.error('Error details:', error);
        alert('Error sending ETH. Please check the console for details.');
    }
}



