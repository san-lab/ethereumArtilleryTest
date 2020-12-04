require('dotenv').config();
const { ethers } = require('ethers');
const { ABI } = require('./dummyABIandBytecode');

const GAS_PRICE = '0x3B9ACA00';
const GAS_LIMIT = '0x4630C0';
const DESTINATION_ACCOUNT = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
const ETHERS_SENT = '0.00001';

class NonceManager {
  constructor() {
    this.nonce = 0;
  }

  getIncreaseNonce() {
    const currNonce = this.nonce;
    this.nonce += 1;
    return currNonce;
  }
}

const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_ENDPOINT);
const wallet = new ethers.Wallet(process.env.PRIV_KEY, provider);
let baseNonce;
const nonceManager = new NonceManager();
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

async function getNonce() {
  const nonce = await wallet.getTransactionCount();
  return nonce;
}

async function getRawTransactionSigned(txNonce) {
  const tx = {
    to: DESTINATION_ACCOUNT,
    value: ethers.utils.parseEther(ETHERS_SENT),
    gasPrice: GAS_PRICE,
    gasLimit: GAS_LIMIT,
    nonce: txNonce,
  };

  const rawTx = await wallet.signTransaction(tx);
  return rawTx;
}

async function getRawTransactionSignedFromContract(txNonce) {
  const tx = {
    gasPrice: GAS_PRICE,
    gasLimit: GAS_LIMIT,
    nonce: txNonce,
  };
  const txContract = await contract.populateTransaction.add(); // Change this method for your method
  Object.assign(tx, txContract);
  const rawTx = await wallet.signTransaction(tx);
  return rawTx;
}

function createRawTx(requestParams, context, ee, next) {
  if (baseNonce === undefined) {
    getNonce().then((currNonce) => {
      baseNonce = currNonce;
      getRawTransactionSigned(baseNonce + nonceManager.getIncreaseNonce()).then((rawTx) => {
        context.vars.rawTx = rawTx;
        return next();
      });
    });
  } else {
    getRawTransactionSigned(baseNonce + nonceManager.getIncreaseNonce()).then((rawTx) => {
      context.vars.rawTx = rawTx;
      return next();
    });
  }
}

function createContractRawTx(requestParams, context, ee, next) {
  if (baseNonce === undefined) {
    getNonce().then((currNonce) => {
      baseNonce = currNonce;
      getRawTransactionSignedFromContract(baseNonce + nonceManager.getIncreaseNonce())
        .then((rawTx) => {
          context.vars.rawTx = rawTx;
          return next();
        });
    });
  } else {
    getRawTransactionSignedFromContract(baseNonce + nonceManager.getIncreaseNonce())
      .then((rawTx) => {
        context.vars.rawTx = rawTx;
        return next();
      });
  }
}

function logBody(requestParams, response, context, ee, next) {
  if (response.body.error) {
    console.log(response.body);
  } else if (process.env.DEBUG === 'true') {
    console.log(`Result: ${response.body.result}`);
  }
  return next();
}

function logBodyForReceipt(requestParams, response, context, ee, next) {

  if (response.body.error || response.body.result === null) {
    console.log(response.body);
  } else if (process.env.DEBUG === 'true') {
    console.log(`Blocknumber: ${response.body.result.blockNumber}, Blockhash: ${response.body.result.blockHash}`);
  }
  return next();
}

function waitForTx(requestParams, context, ee, next) {
  provider.waitForTransaction(context.vars.txHash)
    .then(() => {
      return next();
    })
    .catch(err => {
      console.error(err);
      return next();
    })
}

module.exports = {
  createRawTx,
  createContractRawTx,
  logBody,
  getNonce,
  waitForTx,
  logBodyForReceipt,
};
