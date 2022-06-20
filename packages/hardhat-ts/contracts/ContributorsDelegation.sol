// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IContributors {
  function balanceOf(address owner) external returns (uint256);

  function ownerOf(uint256 tokenId) external returns (address);
}

//Each Registrar got their own contract
contract ContributorsDelegation is Ownable {
  using Address for address;

  IContributors private contributors;

  mapping(address => uint256) private delegateToContributor;

  event Delegate(address contributor, address delegate, uint256 contributorId);
  event Undelegate(address delegate, uint256 contributorId);

  modifier isContributor(uint256 _contributorId) {
    require(msg.sender == contributors.ownerOf(_contributorId), "Caller must be owner of token");
    _;
  }

  //Gas : 890564
  constructor(address _contributors) {
    contributors = IContributors(_contributors);
  }

  //Gas : 56641
  function delegate(uint256 _contributorId, address _delegate) external isContributor(_contributorId) {
    address contributorAddress = msg.sender;
    delegateToContributor[_delegate] = _contributorId;
    emit Delegate(contributorAddress, _delegate, _contributorId);
  }

  //Gas : 32501
  function undelegate(uint256 _contributorId, address _delegate) external isContributor(_contributorId) {
    delete delegateToContributor[_delegate];
    emit Undelegate(_delegate, _contributorId);
  }

  //Gas : 0
  function isDelegatedOf(address _delegated) external view returns (uint256) {
    return delegateToContributor[_delegated];
  }

  //Gas : 29183
  function setContributorsContract(address _contributors) external onlyOwner {
    require(_contributors.isContract(), "Contributors must be a valid contract");
    contributors = IContributors(_contributors);
  }
}
