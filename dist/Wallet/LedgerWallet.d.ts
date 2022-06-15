import Eth from '@ledgerhq/hw-app-eth';
import AppAxc from '@zee-ava/hd-wallet-axia';
import HDKey from 'hdkey';
import { ChainAlias, ILedgerAppConfig, WalletNameType } from "./types";
import { Transaction } from '@ethereumjs/tx';
import { UnsignedTx as AXVMUnsignedTx, Tx as AXVMTx } from '@zee-ava/avajs/dist/apis/axvm';
import { Credential } from '@zee-ava/avajs/dist/common';
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import { UnsignedTx as PlatformUnsignedTx, Tx as PlatformTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { HDWalletAbstract } from "./HDWalletAbstract";
import EvmWalletReadonly from "./EvmWalletReadonly";
import { ChainIdType } from "../types";
import * as bip32 from 'bip32';
export default class LedgerWallet extends HDWalletAbstract {
    evmWallet: EvmWalletReadonly;
    type: WalletNameType;
    evmAccount: HDKey;
    config: ILedgerAppConfig;
    appAxc: AppAxc;
    ethApp: Eth;
    constructor(axcAcct: bip32.BIP32Interface, evmAcct: HDKey, axcApp: AppAxc, ethApp: Eth, config: ILedgerAppConfig);
    /**
     * Create a new ledger wallet instance from the given transport
     * @param transport
     */
    static fromTransport(transport: any): Promise<LedgerWallet>;
    /**
     * Returns a bip32 HD Node that can be used to derive internal/external Axia addresses
     * @param app Axia hw app instance
     * @param accountIndex Index of the account.
     * @return BIP32Interface The returned HD Node is of path `m/44'/9000'/n'` where `n` is the account index.
     */
    static getAxcAccount(app: AppAxc, accountIndex?: number): Promise<bip32.BIP32Interface>;
    /**
     * Returns a HDKey instance for the given account index.
     * @param eth Eth hw app instance
     * @param accountIndex
     * @return HDKey Returned HD node is of derivation path `m/44'/60'/0'/0/n` where `n` is the account index.
     */
    static getEvmAccount(eth: Eth, accountIndex?: number): Promise<HDKey>;
    /**
     * Returns the extended public key used by AppChain for address derivation.
     * @remarks Returns the extended public key for path `m/44'/60'/0'`. This key can be used to derive AppChain accounts.
     * @param transport
     */
    static getExtendedPublicKeyEth(transport: any): Promise<string>;
    /**
     * Returns the extended public key used by X and CoreChains for address derivation.
     * @remarks Returns the extended public key for path `m/44'/90000'/n'` where `n` is the account index.
     * @param transport
     * @param accountIndex Which account's public key to derive
     */
    static getExtendedPublicKeyAxc(transport: any, accountIndex?: number): Promise<string>;
    static getAppAxc(transport: any): AppAxc;
    static getAppEth(transport: any): Eth;
    static fromApp(app: AppAxc, eth: Eth): Promise<LedgerWallet>;
    getAddressC(): string;
    getEvmAddressBech(): string;
    signEvm(tx: Transaction): Promise<Transaction>;
    getTransactionPaths<UnsignedTx extends AXVMUnsignedTx | PlatformUnsignedTx>(unsignedTx: UnsignedTx, chainId: ChainIdType): Promise<{
        paths: string[];
        isAxcOnly: boolean;
    }>;
    getPathFromAddress(address: string): Promise<string>;
    signX(unsignedTx: AXVMUnsignedTx): Promise<AXVMTx>;
    getChangePath(chainId?: ChainAlias): string;
    getChangeIndex(chainId?: ChainAlias): number;
    getChangeBipPath<UnsignedTx extends AXVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(unsignedTx: UnsignedTx, chainId: ChainIdType): any;
    signTransactionParsable<UnsignedTx extends AXVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx, SignedTx extends AXVMTx | PlatformTx | EVMTx>(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx>;
    signTransactionHash<UnsignedTx extends AXVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx, SignedTx extends AXVMTx | PlatformTx | EVMTx>(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx>;
    pathsToUniqueBipPaths(paths: string[]): any[];
    getCredentials<UnsignedTx extends AXVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(unsignedTx: UnsignedTx, paths: string[], sigMap: any, chainId: ChainIdType): Credential[];
    signP(unsignedTx: PlatformUnsignedTx): Promise<PlatformTx>;
    signC(unsignedTx: EVMUnsignedTx): Promise<EVMTx>;
}
