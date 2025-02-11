// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
    This is the contract for Cars NFT. It inherits the OpenZeppelin contract
*/
contract Cars is Ownable, ERC721URIStorage {
  mapping(string => uint256) public serialNumberToCar;
  mapping(uint256 => uint256) public carToOdometer;

  uint256 private tokenIds;

  event Registered(uint256 indexed carId, string indexed serialNumber, uint256 odometer, string hash);
  event UpdateOdometer(uint256 indexed carId, uint256 odometer);

  constructor() ERC721("CarFaxCars", "CFCa") {}


    /*
    @dev This methods mints a new Car NFT.
    @param _serialNumber
    @param _odometer The odometer value is in meters
    @param _hash The IPFS hash
    */
  function register(
    string memory _serialNumber,
    uint256 _odometer,
    string memory _hash
  ) external returns (uint256) {
    require(serialNumberToCar[_serialNumber] == 0, "Car already minted.");
    tokenIds++;
    super._mint(address(this), tokenIds);
    super._setTokenURI(tokenIds, _hash);
    serialNumberToCar[_serialNumber] = tokenIds;
    carToOdometer[tokenIds] = _odometer;
    emit Registered(tokenIds, _serialNumber, _odometer, _hash);
    return tokenIds;
  }

  /*
    @dev Manque de securite pour le moment vu que le token appartient a address(this)
    @param _carId ID of the NFT representing the car
    @param _odometer odometer value in meters
  */
  function updateOdometer(uint256 _carId, uint256 _odometer) external {
    super.ownerOf(_carId);
    carToOdometer[_carId] = _odometer;
    emit UpdateOdometer(_carId, _odometer);
  }

  function getTokenIds() external view returns (uint256) {
    return tokenIds;
  }

  function getOdometerFromCar(uint256 _carId) external view returns (uint256) {
    return carToOdometer[_carId];
  }

  function getOdometerFromSerialNumber(string memory _serialNumber) external view returns (uint256) {
    return carToOdometer[serialNumberToCar[_serialNumber]];
  }

  function getTokenURIFromSerialNumber(string memory _serialNumber) external view returns (string memory) {
      return tokenURI(serialNumberToCar[_serialNumber]);
  }
}
