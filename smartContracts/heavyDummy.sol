pragma solidity ^0.5.0;

contract heavyDummy {

    bytes32[500] private field; 
        
    function doWork() public {
        for( uint i=0; i<500; i++ ) {
            field[i] = 0x0000000000000000000000000000000000000000000000000000000000000001;
        }
    }
}