import React from "react";
import {ethers} from "ethers";
import ConnectWallet from "../components/ConnectWallet";
import { useState } from "react";
import MyGroup from "../components/MyGroup";
import { useNavigate } from "react-router-dom";
import abi from "../contracts/abi";
import Vote from "../components/Vote";

const VoterDemo = (contractAddress) => {
  
 
  const navigate = useNavigate(); 
  const [walletData, setWalletData] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [Connected, setWalletConnected] = useState(false);
  const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
  const [executeTextSt, setExecuteTextSt] = useState();
  const [connectLinkSt, setConnectLinkSt] = useState("");
  const [executeLinkSt, setExecuteLinkSt] = useState();
  const [activeElections, setActiveElections] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const handleAdmin = () => {
    navigate("/admin");
  };
  async function connectWallet() {
    if (account !== undefined) {
      setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
    } else {
      const wData = await ConnectWallet();

      let newAccount = wData[0];
      let newNetwork = wData[2];
      if (newAccount !== undefined) {
        setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
        setConnectLinkSt(
          `https://hashscan.io/${newNetwork}/account/${newAccount}`
        );

        setWalletData(wData);
        setAccount(newAccount);
        setNetwork(newNetwork);
        setWalletConnected(true);
      }
    }}
    async function disconnectWallet() {
      setAccount();
      setWalletData();
      setConnectTextSt("🔌 Connect Wallet");
      setWalletConnected(false);
  }
    async function voteHandler(electionId, candidateId) {
      if (contractAddress === undefined) {
        alert("🛑 Deploy a contract first! 🛑");
      } else {
        await Vote(walletData, contractAddress, electionId, candidateId);
        
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
                name: data[1][index]
            })));
          } catch (error) {
              console.error("Error fetching candidates:", error);
          }
      }
  
 return (
    <div className="dashboard-container">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light">Voter Dashboard</a>
          <form className="d-flex">
            <button className="btn btn-outline-light" onClick={handleAdmin}>
              Logout
            </button>
          </form>
        </div>
      </nav>
      <h5>This is Demo of Voter Dashboard For contract deployed by you</h5>
      <h5>Use Different Metamask account to vote!</h5>
      <div className="content">
       {!Connected && <MyGroup
          fcn={connectWallet}
          buttonLabel={"Connect Wallet"}
          text={connectTextSt}
          link={connectLinkSt}
        />}
        {Connected && <button className="btn btn-danger ms-2" onClick={disconnectWallet}>Disconnect Wallet</button>}
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
        <form
          className="vote-form"
          onSubmit={(e) => {
            e.preventDefault();
            voteHandler(
              e.target.elements.ElectionId.value,
              e.target.elements.CandidateId.value
            );
          }}
        >
          <input type="number" className="form-control" placeholder="Election ID" name="ElectionId" />
          <input type="number" className="form-control" placeholder="Candidate ID" name="CandidateId" />
          <button type="submit" className="btn btn-primary">
            VOTE
          </button>
        </form>
      </div>
    </div>
  );
  
};
export default VoterDemo;
