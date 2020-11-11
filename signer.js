require('dotenv').config();
const { ethers } = require("ethers");
const { ABI } = require("./dummyABIandBytecode")

module.exports = {
  createRawTx,
  createContractRawTx,
  logBody,
  getNonce,
}

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
let baseNonce = undefined;
const nonceManager = new NonceManager();
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

async function getNonce() {
  const nonce = await wallet.getTransactionCount();
  return nonce;
}


async function getRawTransactionSigned(txNonce) {

  const tx = {
    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    value: ethers.utils.parseEther("0.00001"),
    gasPrice: "0x3B9ACA00",
    gasLimit: "0x4630C0",
    nonce: txNonce
  }

  const rawTx = await wallet.signTransaction(tx);
  return rawTx;
}

async function getRawTransactionSignedFromContract(txNonce) {

  const tx = {
    gasPrice: "0x3B9ACA00",
    gasLimit: "0x4630C0",
    nonce: txNonce
  }
  const txContract = await contract.populateTransaction.add(); // Change this method for your method
  Object.assign(tx, txContract);
  const rawTx = await wallet.signTransaction(tx);
  return rawTx;
}

function createRawTx(requestParams, context, ee, next) {
  if (baseNonce == undefined) {
    getNonce().then(currNonce => {
      baseNonce = currNonce;
      getRawTransactionSigned(baseNonce + nonceManager.getIncreaseNonce()).then(rawTx => {
        context.vars['rawTx'] = rawTx;
        return next();
      });
    });
  }
  else {
    getRawTransactionSigned(baseNonce + nonceManager.getIncreaseNonce()).then(rawTx => {
      context.vars['rawTx'] = rawTx;
      return next();
    });
  }
}

function createContractRawTx(requestParams, context, ee, next) {
  if (baseNonce == undefined) {
    getNonce().then(currNonce => {
      baseNonce = currNonce;
      getRawTransactionSignedFromContract(baseNonce + nonceManager.getIncreaseNonce()).then(rawTx => {
        context.vars['rawTx'] = rawTx;
        return next();
      });
    });
  }
  else {
    getRawTransactionSignedFromContract(baseNonce + nonceManager.getIncreaseNonce()).then(rawTx => {
      context.vars['rawTx'] = rawTx;
      return next();
    });
  }
}

function logBody(requestParams, response, context, ee, next) {
  console.log(response.body);
  return next();
}