require('dotenv').config()
const { ethers } = require("ethers");

module.exports = {
  createRawTx: createRawTx,
  logBody: logBody,
  getNonce: getNonce,
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

const provider = new ethers.providers.JsonRpcProvider(process.env.PRIV_KEY);
const wallet = new ethers.Wallet(process.env.NODE_ENDPOINT, provider);
let baseNonce = undefined;
const nonceManager = new NonceManager();

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

function logBody(requestParams, response, context, ee, next) {
  console.log(response.body);
  return next();
}