let web3;
let selectedAccount;
const PRIVATE_CHAIN_ID = "0x3039";
const PRIVATE_NETWORK_NAME = "Geth Private Network";
const PRIVATE_RPC_URL = "http://127.0.0.1:8545";

const transferForm = document.getElementById("transferForm");
const receiverAddressInput = document.getElementById("receiverAddress");
const transferAmountInput = document.getElementById("transferAmount");
const sendButton = document.getElementById("sendButton");
const message = document.getElementById("message");
const txHash = document.getElementById("txHash");

// Shows success or error text below the transfer form.
function showMessage(text, type) {
    message.innerText = text;
    message.className = "message " + type;
}

// Makes sure MetaMask is using the local Geth private network before reading balance or sending ETH.
async function ensurePrivateNetwork() {
    const currentChainId =
        await window.ethereum.request({ method: "eth_chainId" });

    if (currentChainId === PRIVATE_CHAIN_ID) {
        return true;
    }

    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: PRIVATE_CHAIN_ID }]
        });
        return true;
    } catch (switchError) {
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: PRIVATE_CHAIN_ID,
                    chainName: PRIVATE_NETWORK_NAME,
                    nativeCurrency: {
                        name: "Ether",
                        symbol: "ETH",
                        decimals: 18
                    },
                    rpcUrls: [PRIVATE_RPC_URL]
                }]
            });
            return true;
        }

        showMessage("MetaMask에서 Geth 프라이빗 네트워크(Chain ID 12345)로 전환하세요.", "error");
        return false;
    }
}

// Loads account, balance, block number, and network ID from MetaMask's current network.
async function updateWalletInfo() {

    const accounts =
        await web3.eth.getAccounts();

    selectedAccount = accounts[0];

    document.getElementById("status").innerText =
        "상태 : 연결됨";

    document.getElementById("account").innerText =
        "계정 주소 : " + selectedAccount;

    const balanceWei =
        await web3.eth.getBalance(selectedAccount);

    const balanceEth =
        web3.utils.fromWei(balanceWei, "ether");

    document.getElementById("balance").innerText =
        "잔액 : " + Number(balanceEth).toFixed(6) + " ETH";

    const blockNumber =
        await web3.eth.getBlockNumber();

    document.getElementById("block").innerText =
        "현재 블록 번호 : " + blockNumber;

    const networkId =
        await web3.eth.net.getId();

    document.getElementById("network").innerText =
        "네트워크 ID : " + networkId;
}

async function connectWallet() {

    if (window.ethereum) {

        try {

            await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const isPrivateNetwork =
                await ensurePrivateNetwork();

            if (!isPrivateNetwork) {
                return;
            }

            web3 = new Web3(window.ethereum);

            await updateWalletInfo();

            showMessage("MetaMask가 연결되었습니다. Geth 프라이빗 네트워크가 선택되어 있는지 확인하세요.", "success");

        } catch (error) {

            console.log(error);
            showMessage("지갑 연결 실패: " + error.message, "error");

        }

    } else {

        alert("MetaMask가 설치되어 있지 않습니다. MetaMask가 설치된 Chrome 또는 Edge 브라우저에서 실행하세요.");

    }
}

// Sends ETH from the connected MetaMask account to the receiver address.
async function sendEth(event) {

    event.preventDefault();

    if (!web3 || !selectedAccount) {
        showMessage("먼저 MetaMask 지갑을 연결하세요.", "error");
        return;
    }

    const isPrivateNetwork =
        await ensurePrivateNetwork();

    if (!isPrivateNetwork) {
        return;
    }

    const receiverAddress =
        receiverAddressInput.value.trim();

    const transferAmount =
        transferAmountInput.value.trim();

    if (!web3.utils.isAddress(receiverAddress)) {
        showMessage("올바른 받는 주소를 입력하세요.", "error");
        return;
    }

    if (!transferAmount || Number(transferAmount) <= 0) {
        showMessage("0보다 큰 ETH 금액을 입력하세요.", "error");
        return;
    }

    try {

        sendButton.disabled = true;
        sendButton.innerText = "MetaMask 확인 대기 중...";
        txHash.innerText = "-";
        showMessage("MetaMask에서 트랜잭션을 확인하세요.", "success");

        const valueWei =
            web3.utils.toWei(transferAmount, "ether");

        const gasPrice =
            await web3.eth.getGasPrice();

        // Sends a legacy type-0 transaction because this private Geth network does not support EIP-1559.
        const transactionHash =
            await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: selectedAccount,
                    to: receiverAddress,
                    value: web3.utils.toHex(valueWei),
                    gas: web3.utils.toHex(21000),
                    gasPrice: web3.utils.toHex(gasPrice),
                    type: "0x0"
                }]
            });

        txHash.innerText =
            transactionHash;

        showMessage("ETH 전송이 완료되었습니다.", "success");
        transferForm.reset();

        await updateWalletInfo();

    } catch (error) {

        console.log(error);
        showMessage("전송 실패: " + error.message, "error");

    } finally {

        sendButton.disabled = false;
        sendButton.innerText = "ETH 보내기";

    }
}

transferForm.addEventListener("submit", sendEth);

// Refreshes the page data when the user switches account or network in MetaMask.
if (window.ethereum) {
    window.ethereum.on("accountsChanged", async function () {
        if (web3) {
            await updateWalletInfo();
        }
    });

    window.ethereum.on("chainChanged", function () {
        window.location.reload();
    });
}
