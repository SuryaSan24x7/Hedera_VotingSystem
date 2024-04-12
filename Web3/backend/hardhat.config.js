require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      // url: "https://pool.arkhia.io/hedera/testnet/json-rpc/v1/03Gef8mb4aY1622ac34C3mW7cW6Y2G29",
      // chainId: 296,
      // accounts: [process.env.OWNER_KEY, process.env.BUYER_KEY],
      url: process.env.API_url,
      chainId: 296,
      accounts: [process.env.TESTNET_OPERATOR_PRIVATE_KEY]
    }},
  // networks: {
  //   // hardhat: {
  //     gas: 12000000,
  //     blockGasLimit: 0x1fffffffffffff,
  //     allowUnlimitedContractSize: true,
  //     timeout: 1800000,
  //   },
  //   // dev: {
  //   //   url: "http://127.0.0.1:8545", //For Local Deployment using Ganache cli
  //   // },

    
  // },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },

  solidity: {
  version: "0.8.18",
    settings: {
    optimizer: {
      enabled: true,
        runs: 200,
      },
  },
},
paths: {
  sources: "./contracts",
    tests: "./test",
      cache: "./cache",
        artifacts: "./artifacts",
  },
mocha: {
  timeout: 40000,
  },
};
