// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Contributors is ERC721URIStorage, Ownable {
  //For now since we can't delete from mapping.
  struct Confirmation {
    string ipfsHash;
    bool isClaimed;
  }

  //registrar => contributor => confirmation
  mapping(address => mapping(address => Confirmation)) private waitingForConfirmation;

  mapping(uint256 => address) private tokenToContributor;

  //Used for unique contributor.
  //Also, this remove the possibility of 2 registar confirming the same contributor.
  string[] private claimedConfirmationHash;

  //id count.
  uint256 private tokenIds;

  //Events
  event Registered(string contributorHash, address contributor, address registrar);
  event ConfirmedRegistration(address contributor, uint256 tokenId);
  event RemovedRegistrator(address registrator, uint256 tokenId);

  //Modifier
  modifier isHashUnique(string memory hash) {
    for (uint256 i = 0; i < claimedConfirmationHash.length; i++) {
      if (keccak256(abi.encodePacked((claimedConfirmationHash[i]))) == keccak256(abi.encodePacked((hash)))) {
        return;
      }
    }
    _;
  }

  constructor() ERC721("CarFaxContributors", "CFC") {}

  function register(string memory _contributorHash, address _contributor) external isHashUnique(_contributorHash) {
    address registrar = msg.sender;
    // caller must be a valid registrar

    // if confirmation already exist?

    waitingForConfirmation[registrar][_contributor] = Confirmation(_contributorHash, false);

    emit Registered(_contributorHash, _contributor, registrar);
  }

  function confirmRegistration(address _registrarAddress) external returns (uint256) {
    address contributor = msg.sender;
    Confirmation storage confirmation = waitingForConfirmation[_registrarAddress][contributor];

    require(!_isHashEmpty(confirmation.ipfsHash), "Confirmation does not exist.");
    require(!confirmation.isClaimed, "Contributor already claimed token.");

    tokenIds++;
    tokenToContributor[tokenIds] = contributor;
    super._mint(contributor, tokenIds);
    super._setTokenURI(tokenIds, confirmation.ipfsHash);

    confirmation.isClaimed = true;
    claimedConfirmationHash.push(confirmation.ipfsHash);

    emit ConfirmedRegistration(contributor, tokenIds);

    return tokenIds;
  }

  function getTokenIds() external view returns (uint256) {
    return tokenIds;
  }

  function getConfirmation(address registrar, address contributor) external view returns (Confirmation memory) {
    return waitingForConfirmation[registrar][contributor];
  }

  //===============================================================================

  function removeContributor(uint256 _tokenId) external onlyOwner {
    address registrator = super.ownerOf(_tokenId);

    // delete data in case they register back in futur ?
    // how do i get registar to change confirmation ?

    // what i do about baseuri ?
    string memory hash = super.tokenURI(_tokenId);
    for (uint256 i = 0; i < claimedConfirmationHash.length; i++) {
      if (keccak256(abi.encodePacked((claimedConfirmationHash[i]))) == keccak256(abi.encodePacked((hash)))) {
        delete claimedConfirmationHash[i];
        super._burn(_tokenId);
        break;
      }
    }

    emit RemovedRegistrator(registrator, _tokenId);
  }

  function _isHashEmpty(string memory hash) private pure returns (bool) {
    return bytes(hash).length == 0;
  }
}
