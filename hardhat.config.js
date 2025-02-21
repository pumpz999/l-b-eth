require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
      accounts: ["YOUR_PRIVATE_KEY"] // Replace with your private key (32 bytes)
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["YOUR_PRIVATE_KEY"] // Replace with your private key (32 bytes)
    }
  }
};
