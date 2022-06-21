/// <reference types="bn.js" />
import { KeyPair as AVMKeyPair } from '@zee-ava/avajs/dist/apis/avm';
import { BN } from '@zee-ava/avajs';
import MnemonicWallet from "./MnemonicWallet";
import SingletonWallet from "./SingletonWallet";
import LedgerWallet from "./LedgerWallet";
import { iAssetDescriptionClean } from "../Asset/types";
export interface IIndexKeyCache {
    [index: number]: AVMKeyPair;
}
export declare type ChainAlias = 'Swap' | 'Core';
export declare type ExportChainsX = 'Core' | 'AX';
export declare type ExportChainsP = 'Swap' | 'AX';
export declare type ExportChainsC = 'Swap' | 'Core';
export declare type HdChainType = 'Swap' | 'Core';
export declare type WalletNameType = 'mnemonic' | 'ledger' | 'singleton' | 'xpub';
export declare type WalletType = MnemonicWallet | SingletonWallet | LedgerWallet;
export interface WalletBalanceX {
    [assetId: string]: AssetBalanceX;
}
export interface WalletCollectiblesX {
    [familyId: string]: WalletCollectiblesXFamily;
}
export interface WalletCollectiblesXFamily {
    groups: {
        [groupID: number]: WalletCollectiblesXGroup;
    };
}
export interface WalletCollectiblesXGroup {
    payload: string;
    quantity: number;
    id: number;
}
export interface iAxcBalance {
    Swap: AssetBalanceRawX;
    Core: AssetBalanceP;
    AX: BN;
}
export interface AssetBalanceRawX {
    locked: BN;
    unlocked: BN;
}
export interface AssetBalanceX extends AssetBalanceRawX {
    meta: iAssetDescriptionClean;
}
export interface AssetBalanceP {
    locked: BN;
    unlocked: BN;
    lockedStakeable: BN;
}
export interface WalletBalanceERC20 {
    [address: string]: ERC20Balance;
}
export interface ERC20Balance {
    balance: BN;
    balanceParsed: string;
    name: string;
    symbol: string;
    denomination: number;
    address: string;
}
export interface ILedgerAppConfig {
    version: string;
    commit: string;
    name: 'Axia';
}
export declare type WalletEventType = 'addressChanged' | 'balanceChangedX' | 'balanceChangedP' | 'balanceChangedC' | 'hd_ready';
export declare type WalletEventArgsType = iWalletAddressChanged | WalletBalanceX | AssetBalanceP | BN | iHDWalletIndex;
export interface iWalletAddressChanged {
    Swap: string;
    Core: string;
    changeX: string;
}
export interface iHDWalletIndex {
    external: number;
    internal: number;
}
/**
 * Used by wallets which can access their private keys
 */
export interface UnsafeWallet {
    getEvmPrivateKeyHex(): string;
}
