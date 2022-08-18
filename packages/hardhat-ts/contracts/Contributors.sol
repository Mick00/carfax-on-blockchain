// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Staking.sol";
/*
This contracts tokenize the contributor role with NFT
*/
contract Contributors is ERC721URIStorage, Ownable {
    Staking immutable staking;

  //registrar => contributor => ipfshash
  mapping(address => mapping(address => string)) public waitingForConfirmation;
  mapping(uint => address) public contributorRegistrar;

  //id count.
  uint256 private tokenIds;

    //Events
    //Emitted when a registrar registers a contributor
    event Registered(string contributorHash, address indexed contributor, address indexed registrar);
    //Emitted when the contributor confirms his registration
    event ConfirmedRegistration(address indexed contributor, uint256 indexed tokenId);
    //Emitted when a registrars removes a contributor
    event RemovedContributor(address indexed registrator, uint256 indexed tokenId);


  modifier onlyRegistrar() {
    require(_isRegistrar(msg.sender), "Caller is not a registrar");
    _;
  }

  //Gas to deploy contract : 3233690
  constructor(address _staking) ERC721("CarFaxContributor", "CFC") {
      staking = Staking(_staking);
  }

  /*
  @dev This function should be called by registrars to register a new contributor
  @param _contributorHash IPFS hash of the contributor's data
  @param _contributor Address of the contributor to claim the NFT
  */
  function register(string memory _contributorHash, address _contributor) external onlyRegistrar {
    address registrar = msg.sender;
    waitingForConfirmation[registrar][_contributor] = _contributorHash;

    emit Registered(_contributorHash, _contributor, registrar);
  }

  /*
  This function should be called by the contributor confirming his registration
  @param _registrarAddress Address of the registrar the contributor is accepting the registration request
  */
  function confirmRegistration(address _registrarAddress) external returns (uint256) {
    address contributor = msg.sender;
    string storage ipfsHash = waitingForConfirmation[_registrarAddress][contributor];

    require(!_isHashEmpty(ipfsHash), "Confirmation does not exist.");

    tokenIds++;
    super._mint(contributor, tokenIds);
    super._setTokenURI(tokenIds, ipfsHash);
    contributorRegistrar[tokenIds] = _registrarAddress;
    delete waitingForConfirmation[_registrarAddress][contributor];

    emit ConfirmedRegistration(contributor, tokenIds);

    return tokenIds;
  }

  //Gas : 0
  function getTokenIds() external view returns (uint256) {
    return tokenIds;
  }

  //Gas : 0
  function getConfirmationHash(address registrar, address contributor) external view returns (string memory) {
    return waitingForConfirmation[registrar][contributor];
  }

  //===============================================================================

  //Gas : 39092
  function removeContributor(uint256 _tokenId) external onlyOwner {
    address registrator = super.ownerOf(_tokenId);
    super._burn(_tokenId);
    emit RemovedContributor(registrator, _tokenId);
  }

  function isRegistrar(address _address) external view returns(bool) {
      return _isRegistrar(_address);
  }

    function _isRegistrar(address _address) internal view returns(bool) {
        return staking.getStake(_address) > 0;
    }

  function _isHashEmpty(string memory hash) private pure returns (bool) {
    return bytes(hash).length == 0;
  }
}
