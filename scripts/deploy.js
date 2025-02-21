const hre = require("hardhat");

async function main() {
  const LoanAgreement = await hre.ethers.getContractFactory("LoanAgreement");
  const loanAgreement = await LoanAgreement.deploy(
    "0xYourBorrowerAddress", // Replace with borrower address
    "0xYourTokenAddress", // Replace with token address (e.g., USDC)
    "0xYourCollateralTokenAddress", // Replace with collateral token address (e.g., ETH)
    ethers.utils.parseEther("1"), // Loan amount (1 ETH)
    10, // Interest rate (10%)
    30, // Repayment period (30 days)
    ethers.utils.parseEther("1.5"), // Collateral amount (1.5 ETH)
    "0xYourChainlinkPriceFeedAddress" // Replace with Chainlink price feed address
  );

  await loanAgreement.deployed();

  console.log("LoanAgreement deployed to:", loanAgreement.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
