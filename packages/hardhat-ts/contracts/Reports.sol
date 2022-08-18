// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./Cars.sol";
import "./ContributorsDelegation.sol";
import "./Contributors.sol";

/*
This contract tokenize reports with NFT
*/
contract Reports is ERC721URIStorage, Ownable {
  using Address for address;

  uint256 private tokenIds;

  mapping(uint256 => uint256) public reportIdToCarId;
  mapping(uint256 => uint256) public reportIdToContributorId;
  mapping(uint256 => uint256[]) public carIdtoReportsId;

  ContributorsDelegation public contributorsDelegation;
  Contributors public contributors;
  Cars public cars;

  event ReportCreated(uint256 indexed car, uint256 indexed report, address delegated, uint256 indexed contributorId);
  event ReportUpdated(address delegated, uint256 indexed report);
  event ReportDeleted(address delegated, uint256 indexed report, string reason);

    /*
    @param _contributorsDelegation address of the contributor delegation contract
    @param _cars address of the Cars contract
    */
  constructor(address _contributorsDelegation, address _cars) ERC721("CarFaxReports", "CFR") {
    contributorsDelegation = ContributorsDelegation(_contributorsDelegation);
    contributors = contributorsDelegation.contributors();

    cars = Cars(_cars);
  }

    /*
    @dev It can only be called by a delegated user
    @param _carId ID of the NFT representing the car
    @param _reportHash IPFS hash of the report
    @param _odometer odometer in metres
    */
  function create(uint256 _carId, string memory _reportHash, uint256 _odometer) external returns (uint256) {
    uint256 contributorId = contributorsDelegation.isDelegatedOf(msg.sender);
    require(contributorId != 0, "Caller must be a delegated.");
    require(cars.ownerOf(_carId) != address(0), "Car must be existing.");
    cars.updateOdometer(_carId, _odometer);
    tokenIds++;
    super._mint(contributors.ownerOf(contributorId), tokenIds);
    super._setTokenURI(tokenIds, _reportHash);

    reportIdToCarId[tokenIds] = _carId;
    reportIdToContributorId[tokenIds] = contributorId;
    carIdtoReportsId[_carId].push(tokenIds);

    emit ReportCreated(_carId, tokenIds, msg.sender, contributorId);

    return tokenIds;
  }

  modifier onlyReportContributor(uint256 _reportId) {
    require(contributorsDelegation.isDelegatedOf(msg.sender) == reportIdToContributorId[_reportId], "Caller must be a delegated.");
    _;
  }

  function update(uint256 _reportId, string memory _reportHash) external onlyReportContributor(_reportId) {
    super._setTokenURI(_reportId, _reportHash);
    emit ReportUpdated(msg.sender, _reportId);
  }

  function burn(uint256 _reportId, string memory _reason) external onlyReportContributor(_reportId) {
    delete reportIdToContributorId[_reportId];
    super._burn(_reportId);
    emit ReportDeleted(msg.sender, _reportId, _reason);
  }

  function getCreator(uint256 _reportId) external view returns (address) {
    return ownerOf(_reportId);
  }

  function getReportsForCar(uint256 _carId) external view returns (uint256[] memory) {
    return carIdtoReportsId[_carId];
  }

  function getCarForReport(uint256 _reportId) external view returns (uint256) {
    return reportIdToCarId[_reportId];
  }

  function ownerOf(uint256 tokenId) public view virtual override returns (address) {
    uint256 contributorId = reportIdToContributorId[tokenId];
    require(contributorId != 0, "ERC721: owner query for nonexistent token");
    return contributors.ownerOf(contributorId);
  }

  //Gas : 0
  function getTokenIds() external view returns (uint256) {
    return tokenIds;
  }

  function setContributorsDelegation(address _contributorsDeleg) external onlyOwner {
    contributorsDelegation = ContributorsDelegation(_contributorsDeleg);
  }

function setContributorsContract(address _contributorsContract) external onlyOwner {
    contributors = Contributors(_contributorsContract);
}

  function setCars(address _cars) external onlyOwner {
    cars = Cars(_cars);
  }
}
