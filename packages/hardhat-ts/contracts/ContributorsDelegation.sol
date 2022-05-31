// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IContributors {
  function balanceOf(address owner) external returns (uint256);

  function ownerOf(uint256 tokenId) external returns (address);
}

//Each Registrar got their own contract
contract ContributorsDelegation is Ownable {
  address private registrar;
  IContributors private contributors;

  mapping(address => uint256) private delegateToContributor;

  event Delegate(address contributor, address delegate, uint256 contributorId);
  event Undelegate(address delegate, uint256 contributorId);

  modifier isOwnerOrRegistar(address _caller) {
    require(msg.sender == super.owner() || msg.sender == registrar, "Caller must be owner or registrar");
    _;
  }

  modifier isContributor(address _caller, uint256 _contributorId) {
    require(_caller == contributors.ownerOf(_contributorId), "Caller must be owner of token");
    _;
  }

  //Gas : 890564
  constructor(address _registar, address _contributors) {
    registrar = _registar;
    contributors = IContributors(_contributors);
  }

  //Gas : 56641
  function delegate(uint256 _contributorId, address _delegate) external isContributor(msg.sender, _contributorId) {
    address contributorAddress = contributors.ownerOf(_contributorId);
    delegateToContributor[_delegate] = _contributorId;
    emit Delegate(contributorAddress, _delegate, _contributorId);
  }

  //Gas : 32501
  function undelegate(uint256 _contributorId, address _delegate) external isContributor(msg.sender, _contributorId) {
    delete delegateToContributor[_delegate];
    emit Undelegate(_delegate, _contributorId);
  }

  //Gas : 0
  function isDelegatedOf(address _delegated) external view returns (uint256) {
    return delegateToContributor[_delegated];
  }

  //Gas : 0
  function getRegistrar() external view returns (address) {
    return registrar;
  }

  //Gas : 26449
  function setRegistrar(address _registar) external isOwnerOrRegistar(msg.sender) {
    registrar = _registar;
  }

  //Gas : 29183
  function setContributors(address _address) external isOwnerOrRegistar(msg.sender) {
    contributors = IContributors(_address);
  }
}
