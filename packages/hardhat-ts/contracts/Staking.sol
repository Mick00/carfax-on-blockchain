pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Staking is ReentrancyGuard, Ownable {
  address public TOKEN;
  address[] internal stakeholders;
  uint256 public UNSTAKE_TIME = 1 weeks;
  uint256 public FEES = 0.5; //50% of the total stake is taken as a fee.
  mapping(address => Staker) internal stakes;


  struct Staker {
    address addr; // The Address of the Staker
    uint256 lifetime_contribution; // The Total Lifetime Contribution of the Staker
    uint256 contribution; // The Current Contribution of the Staker
    uint256 last_contribution_time; // Last time the Staker made a contribution
    uint256 joined; // When did the Staker start staking
    bool exists;
  }

  constructor(addres _token) ReentrancyGuard() {
    TOKEN = _token;

    Staker memory user;
    user.addr = address(this);
    user.contribution = 0;
    user.lifetime_contribution = 0;
    user.exists = true;
    user.joined = block.timestamp;
    user.last_contribution_time = block.timestamp;
    stakers[msg.sender] = user;
    stakeholders.push(msg.sender);
  }

  receive() external payable {}

  fallback() external payable {}

  function stake(uint256 amount) external {
    require(IERC20(TOKEN).transferFrom(msg.sender, address(this), amount), "Unable to transfer your tokens to this contract");
    if (stakes[msg.sender].exists()) {
      stakers[msg.sender].lifetime_contribution = stakers[msg.sender].lifetime_contribution + amount;
      stakers[msg.sender].contribution = stakers[msg.sender].contribution + amount;
      stakers[msg.sender].last_contribution_time = block.timestamp;
    } else {
      Staker memory user;
      user.addr = msg.sender;
      user.contribution = amount;
      user.lifetime_contribution = amount;
      user.exists = true;
      user.joined = block.timestamp;
      user.last_contribution_time = block.timestamp;

      stakers[msg.sender] = user;
      stakeholders.push(msg.sender);
    }
  }

  function removeStake(uint256 amount) external {
    require(stakes[msg.sender].exists(), "You are not staking");
    require(msg.sender != address(this), "You cannot remove your own stake");
    require(stakes[msg.sender].contribution >= amount, "You do not have enough tokens to unstake");

    address user = msg.sender;

    if (block.timestamp >= stakes[user].lifetime_contribution + UNSTAKE_TIME) {
      IERC20(TOKEN).transfer(user, stakes[user].contribution - amount);
      stakes[user].contribution = stakes[user].contribution - amount
    } else {
      IERC20(TOKEN).transfer(user, amount * 0.5);
      stakes[address(this)].contribution = stakes[address(this)].contribution + (amount * 0.5);
      stakes[user].contribution = stakes[user].contribution - amount;
    }
  }

    function getStake(address user) external view returns (uint256) {
        require(stakes[user].exists(), "User is not staking");
        return stakes[user].contribution;
    }

    function removeFeesContract(address _address) external onlyOwner{
        IERC20(TOKEN).transfer(_address, stakes[address(this)].contribution);
        stakes[address(this)].contribution = 0;
    }

  function UpdateToken(address _token) external onlyOwner {
    TOKEN = _token;
  }
}
