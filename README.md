# Artillery load test to Ethereum Networks

## Description

Artillery test that signs any number of Ethereum transactions and sends them to one or multiple nodes.

## Configuration

1. Create a .env file, you can use env_example as template
2. In ethereumTest.yml specify the node url in "url"
3. Select the desired duration and arrival rate (e.g. 3 3 means 3 request each second for 3 seconds)

Execute:

```
npm install
```

## Launch

Execute:

```
artillery run ethereumTest.yml
```

To create a report:

```
artillery run --output report.json ethereumTest.yml
artillery report --output report.html report.json
```


