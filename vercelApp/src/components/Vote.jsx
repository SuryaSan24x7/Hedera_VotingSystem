import abi from "../contracts/abi.js";
import { ethers } from "ethers";

async function Vote(walletData, contractAddress, electionId, candidateId) {
    const provider = walletData[1];
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const tx = await votingContract.vote(electionId, candidateId);
        console.log("Voting transaction sent:", tx.hash);
        await tx.wait();
        console.log("Voted successfully.");
        alert(`Voted successfully. ✅`);
    } catch (error) {
        console.error("Failed to vote:", error);
        alert(`error `,error);
    }
}

export default Vote;