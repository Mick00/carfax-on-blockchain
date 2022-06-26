// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Contributors is ERC721URIStorage, Ownable {
  //registrar => contributor => ipfshash
  mapping(address => mapping(address => string)) public waitingForConfirmation;
  mapping(uint => address) public contributorRegistrar;

  mapping(address => bool) public registrars;

  //id count.
  uint256 private tokenIds;

  //Events
  event Registered(string contributorHash, address indexed contributor, address indexed registrar);
  event ConfirmedRegistration(address indexed contributor, uint256 indexed tokenId);
  event RemovedContributor(address indexed registrator, uint256 indexed tokenId);
  event AddedRegistrar(address indexed registrar);
  event RemovedRegistrar(address indexed registrar);

  modifier isRegistrar() {
    require(registrars[msg.sender], "Caller is not a registrar");
    _;
  }

  //Gas to deploy contract : 3233690
  constructor() ERC721("CarFaxContributor", "CFC") {}

  //Gas without registrar validation : 48671
  function register(string memory _contributorHash, address _contributor) external isRegistrar {
    address registrar = msg.sender;
    waitingForConfirmation[registrar][_contributor] = _contributorHash;

    emit Registered(_contributorHash, _contributor, registrar);
  }

  // Gas : 124010
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

  function addRegistrar(address _registrar) external onlyOwner {
    registrars[_registrar] = true;
      emit AddedRegistrar(_registrar);
  }

  function removeRegistrar(address _registrar) external onlyOwner {
    delete registrars[_registrar];
      emit RemovedRegistrar(_registrar);
  }

  function _isHashEmpty(string memory hash) private pure returns (bool) {
    return bytes(hash).length == 0;
  }
}
