import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LoanAgreement from "../artifacts/contracts/LoanAgreement.sol/LoanAgreement.json";

function LoanMarketplace() {
  const [loans, setLoans] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0xYourDeployedContractAddress"; // Replace with deployed contract address
        const loanContract = new ethers.Contract(contractAddress, LoanAgreement.abi, signer);
        setContract(loanContract);
      }
    };
    init();
  }, []);

  const fetchLoans = async () => {
    if (contract) {
      // Fetch loans from the blockchain
      const loan = {
        amount: await contract.loanAmount(),
        interestRate: await contract.interestRate(),
        duration: await contract.repaymentPeriod(),
      };
      setLoans([loan]);
    }
  };

  return (
    <div>
      <h2>Loan Marketplace</h2>
      <button onClick={fetchLoans}>Refresh Loans</button>
      <ul>
        {loans.map((loan, index) => (
          <li key={index}>
            <p>Loan Amount: {ethers.utils.formatEther(loan.amount)} ETH</p>
            <p>Interest Rate: {loan.interestRate.toString()}%</p>
            <p>Duration: {loan.duration.toString()} days</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanMarketplace;
