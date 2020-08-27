pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract BloodBankRegistry  {
    uint public numberOfDonors;
    address[] public DonorAddress;

    event DonorAdded(address _donorAddress, uint id);

    function addDonor(address _donorAddress) public  returns (uint) {
        uint id = numberOfDonors.length ++;
        numberOfDonors[id] = _donorAddress;
        numberOfDonors = id + 1;
        DonorAdded(_donorAddress, id);
        return id;
    }

    function getDonorDetails() public constant returns (address[]) {
        return DonorAddress;
    }
}
