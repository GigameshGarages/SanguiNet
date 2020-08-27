pragma solidity ^0.5.2;

import "BeaconContract.sol";

contract Beacon{
    function getLatestRandomness()external view returns(uint256,bytes32){}
    
}

contract BloodBankDonorFeedOracle {
    
  address public oracleAddress;
  
  address public BeaconContractAddress=0x79474439753C7c70011C3b00e06e559378bAD040;

  constructor (address _oracleAddress) public {
    oracleAddress = _oracleAddress;
  }
  
  function setBeaconContractAddress(address _address) public  {
        BeaconContractAddress=_address;
    }
    
    function generateRandomNumber() public view returns(bytes32){
        uint blockNumber;
        bytes32 randomNumber;
        Beacon beacon=Beacon(BeaconContractAddress);
        (blockNumber,randomNumber)=beacon.getLatestRandomness();
        return randomNumber;
       
    }

  event DonorProfileFeed (
    string DonoationDescription,
    string bodyWeight,
    string plateletCount,
    string numberOfDonations,
    string lastDonationDate,
    string lastDonationPlace
  );

  function updateDonorProfile (
    string memory DonoationDescription,
    string memory bodyWeight,
    string memory plateletCount,
    string memory numberOfDonations,
    string memory lastDonationDate,
    string memory lastDonationPlace
  )
  public
  {
    require(msg.sender == oracleAddress);

   if ((bytes32(block.number))> generateRandomNumber()) {

    emit DonorProfileFeed (
      DonoationDescription,
      bodyWeight,
      plateletCount,
      numberOfDonations,
      lastDonationDate,
      lastDonationPlace
    );
   }
  }
}
