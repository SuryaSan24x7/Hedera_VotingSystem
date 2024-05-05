import { ethers } from "ethers";
const network = "testnet";

async function ConnectWallet() {
	console.log(`\n=======================================`);

	// ETHERS PROVIDER
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

	// SWITCH TO HEDERA TEST NETWORK
	console.log(`- Switching network to the s ${network}...🟠`);
	let chainId;
	

	await window.ethereum.request({
		method: "wallet_addEthereumChain",
		params: [
			{
				chainName: `sEPOLIA ${network}`,
				chainId: "0xaa36a7",
				nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18 },
				rpcUrls: [`https://sepolia.infura.io/v3/`],
				blockExplorerUrls: [`https://sepolia.etherscan.io/`],
			},
		],
	});
	console.log("- Switched ✅");

	// CONNECT TO ACCOUNT
	console.log("- Connecting wallet...🟠");
	let selectedAccount;
	await provider
		.send("eth_requestAccounts", [])
		.then((accounts) => {
			selectedAccount = accounts[0];
			console.log(`- Selected account: ${selectedAccount} ✅`);
		})
		.catch((connectError) => {
			console.log(`- ${connectError.message.toString()}`);
			return;
		});

	return [selectedAccount, provider, network];
}

export default ConnectWallet;
