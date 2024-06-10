import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import wallet from "./wallet.json";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("BfNuQzQuxiaJdMeFzJKoEpXVaEdUvYMT7L6g6753QVJN");

(async () => {
    try {

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        const ata = tokenAccount.address;
        console.log("Associated Token Account: ", ata.toBase58());


        const mintSignature = await mintTo(
            connection,
            keypair,
            mint,
            ata,
            keypair,
            10e6
        );

        console.log(`Minted 20e6 tokens to ${ata.toBase58()}`);
        console.log(`Transaction Signature: https://explorer.solana.com/tx/${mintSignature}?cluster=devnet`);

    } catch (error) {
        console.error("Error during minting:", error);
    }
})();
