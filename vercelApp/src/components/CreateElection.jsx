import abi from "../contracts/abi.js";
import { ethers } from "ethers";


async function CreateElection(walletData, contractAddress, electionName, uniqueCode) {
    // ETHERS PROVIDER AND SIGNER
    const provider = walletData[1];
    console.log(walletData[1],"---------------e");
    console.log(walletData,"---------------e");
    const signer = provider.getSigner();

    // CREATE ETHERS CONTRACT INSTANCE
    const votingContract = new ethers.Contract(contractAddress, abi, signer);

    // SUBSCRIBE TO EVENT
    votingContract.on("ElectionCreated", async (electionId, name, uniqueCode, event) => {
        const eventData = {
            electionId: Number(electionId),
            name: name,
            uniqueCode: uniqueCode
        };
console.log(event ,"----------event data");
        // WRITE EVENT DATA TO JSON FILE
        try {
            const jsonData = JSON.stringify(eventData);
            localStorage.setItem('electionEventData.json', jsonData);
            //console.log("- Election data saved to electionEventData.json");
        } catch (error) {
            console.error("- Error saving election data:", error.message);
        }
    });

    // EXECUTE THE SMART CONTRACT
    try {
        const tx = await votingContract.createElection(electionName, uniqueCode);
        const receipt = await tx.wait();
        receipt.events.forEach((event) => {
            console.log("Event name:", event.event);
            console.log("Event arguments:", event.args);
        });
        console.log(`- Election "${electionName}" created successfully.`,votingContract);
    } catch (error) {
        console.error(`- Error creating election: ${error.message}`);
    }
}

export default CreateElection;
