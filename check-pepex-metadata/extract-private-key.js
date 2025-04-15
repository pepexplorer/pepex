const fs = require('fs');
const bs58 = require('bs58');

// Read the keypair JSON file
const keypairJson = JSON.parse(fs.readFileSync('/home/pepex/solflare-wallet.json'));
const secretKey = Uint8Array.from(keypairJson);
const base58Key = bs58.encode(secretKey);

console.log("Base58 Private Key:\n", base58Key);

