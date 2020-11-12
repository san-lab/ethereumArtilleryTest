# Artillery load test to Ethereum Networks

## Description

Artillery test that signs any number of Ethereum transactions and sends them to one or multiple nodes.

## Configuration

1. Create a .env file, you can use env_example as template
2. In ethereumTestBasic.yml specify the node url in "url"
3. Select the desired duration and arrival rate (e.g. 3 3 means 3 request each second for 3 seconds)

Execute:

```
npm install
npm install -g artillery
```

## Launch

Execute:

```
artillery run <any ethereum test>.yml
```

To create a report:

```
artillery run --output report.json ethereumTestBasic.yml
artillery report --output report.html report.json
```

If you have installed artillery in local execute instead:

```
./node_modules/artillery/bin/artillery run ethereumTestBasic.yml
```

## Smart contracts

To change the Smart Contract to test with the "ethereumTestSmartContract.yml" do the following:

1. Compile your Smart Contract using an external tool like "Remix"
2. Paste in this project root folder the ABI and Bytecode following the format of "dummyABIandBytecode.js"
3. Deploy the smart contract (you can use the tool "utils/contractDeployerUtility", just change the import to your ABI and Bytecode)
4. In the file "signer.js" change the import to your ABI
5. Execute the artillery test

## Multiple nodes

To add nodes to the "ethereumTestMultipleNodes.yml" just copy the lines of any "post" and paste below. Then change the url.
