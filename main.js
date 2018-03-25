const SHA256 = require('crypto-js/sha256');


class Transaction {
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = ''){
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;

  }
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }
  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " +  this.hash);
  }
}

class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock(){
    return new Block("01/01/2017", "Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock)
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}

let lukeCoin = new Blockchain();

// video 1 stuff

// console.log("is blockchain valid?? ", lukeCoin.isChainValid());
//
// lukeCoin.chain[1].data = {amount: 100};
// lukeCoin.chain[1].hash = lukeCoin.chain[1].calculateHash();
//
// console.log("is blockchain valid?? ", lukeCoin.isChainValid());

// console.log(JSON.stringify(lukeCoin, null, 4))

// video 2 stuff

console.log("Mining block 1...");
lukeCoin.addBlock(new Block(1, "03/03/2018",  {amount: 4}));

console.log("Mining block 2...");
lukeCoin.addBlock(new Block(2, "03/05/2018",  {amount: 10}));
