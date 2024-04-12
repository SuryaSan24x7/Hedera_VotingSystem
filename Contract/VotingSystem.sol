// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VotingSystem {
    address public owner;
    uint256 public electionsCount = 0;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Election {
        uint id;
        string name;
        string uniqueCode;
        bool isEnded;
        uint candidatesCount;
        uint leadingCandidateId;
        uint leadingVoteCount;
        mapping(uint => Candidate) candidates;
        mapping(address => bool) hasVoted;
    }
    event ElectionCreated(uint indexed electionId, string name, string uniqueCode);
    event CandidateAdded(uint indexed electionId, uint indexed candidateId, string candidateName);
    event Voted(uint indexed electionId, uint indexed candidateId, address voter);
    event ElectionEnded(uint indexed electionId, string name);
    event ElectionResults(uint indexed electionId, uint[] candidateIds, string[] candidateNames, uint[] voteCounts);
    event ElectionWinner(uint indexed electionId, uint candidateId, string candidateName, uint voteCount);
    mapping(uint => Election) public elections;
    mapping(string => uint) private electionCodeToId;
function viewAllElections() public view returns (uint[] memory, string[] memory) {
        uint ongoingCount = 0;
        for (uint i = 1; i <= electionsCount; i++) {
            if (!elections[i].isEnded) {
                ongoingCount++;
            }
        }

        uint[] memory ids = new uint[](ongoingCount);
        string[] memory names = new string[](ongoingCount);
        uint index = 0;
        for (uint i = 1; i <= electionsCount; i++) {
            if (!elections[i].isEnded) {
                ids[index] = elections[i].id;
                names[index] = elections[i].name;
                index++;
            }
        }
        return (ids, names);
    }

    // Function to view all candidates in a specific election by ID
    function viewCandidatesInElection(uint electionId) public view electionExists(electionId) returns (uint[] memory, string[] memory, uint[] memory) {
        require(!elections[electionId].isEnded, "This election has already ended.");

        uint candidateCount = elections[electionId].candidatesCount;
        uint[] memory ids = new uint[](candidateCount);
        string[] memory names = new string[](candidateCount);
        uint[] memory voteCounts = new uint[](candidateCount);

        for (uint i = 1; i <= candidateCount; i++) {
            Candidate storage candidate = elections[electionId].candidates[i];
            ids[i - 1] = candidate.id;
            names[i - 1] = candidate.name;
            voteCounts[i - 1] = candidate.voteCount;
        }
        return (ids, names, voteCounts);
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier electionExists(uint electionId) {
        require(electionId > 0 && electionId <= electionsCount, "Election does not exist.");
        _;
    }
    modifier onlyVoter(){
        require(msg.sender != owner,"Owner is not allowed to vote");
    _;}

    constructor() {
        owner = msg.sender;
    }

    function createElection(string memory name, string memory uniqueCode) public onlyOwner {
        require(electionCodeToId[uniqueCode] == 0, "Election code must be unique.");

        electionsCount++;
        Election storage election = elections[electionsCount];
        election.id = electionsCount;
        election.name = name;
        election.uniqueCode = uniqueCode;
        election.isEnded = false;
        election.leadingCandidateId = 0; // Initially, there's no leading candidate.
        election.leadingVoteCount = 0;

        electionCodeToId[uniqueCode] = electionsCount;

        emit ElectionCreated(electionsCount, name, uniqueCode);
    }

    function addCandidate(uint electionId, string memory candidateName) public onlyOwner electionExists(electionId) {
        require(!elections[electionId].isEnded, "Election has already ended.");
        
        Election storage election = elections[electionId];
        uint candidateId = ++election.candidatesCount;
        election.candidates[candidateId] = Candidate(candidateId, candidateName, 0);

        emit CandidateAdded(electionId, candidateId, candidateName);
    }

    function vote(uint electionId, uint candidateId) public electionExists(electionId) onlyVoter {
        Election storage election = elections[electionId];
        require(!election.isEnded, "Election has already ended.");
        require(!election.hasVoted[msg.sender], "You have already voted.");
        require(candidateId > 0 && candidateId <= election.candidatesCount, "Invalid candidate.");

        election.hasVoted[msg.sender] = true;
        Candidate storage candidate = election.candidates[candidateId];
        candidate.voteCount++;

        // Update leading candidate if this candidate now has more votes
        if(candidate.voteCount > election.leadingVoteCount) {
            election.leadingCandidateId = candidateId;
            election.leadingVoteCount = candidate.voteCount;
        }

        emit Voted(electionId, candidateId, msg.sender);
    }

    function endElection(uint electionId) public onlyOwner electionExists(electionId) {
        Election storage election = elections[electionId];
        require(!election.isEnded, "Election has already ended.");
        election.isEnded = true;

        // Emit winner information at the end of the election
        if(election.leadingCandidateId != 0) { // Ensure there was at least one vote
            emit ElectionWinner(electionId, election.leadingCandidateId, election.candidates[election.leadingCandidateId].name, election.leadingVoteCount);
        }

        emit ElectionEnded(electionId, election.name);
    }
}
 