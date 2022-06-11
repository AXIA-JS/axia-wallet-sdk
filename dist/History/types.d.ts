/// <reference types="bn.js" />
import { BN } from '@zee-ava/avajs';
import { ChainIdType } from "../common";
import { iAssetDescriptionClean } from "../Asset/types";
export declare type HistoryItemType = AVMHistoryItemType | PVMHistoryItemType | EVMHistoryITemType | iHistoryItem;
export declare type AVMHistoryItemType = iHistoryBaseTx | iHistoryImportExport;
export declare type PVMHistoryItemType = iHistoryStaking;
export declare type EVMHistoryITemType = iHistoryEVMTx;
export declare type HistoryImportExportTypeName = 'import' | 'export';
export declare type HistoryItemTypeName = HistoryImportExportTypeName | 'transaction' | 'transaction_evm' | 'add_delegator' | 'add_validator' | 'delegation_fee' | 'validation_fee' | 'not_supported';
export interface iHistoryItem {
    id: string;
    type: HistoryItemTypeName;
    timestamp: Date;
    fee: BN;
    memo?: string;
}
/**
 * Parsed interface for Import and Export transactions.
 */
export interface iHistoryImportExport extends iHistoryItem {
    amount: BN;
    type: HistoryImportExportTypeName;
    amountDisplayValue: string;
    destination: ChainIdType;
    source: ChainIdType;
}
/**
 * Typeguard for `iHistoryImportExport` interface
 * @param tx The parsed history object
 */
export declare function isHistoryImportExportTx(tx: HistoryItemType): tx is iHistoryImportExport;
/**
 * Parsed interface for Validation, Validation Fee, Delegation and Delegation Fee transactions.
 */
export interface iHistoryStaking extends iHistoryItem {
    nodeID: string;
    stakeStart: Date;
    stakeEnd: Date;
    amount: BN;
    amountDisplayValue: string;
    isRewarded: boolean;
    rewardAmount?: BN;
    rewardAmountDisplayValue?: string;
}
/**
 * Typeguard for `iHistoryStaking` interface
 * @param tx The parsed history object
 */
export declare function isHistoryStakingTx(tx: HistoryItemType): tx is iHistoryStaking;
/**
 * Interface for parsed X chain base transactions.
 */
export interface iHistoryBaseTx extends iHistoryItem {
    tokens: iHistoryBaseTxToken[];
}
/**
 * Typeguard for `iHistoryBaseTx` interface
 * @param tx The parsed history object
 */
export declare function isHistoryBaseTx(tx: HistoryItemType): tx is iHistoryBaseTx;
/**
 * Interface for parsed EVM transactions.
 */
export interface iHistoryEVMTx extends iHistoryItem {
    block: string;
    gasLimit: number;
    gasPrice: string;
    from: string;
    to: string;
    amount: BN;
    amountDisplayValue: string;
    isSender: boolean;
    input?: string;
}
export declare function isHistoryEVMTx(tx: HistoryItemType): tx is iHistoryEVMTx;
export interface iHistoryBaseTxToken {
    amount: BN;
    amountDisplayValue: string;
    addresses: string[];
    asset: iAssetDescriptionClean;
}
export interface iHistoryBaseTxNFTs {
    sent: iHistoryBaseTxNFTsSent;
    received: iHistoryBaseTxNFTsReceived;
}
export interface iHistoryBaseTxTokenLossGain {
    [assetId: string]: BN;
}
export interface iHistoryBaseTxTokenOwners {
    [assetId: string]: string[];
}
export interface iHistoryNftFamilyBalance {
    [groupNum: number]: {
        payload: string;
        amount: number;
    };
}
export interface iHistoryBaseTxNFTsReceivedRaw {
    [assetID: string]: iHistoryNftFamilyBalance;
}
export interface iHistoryBaseTxNFTsSentRaw {
    [assetID: string]: iHistoryNftFamilyBalance;
}
export interface iHistoryBaseTxNFTsSent {
    [assetID: string]: {
        groups: iHistoryNftFamilyBalance;
        to: string[];
        asset: iAssetDescriptionClean;
    };
}
export interface iHistoryBaseTxNFTsReceived {
    [assetID: string]: {
        groups: iHistoryNftFamilyBalance;
        from: string[];
        asset: iAssetDescriptionClean;
    };
}
