import { ChainAlias, ILedgerAppConfig, WalletNameType } from "../types";
import { Transaction } from '@ethereumjs/tx';
import { UnsignedTx as AVMUnsignedTx, Tx as AVMTx } from '@zee-ava/avajs/dist/apis/avm';
import { Credential } from '@zee-ava/avajs/dist/common';
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import { UnsignedTx as PlatformUnsignedTx, Tx as PlatformTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { Buffer } from '@zee-ava/avajs';
import { ChainIdType } from "../../common";
import { PublicMnemonicWallet } from "../PublicMnemonicWallet";
import Transport from '@ledgerhq/hw-transport';
export declare class LedgerWallet extends PublicMnemonicWallet {
    type: WalletNameType;
    static transport: Transport | undefined;
    static config: ILedgerAppConfig | undefined;
    accountIndex: number;
    /**
     *
     * @param xpubAVM of derivation path m/44'/9000'/n' where `n` is the account index
     * @param xpubEVM of derivation path m/44'/60'/0'/0/n where `n` is the account index
     * @param accountIndex The given xpubs must match this index
     * @param config
     */
    constructor(xpubAVM: string, xpubEVM: string, accountIndex: number);
    static setTransport(transport: Transport): Promise<void>;
    /**
     * Create a new ledger wallet instance from the given transport
     * @param transport
     * @param accountIndex
     */
    static fromTransport(transport: Transport, accountIndex?: number): Promise<LedgerWallet>;
    /**
     * Returns the extended public key used by C chain for address derivation.
     * @remarks Returns the extended public key for path `m/44'/60'/0'`. This key can be used to derive C chain addresses.
     * @param transport
     */
    static getExtendedPublicKeyEthAccount(transport: Transport): Promise<string>;
    /**
     * Get the extended public key for a specific C chain address.
     * @returns The xpub of HD node m/44'/60'/0'/0/n where `n` is `accountIndex`
     * @param transport
     * @param accountIndex
     */
    static getExtendedPublicKeyEthAddress(transport: Transport, accountIndex: number): Promise<string>;
    /**
     * Returns the extended public key used by X and P chains for address derivation.
     * @remarks Returns the extended public key for path `m/44'/90000'/n'` where `n` is the account index.
     * @param transport
     * @param accountIndex Which account's public key to derive
     */
    static getExtendedPublicKeyAxcAccount(transport: Transport, accountIndex?: number): Promise<string>;
    /**
     * Get information about the AXC app on the ledger device.
     * @param transport
     */
    static getAxcConfig(transport: Transport): Promise<ILedgerAppConfig>;
    signEvm(tx: Transaction): Promise<Transaction>;
    getTransactionPaths<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx>(unsignedTx: UnsignedTx, chainId: ChainIdType): Promise<{
        paths: string[];
        isAxcOnly: boolean;
    }>;
    getPathFromAddress(address: string): Promise<string>;
    signX(unsignedTx: AVMUnsignedTx): Promise<AVMTx>;
    getChangePath(chainId?: ChainAlias): string;
    getChangeIndex(chainId?: ChainAlias): number;
    getChangeBipPath<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(unsignedTx: UnsignedTx, chainId: ChainIdType): any;
    signTransactionParsable<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx, SignedTx extends AVMTx | PlatformTx | EVMTx>(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx>;
    /**
     *
     * @param accountPath `m/44'/9000'/0'` For X/P Chains, `m/44'/60'/0'` for C Chain
     * @param bip32Paths an array of paths to sign with `['0/0','0/1'..]`
     * @param hash A buffer of the hash to sign
     * @remarks Never sign untrusted hashes. This can lead to loss of funds.
     */
    signHash(accountPath: any, bip32Paths: any, hash: Buffer): Promise<Map<string, Buffer>>;
    signTransactionHash<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx, SignedTx extends AVMTx | PlatformTx | EVMTx>(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx>;
    pathsToUniqueBipPaths(paths: string[]): any[];
    getCredentials<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(unsignedTx: UnsignedTx, paths: string[], sigMap: any, chainId: ChainIdType): Credential[];
    signP(unsignedTx: PlatformUnsignedTx): Promise<PlatformTx>;
    signC(unsignedTx: EVMUnsignedTx): Promise<EVMTx>;
}
