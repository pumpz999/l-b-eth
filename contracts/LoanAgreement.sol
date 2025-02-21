// Updated Loan Agreement Smart Contract with Multi-Token Support
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract LoanAgreement {
    address public lender;
    address public borrower;
    address public tokenAddress;
    address public collateralTokenAddress;
    uint256 public loanAmount;
    uint256 public interestRate;
    uint256 public repaymentPeriod;
    uint256 public collateralAmount;
    bool public isRepaid;
    AggregatorV3Interface internal priceFeed;

    constructor(
        address _borrower,
        address _tokenAddress,
        address _collateralTokenAddress,
        uint256 _loanAmount,
        uint256 _interestRate,
        uint256 _repaymentPeriod,
        uint256 _collateralAmount,
        address _priceFeedAddress
    ) {
        lender = msg.sender;
        borrower = _borrower;
        tokenAddress = _tokenAddress;
        collateralTokenAddress = _collateralTokenAddress;
        loanAmount = _loanAmount;
        interestRate = _interestRate;
        repaymentPeriod = _repaymentPeriod;
        collateralAmount = _collateralAmount;
        isRepaid = false;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function getCollateralValue() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (collateralAmount * uint256(price)) / 1e8;
    }

    function repayLoan() external {
        require(msg.sender == borrower, "Only borrower can repay");
        uint256 repaymentAmount = loanAmount + (loanAmount * interestRate) / 100;
        IERC20(tokenAddress).transferFrom(borrower, lender, repaymentAmount);
        isRepaid = true;
        // Release collateral
    }

    function liquidateCollateral() external {
        require(block.timestamp > repaymentPeriod && !isRepaid, "Loan is not due or already repaid");
        // Liquidate collateral
    }
}
