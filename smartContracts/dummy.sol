pragma solidity ^0.5.0;

contract dummy {

    uint256 public counter;

    constructor() public {
        counter = 0;
    }
        
    function add() public {
        counter += 1;
    }
}