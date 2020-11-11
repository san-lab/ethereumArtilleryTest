class NonceManager {
    constructor() {
        this.nonce = 5;
    }
    getIncreaseNonce() {
        tmpNonce = this.nonce;
        this.nonce += 1;
        return tmpNonce;
    }
}