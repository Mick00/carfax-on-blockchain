pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
  uint256 public MAX_SUPPLY = 1000000000000000000;

  constructor() ERC20("CarFaxToken", "CFT") {}

  function mint(uint256 amount) external onlyOwner {
    require(totalSupply() < MAX_SUPPLY, "Token already fully minted.");
    _mint(msg.sender, amount);
  }

  function burn(uint256 amount) external onlyOwner {
    _burn(msg.sender, amount);
  }
}
