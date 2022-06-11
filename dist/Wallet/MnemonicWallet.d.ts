import { EvmWallet } from './EVM/EvmWallet';
import { UnsafeWallet, WalletNameType } from './types';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { Tx as AVMTx, UnsignedTx as AVMUnsignedTx } from '@zee-ava/avajs/dist/apis/avm';
import { Tx as PlatformTx, UnsignedTx as PlatformUnsignedTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import { HDWalletAbstract } from "./HDWalletAbstract";
import { TypedDataV1, TypedMessage } from '@metamask/eth-sig-util';
export declare class MnemonicWallet extends HDWalletAbstract implements UnsafeWallet {
    evmWallet: EvmWallet;
    type: WalletNameType;
    private mnemonicCypher;
    accountIndex: number;
    private ethAccountKey;
    constructor(mnemonic: string, account?: number);
    /**
     * Returns the derived private key used by the EVM wallet.
     */
    getEvmPrivateKeyHex(): string;
    /**
     * Return the mnemonic phrase for this wallet.
     */
    getMnemonic(): string;
    /**
     * Generates a 24 word mnemonic phrase and initializes a wallet instance with it.
     * @return Returns the initialized wallet.
     */
    static create(): MnemonicWallet;
    /**
     * Returns a new 24 word mnemonic key phrase.
     */
    static generateMnemonicPhrase(): string;
    /**
     * Returns a new instance of a Mnemonic wallet from the given key phrase.
     * @param mnemonic The 24 word mnemonic phrase of the wallet
     */
    static fromMnemonic(mnemonic: string): MnemonicWallet;
    /**
     * Validates the given string is a valid mnemonic.
     * @param mnemonic
     */
    static validateMnemonic(mnemonic: string): boolean;
    /**
     * Signs an EVM transaction on the C chain.
     * @param tx The unsigned transaction
     */
    signEvm(tx: Transaction | FeeMarketEIP1559Transaction): Promise<Transaction | FeeMarketEIP1559Transaction>;
    /**
     * Signs an AVM transaction.
     * @param tx The unsigned transaction
     */
    signX(tx: AVMUnsignedTx): Promise<AVMTx>;
    /**
     * Signs a PlatformVM transaction.
     * @param tx The unsigned transaction
     */
    signP(tx: PlatformUnsignedTx): Promise<PlatformTx>;
    /**
     * Signs a C chain transaction
     * @remarks
     * Used for Import and Export transactions on the C chain. For everything else, use `this.signEvm()`
     * @param tx The unsigned transaction
     */
    signC(tx: EVMUnsignedTx): Promise<EVMTx>;
    /**
     * Returns a keychain with the keys of every derived X chain address.
     * @private
     */
    private getKeyChainX;
    /**
     * Returns a keychain with the keys of every derived P chain address.
     * @private
     */
    private getKeyChainP;
    signMessage(msgStr: string, index: number): string;
    /**
     * This function is equivalent to the eth_sign Ethereum JSON-RPC method as specified in EIP-1417,
     * as well as the MetaMask's personal_sign method.
     * @remarks Signs using the C chain address.
     * @param data The hex data to sign
     */
    personalSign(data: string): Promise<string>;
    /**
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * @param data The typed data to sign.
     * */
    signTypedData_V1(data: TypedDataV1): Promise<string>;
    /**
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * @param data The typed data to sign.
     */
    signTypedData_V3(data: TypedMessage<any>): Promise<string>;
    /**
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     */
    signTypedData_V4(data: TypedMessage<any>): Promise<string>;
}
