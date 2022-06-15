/// <reference types="bn.js" />
import { ITransactionData, UTXO } from "./raw_types";
import { BN } from '@zee-ava/avajs';
import { iHistoryBaseTxTokenOwners } from "./parsed_types";
export declare function filterDuplicateStrings(vals: string[]): string[];
export declare function isArraysOverlap(arr1: any[], arr2: any[]): boolean;
export declare function getStakeAmount(tx: ITransactionData): BN;
/**
 * Returns UTXOs owned by the given addresses
 * @param outs UTXOs to filter
 * @param myAddrs Addresses to filter by
 */
export declare function getOwnedOutputs(outs: UTXO[], myAddrs: string[]): UTXO[];
/**
 * Returns addresses of the given UTXOs
 * @param outs UTXOs to get the addresses of.
 */
export declare function getAddresses(outs: UTXO[]): string[];
/**
 * Returns only the UTXOs of the given asset id.
 * @param outs
 * @param assetID
 */
export declare function getAssetOutputs(outs: UTXO[], assetID: string): UTXO[];
/**
 * Returns UTXOs not owned by the given addresses
 * @param outs UTXOs to filter
 * @param myAddrs Addresses to filter by
 */
export declare function getNotOwnedOutputs(outs: UTXO[], myAddrs: string[]): UTXO[];
export declare function getOutputTotals(outs: UTXO[]): BN;
export declare function getRewardOuts(outs: UTXO[]): UTXO[];
/**
 * Returns outputs belonging to the given chain ID
 * @param outs UTXOs to filter
 * @param chainID Chain ID to filter by
 */
export declare function getOutputsOfChain(outs: UTXO[], chainID: string): UTXO[];
/**
 * Filters the UTXOs of a certain output type
 * @param outs UTXOs to filter
 * @param type Output type to filter by
 */
export declare function getOutputsOfType(outs: UTXO[], type: number): UTXO[];
/**
 * Returns an array of Asset IDs from the given UTXOs
 * @param outs Array of UTXOs
 */
export declare function getOutputsAssetIDs(outs: UTXO[]): string[];
/**
 * Returns a map of asset id to owner addresses
 * @param outs
 */
export declare function getOutputsAssetOwners(outs: UTXO[]): iHistoryBaseTxTokenOwners;
