// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IContributorsDelegation {
  function isDelegatedOf(address _delegated) external view returns (uint256);
}

interface ICars {
  function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract Reports is ERC721URIStorage, Ownable {
  using Address for address;

  uint256 private tokenIds;

  uint256 private lastBlock;

  mapping(uint256 => uint256) private reportIdToCarId;
  mapping(uint256 => uint256[]) private carIdtoReportsId;

  IContributorsDelegation private contributors;
  ICars private cars;

  event ReportCreated(uint256 car, address delegated, uint256 report);
  event ReportUpdated(address delegated, uint256 report);
  event ReportDeleted(address delegated, uint256 report, string reason);

  constructor(address _contributors, address _cars) ERC721("CarFaxReports", "CFR") {
    contributors = IContributorsDelegation(_contributors);
    cars = ICars(_cars);
  }

  function create(uint256 _carId, string memory _reportHash) external returns (uint256) {
    require(contributors.isDelegatedOf(msg.sender) != 0, "Caller must be a delegated.");
    require(cars.ownerOf(_carId) != address(0), "Car must be existing.");

    tokenIds++;
    super._mint(msg.sender, tokenIds);
    super._setTokenURI(tokenIds, _reportHash);

    reportIdToCarId[tokenIds] = _carId;
    carIdtoReportsId[_carId].push(tokenIds);

    emit ReportCreated(_carId, msg.sender, tokenIds);

    return tokenIds;
  }

  function update(uint256 _reportId, string memory _reportHash) external {
    require(contributors.isDelegatedOf(msg.sender) != 0, "Caller must be a delegated.");
    require(ownerOf(_reportId) == msg.sender, "Caller must be creator.");

    super._setTokenURI(_reportId, _reportHash);

    lastBlock = block.number;

    emit ReportUpdated(msg.sender, _reportId);
  }

  function burn(uint256 _reportId, string memory _reason) external {
    // require msg.sender to be creator or contributors in case creator lose key.
    require(ownerOf(_reportId) == msg.sender, "Caller must be creator.");

    super._burn(_reportId);

    emit ReportDeleted(msg.sender, _reportId, _reason);
  }

  function lastUpdate() external view returns (uint256) {
    return lastBlock;
  }

  function getCreator(uint256 _reportId) external view returns (address) {
    return ownerOf(_reportId);
  }

  function getCarReports(uint256 _carId) external view returns (uint256[] memory) {
    return carIdtoReportsId[_carId];
  }

  function getReportCar(uint256 _reportId) external view returns (uint256) {
    return reportIdToCarId[_reportId];
  }

  //Gas : 0
  function getTokenIds() external view returns (uint256) {
    return tokenIds;
  }

  function setContributors(address _contributors) external onlyOwner {
    contributors = IContributorsDelegation(_contributors);
  }

  function setCars(address _cars) external onlyOwner {
    cars = ICars(_cars);
  }
}
