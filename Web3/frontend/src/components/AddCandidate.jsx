import abi from "../contracts/abi.js";
import { ethers } from "ethers";

async function AddCandidate(walletData, contractAddress, electionId, candidateName) {
    const provider = walletData[1];
    const signer = provider.getSigner();
    console.log(provider);
    const votingContract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const tx = await votingContract.addCandidate(electionId, candidateName);
        const receipt = await tx.wait();
        receipt.events.forEach((event) => {
            console.log("Event name:", event.event);
            console.log("Event arguments:", event.args);
        });
        console.log("Candidate added successfully.");
    } catch (error) {
        if (error.message && /Only the owner can call this function/.test(error.message)) {
            alert("Only the owner can call this function");}
            else {
                console.error("Failed to add candidate:", error);
            }
    }
}

export default AddCandidate;