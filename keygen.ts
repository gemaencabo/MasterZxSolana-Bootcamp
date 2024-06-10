import { Keypair } from "@solana/web3.js";


const keypair = Keypair.generate();


console.log(`You have generated a new wallet: ${keypair.publicKey.toBase58()} \n\n To save your wallet, copy and paste the following JSON into a file: [${keypair.secretKey}]`)

