pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking is Ownable {
  address public TOKEN;
  address[] internal stakeholders;
  uint256 public UNSTAKE_TIME = 1 weeks;
  mapping(address => Staker) internal stakers;

  struct Staker {
    address addr; // The Address of the Staker
    uint256 lifetime_contribution; // The Total Lifetime Contribution of the Staker
    uint256 contribution; // The Current Contribution of the Staker
    uint256 last_contribution_time; // Last time the Staker made a contribution
    uint256 joined; // When did the Staker start staking
    bool exists;
  }

    struct Unstake {
        uint256 amount;
        uint256 queuedAt;
    }

    mapping(address => Unstake) public unstakeQueue;

    event StakeUpdated(address indexed _staker, uint stake);
  constructor(address _token) {
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

  function stake(uint256 amount) external {
    require(IERC20(TOKEN).transferFrom(msg.sender, address(this), amount), "Unable to transfer your tokens to this contract");
    if (stakers[msg.sender].exists) {
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
      emit StakeUpdated(msg.sender, stakers[msg.sender].contribution);
  }

    function queueUnstake(uint amount) external {
        require(stakers[msg.sender].contribution >= amount, "You do not have enough tokens to unstake");
        stakers[msg.sender].contribution = stakers[msg.sender].contribution - amount;
        unstakeQueue[msg.sender].amount += amount;
        unstakeQueue[msg.sender].queuedAt = block.timestamp;
        emit StakeUpdated(msg.sender, stakers[msg.sender].contribution);
    }

  function unstake() external {
      require(block.timestamp >= unstakeQueue[msg.sender].queuedAt + UNSTAKE_TIME, "unstake period is not over");
      IERC20(TOKEN).transfer(msg.sender, unstakeQueue[msg.sender].amount);
      delete unstakeQueue[msg.sender];
  }

  function getStake(address _adress) external view returns (uint256) {
    return stakers[_adress].contribution;
  }

  function removeFeesContract(address _address) external onlyOwner {
    IERC20(TOKEN).transfer(_address, stakers[address(this)].contribution);
    stakers[address(this)].contribution = 0;
  }

  function UpdateToken(address _token) external onlyOwner {
    TOKEN = _token;
  }
}
