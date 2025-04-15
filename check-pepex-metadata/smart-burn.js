require('dotenv').config();
const {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');
const {
  getOrCreateAssociatedTokenAccount,
  burn,
} = require('@solana/spl-token');
const bs58 = require('bs58');

// Load wallet from env
const secretKey = bs58.decode(process.env.PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(secretKey);
const connection = new Connection(process.env.RPC_URL, 'confirmed');

// CONFIG: Put your token mint address here
const MINT_ADDRESS = new PublicKey('4dqZbYECcacyV6M928jtHWC3N5SWTSsnXrq4tsohTU3Z');

// Main burn function
(async () => {
  try {
    console.log("🔗 Connecting to Solana...");
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      MINT_ADDRESS,
      wallet.publicKey
    );

    const burnAmount = BigInt(21000000 * 0.005 * 10 ** 9); // 0.5% of total supply

    console.log(`🔥 Burning ${burnAmount / BigInt(10 ** 9)} PEPEX...`);

    const signature = await burn(
      connection,
      wallet,
      tokenAccount.address,
      MINT_ADDRESS,
      wallet,
      burnAmount
    );

    console.log(`✅ Burn successful! Tx Signature: ${signature}`);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();

