# Voting System Smart Contract

This document explains the Solidity smart contract for a voting system designed to handle multiple elections and their respective candidates. The contract allows only the owner (the deployer of the contract) to create elections and add candidates, while registered users can vote for candidates.

## Features

### 1. Owner and Elections Management

- **Owner Only Access**: Certain functions are restricted to the owner of the contract, such as creating elections and adding candidates.
- **Election Creation**: The owner can create an election with a unique name and code, ensuring no two elections have the same identifier.
- **Candidate Management**: Within each election, the owner can add multiple candidates.

### 2. Voting Mechanism

- **Vote Casting**: Registered users, excluding the owner, can vote for candidates in active elections. Each user can only vote once per election.
- **Vote Counting and Leading Candidate**: The contract tracks each candidate's vote count and updates the leading candidate dynamically as votes are cast.

### 3. Election Closure

- **Ending Elections**: The owner can end an election at any time. Once ended, the results are finalized, and no further voting can occur.
- **Election Results**: After an election ends, the system announces the winner based on the highest votes received.

## Contract Structure

### Data Structures

- **Election**: Stores details such as the election ID, name, unique code, status (active or ended), candidates, and voting status of users.
- **Candidate**: Stores candidate-specific details such as ID, name, and vote count.

### Functions

#### Constructor

- Sets the contract deployer as the owner.

#### Owner-Only Functions

- `createElection(string memory name, string memory uniqueCode)`: Creates a new election.
- `addCandidate(uint electionId, string memory candidateName)`: Adds a candidate to a specific election.
- `endElection(uint electionId)`: Ends the specified election and announces the winner.

#### Voting Functions

- `vote(uint electionId, uint candidateId)`: Allows a user to cast a vote for a candidate in an active election.

#### View Functions

- `viewAllElections()`: Returns a list of all ongoing elections.
- `viewCandidatesInElection(uint electionId)`: Provides details about all candidates in a specified election.

### Modifiers

- `onlyOwner()`: Restricts function access to the owner.
- `electionExists(uint electionId)`: Checks if an election exists before executing a function.
- `onlyVoter()`: Ensures that the owner cannot vote.

### Events

- `ElectionCreated`: Emitted when a new election is created.
- `CandidateAdded`: Emitted when a new candidate is added to an election.
- `Voted`: Emitted when a vote is cast.
- `ElectionEnded`: Emitted when an election is ended.
- `ElectionWinner`: Emitted when the final results are announced.

## Conclusion

This smart contract provides a robust platform for managing elections and processing votes securely on the blockchain. It ensures transparency in voting and election management while enforcing rules such as one vote per user and owner restrictions on voting.
