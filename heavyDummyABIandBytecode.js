const ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "doWork",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const bytecode = {
	"linkReferences": {},
	"object": "6080604052348015600f57600080fd5b50609f8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80632630dd3a14602d575b600080fd5b60336035565b005b60008090505b6101f4811015606757600160001b6000826101f48110605657fe5b01819055508080600101915050603b565b5056fea265627a7a7231582066b1676f490f9c9f0fa2eced935aa37e48b9507d90fe35013f6ef97f2bd749ba64736f6c63430005110032",
	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x9F DUP1 PUSH2 0x1E PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x28 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x2630DD3A EQ PUSH1 0x2D JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x33 PUSH1 0x35 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x0 DUP1 SWAP1 POP JUMPDEST PUSH2 0x1F4 DUP2 LT ISZERO PUSH1 0x67 JUMPI PUSH1 0x1 PUSH1 0x0 SHL PUSH1 0x0 DUP3 PUSH2 0x1F4 DUP2 LT PUSH1 0x56 JUMPI INVALID JUMPDEST ADD DUP2 SWAP1 SSTORE POP DUP1 DUP1 PUSH1 0x1 ADD SWAP2 POP POP PUSH1 0x3B JUMP JUMPDEST POP JUMP INVALID LOG2 PUSH6 0x627A7A723158 KECCAK256 PUSH7 0xB1676F490F9C9F 0xF LOG2 0xEC 0xED SWAP4 GAS LOG3 PUSH31 0x48B9507D90FE35013F6EF97F2BD749BA64736F6C6343000511003200000000 ",
	"sourceMap": "25:242:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;25:242:0;;;;;;;"
};

module.exports = {
  ABI,
  bytecode,
};
