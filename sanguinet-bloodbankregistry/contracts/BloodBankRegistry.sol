pragma solidity ^0.5.16;

import './BloodBankDonorFeedOracle.sol';
import './BloodBankDonorProofVerifier.sol';

contract BloodBankRegistry  {
  uint public creationTime = now;
  
  modifier onlyBefore(uint _time) { 
    require(now < _time); _; 
  }
  
  modifier onlyAfter(uint _time) { 
    require(now > _time); _; 
  }
  
  modifier onlyBy(address account) { 
    require(msg.sender == account);  _; 
  }
  
  modifier condition(bool _condition) { 
    require(_condition); _; 
  }
  
  modifier minAmount(uint _amount) { 
    require(msg.value >= _amount); _; 
  }

  function f() payable onlyAfter(creationTime + 1 minutes) onlyBy(owner) minAmount(1 ether) condition(msg.sender.balance >= 5 ether) {
    emit BloodBankDonorFeedOracle.updateDonorProfile();
  }
}
