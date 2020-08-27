pragma solidity ^0.4.6;

contract Verify {
    bool public verified;
    
    function verify (
        address addr, 
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public returns (bool) {
        Verifier v = Verifier (addr);
        verified = v.verifyTx (a, b, c, input);
        return verified;
    } 
    
}

contract Verifier {
    function verifyTx (
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c, 
        uint[2] memory input
        ) public returns (bool);
}