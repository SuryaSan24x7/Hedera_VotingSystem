# Hedera Voting System

Welcome to the Hedera Voting System, a decentralized application (DApp) built on the Hedera Hashgraph blockchain. This DApp leverages the unique properties of Hedera Hashgraph to provide a fast, fair, and secure platform for conducting elections. Designed with both administrative and voter interfaces, it facilitates a range of functionalities from election creation to candidate management and voting.

## Features

**Admin Features:**
- **Create Elections:** Admins can initiate new elections, defining their start and end times.
- **Add Candidates:** For each election, admins can add candidates who are competing in the election.
- **End Elections:** Admins have the capability to close the voting process when the election period ends.

**Voter Features:**
- **Vote:** Voters can cast their votes securely and anonymously from their digital devices.
- **View Active Elections and Candidates:** Both admins and voters can view ongoing elections and detailed information about candidates.

## Technology Stack

- **Frontend:** The user interface is built using React, providing a responsive and intuitive design.
- **Backend:** The backend is developed with Express.js, managing user authentication, and interactions with the blockchain.
- **Blockchain:** Using the Hedera Hashgraph for recording votes ensures transparency while maintaining voter privacy.
- **MetaMask:** Integration for seamless interaction with the blockchain and handling of cryptocurrency transactions.
- **Discord Bot:** A Discord bot is included to allow users to interact with the voting system directly through Discord, enhancing accessibility.

## Getting Started

### Prerequisites
- Ensure you have Node.js installed on your machine.
- MetaMask extension installed on your browser for interacting with the blockchain.
- Access to a Hedera account with sufficient HBAR for transaction fees.

### Setup

1. **Clone the Repository**
```
git clone [repository-url]
cd Hedera_VotingSystem
```
2. **Install Dependencies**

- For the frontend:
  ```
  cd ../Web3/frontend
  npm install
  ```

- For the backend:
  ```
  cd ../Web3/backend
  npm install
  ```

3. **Start the Backend Server**
```
npm start
```
4. **Start the Frontend Application**
```
npm start
```

### Configuration

- **Environment Variables:** Set up the required environment variables such as `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, and any other necessary API keys.

## Usage

Access the web application through `http://localhost:3000` after starting the frontend. Use the Discord bot within your configured Discord server to interact with the application using simple commands.

## Working Demo 
https://hedera-voting-system-git-main-suryasan24x7s-projects.vercel.app/
## License

This project is licensed under the [MIT License](LICENSE).
