import React,{ useState } from 'react';
import {ethers} from 'ethers';
import abi from "../contracts/abi";
import { Link, useNavigate } from 'react-router-dom'; 
import CreateElection from '../components/CreateElection';
import AddCandidate from '../components/AddCandidate';
import ConnectWallet from '../components/ConnectWallet';
import { useAuth } from '../Auth/Auth';
import MyGroup from '../components/MyGroup';
const contractAddress ="0x3f5856b5d807F4820b4a6d486b3ecCff87ba64ec";



//This contains buttons for creating election , ending election and adding candidate

function AdminDashboard() {
  const { setUser, login ,logout} = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [walletData, setWalletData] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [activeElections, setActiveElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
  const [executeTextSt, setExecuteTextSt] = useState();
  const [connectLinkSt, setConnectLinkSt] = useState("");
  const [executeLinkSt, setExecuteLinkSt] = useState();
  const [Connected, setWalletConnected] = useState(false);

  async function connectWallet() {
    if (account !== undefined) {
      setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
    } else {
      const wData = await ConnectWallet();

      let newAccount = wData[0];
      let newNetwork = wData[2];
      if (newAccount !== undefined) {
        setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
        setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

        setWalletData(wData);
        setAccount(newAccount);
        setNetwork(newNetwork);
        setWalletConnected(true);
      }
    }
  }
  async function disconnectWallet() {
    setAccount();
    setWalletData();
    setConnectTextSt("🔌 Connect Wallet");
    setWalletConnected(false);
}
  async function createElectionHandler(electionName, uniqueCode) {
    if (contractAddress === undefined) {
      setExecuteTextSt("🛑 Deploy a contract first! 🛑");
    } else {
      await CreateElection(walletData, contractAddress, electionName, uniqueCode);
      setExecuteTextSt(`Election "${electionName}" created successfully. ✅`);
    }
  }
  async function createAddCandidateHandler(electionId, candidateName) {
    if (contractAddress === undefined) {
      setExecuteTextSt("🛑 Deploy a contract first! 🛑");
    } else {
      await AddCandidate(walletData, contractAddress,electionId,candidateName);
      setExecuteTextSt(`Candidate "${candidateName}" added successfully. ✅`);
    }
  }
  async function EndElectionHandler(electionId) {
    if (contractAddress === undefined) {
      setExecuteTextSt("🛑 Deploy a contract first! 🛑");
    } else {
      const provider = walletData[1];
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, abi, signer);

    try {
     
        const tx = await votingContract.endElection(electionId);
        console.log("Election ending transaction sent:", tx.hash);
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
      setExecuteTextSt(`Election no. "${electionId}" successfully ended. ✅`);
    }
  }
   async function viewActiveElections() {
    const gasLimit = 100000;
        if (!walletData) return;
        const provider = walletData[1];
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const data = await votingContract.viewAllElections({gasLimit:gasLimit});
            setActiveElections(data[0].map((id, index) => ({ 
              id: Number(id),
              name: data[1][index]
          })));
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    }

    async function viewCandidates(electionId) {
        if (!walletData) return;
        const provider = walletData[1];
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const data = await votingContract.viewCandidatesInElection(electionId);
            setCandidates(data[0].map((id, index) => ({ 
              id: Number(id),
              name: data[1][index],
              voteCount : Number(data[2][index])
          })));
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    }

  const handleLogout = () => {
    logout();
    navigate('/adminlogin');
  };
return (
  <div>
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">Admin Dashboard</a>
        <form className="d-flex">
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </form>
      </div>
    </nav>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {!Connected && <MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />}
          {Connected && <button className="btn btn-danger ms-2" onClick={disconnectWallet}>Disconnect Wallet</button>}
        </div>
        
                <div className="mt-3">
                    <button className="btn btn-info" onClick={viewActiveElections}>View Active Elections</button>
                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeElections.map(election => (
                                <tr key={election.id}>
                                    <td>{election.id}</td>
                                    <td>{election.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        viewCandidates(e.target.elements.electionId.value);
                    }}>
                        <input type="text" className="form-control" placeholder="Election ID" name="electionId" />
                        <button type="submit" className="btn btn-primary mt-2">View Candidates</button>
                    </form>
                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Vote Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.id}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.voteCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        <div className="col-md-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            createElectionHandler(e.target.elements.electionName.value, e.target.elements.uniqueCode.value);
          }}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Election Name" name="electionName" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Unique Code" name="uniqueCode" />
            </div>
            <button type="submit" className="btn btn-primary">Create Election</button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            createAddCandidateHandler(e.target.elements.electionId.value, e.target.elements.candidateName.value);
          }}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Election ID" name="electionId" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Candidate Name" name="candidateName" />
            </div>
            <button type="submit" className="btn btn-primary">Add Candidate</button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            EndElectionHandler(e.target.elements.endElectionId.value);
          }}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Election ID" name="endElectionId" />
            </div>
            <button type="submit" className="btn btn-primary">End Election</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}

export default AdminDashboard;
