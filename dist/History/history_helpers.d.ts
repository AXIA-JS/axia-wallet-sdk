/// <reference types="bn.js" />
import { iHistoryNftFamilyBalance, ITransactionData, UTXO } from "./";
import { BN } from '@zee-ava/avajs';
/**
 * Returns the destination chain id.
 * @param tx Tx data from the explorer.
 */
export declare function findDestinationChain(tx: ITransactionData): string;
/**
 * Returns the source chain id.
 * @param tx Tx data from the explorer.
 */
export declare function findSourceChain(tx: ITransactionData): string;
/**
 * Returns true if this utxo is owned by any of the given addresses
 * @param ownerAddrs Addresses to check against
 * @param output The UTXO
 */
export declare function isOutputOwner(ownerAddrs: string[], output: UTXO): boolean;
export declare function isOutputOwnerC(ownerAddr: string, output: UTXO): boolean;
/**
 * Given an array of transactions from the explorer, filter out duplicate transactions
 * @param txs
 */
export declare function filterDuplicateTransactions(txs: ITransactionData[]): ITransactionData[];
/**
 * Returns the total amount of `assetID` in the given `utxos` owned by `address`. Checks for Swap/Core addresses.
 * @param utxos UTXOs to calculate balance from.
 * @param addresses The wallet's  addresses.
 * @param assetID Only count outputs of this asset ID.
 * @param chainID Only count the outputs on this chain.
 * @param isStake Set to `true` if looking for staking utxos.
 */
export declare function getAssetBalanceFromUTXOs(utxos: UTXO[], addresses: string[], assetID: string, chainID: string, isStake?: boolean): BN;
export declare function getNFTBalanceFromUTXOs(utxos: UTXO[], addresses: string[], assetID: string): iHistoryNftFamilyBalance;
/**
 * Returns the total amount of `assetID` in the given `utxos` owned by `address`. Checks for EVM address.
 * @param utxos UTXOs to calculate balance from.
 * @param address The wallet's  evm address `0x...`.
 * @param assetID Only count outputs of this asset ID.
 * @param chainID Only count the outputs on this chain.
 * @param isStake Set to `true` if looking for staking utxos.
 */
export declare function getEvmAssetBalanceFromUTXOs(utxos: UTXO[], address: string, assetID: string, chainID: string, isStake?: boolean): BN;
/**
 * Parse the raw memo field to readable text.
 * @param raw
 */
export declare function parseMemo(raw: string): string;
