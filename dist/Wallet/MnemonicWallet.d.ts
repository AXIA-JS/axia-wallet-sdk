import EvmWallet from './EvmWallet';
import { UnsafeWallet, WalletNameType } from './types';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { Tx as AVMTx, UnsignedTx as AVMUnsignedTx } from '@zee-ava/avajs/dist/apis/avm';
import { Tx as PlatformTx, UnsignedTx as PlatformUnsignedTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import { HDWalletAbstract } from "./HDWalletAbstract";
export default class MnemonicWallet extends HDWalletAbstract implements UnsafeWallet {
    evmWallet: EvmWallet;
    type: WalletNameType;
    mnemonic: string;
    accountIndex: number;
    private ethAccountKey;
    constructor(mnemonic: string, account?: number);
    /**
     * Gets the active address on the AppChain in Bech32 encoding
     * @return
     * Bech32 representation of the EVM address.
     */
    getEvmAddressBech(): string;
    /**
     * Returns the derived private key used by the EVM wallet.
     */
    getEvmPrivateKeyHex(): string;
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
     * Signs an EVM transaction on the AppChain.
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
     * Signs a AppChain transaction
     * @remarks
     * Used for Import and Export transactions on the AppChain. For everything else, use `this.signEvm()`
     * @param tx The unsigned transaction
     */
    signC(tx: EVMUnsignedTx): Promise<EVMTx>;
    /**
     * Returns a keychain with the keys of every derived X chain address.
     * @private
     */
    private getKeyChainX;
    /**
     * Returns a keychain with the keys of every derived CoreChain address.
     * @private
     */
    private getKeyChainP;
    /**
     * Gets the active address on the AppChain
     * @return
     * Hex representation of the EVM address.
     */
    getAddressC(): string;
    signMessage(msgStr: string, index: number): string;
}
