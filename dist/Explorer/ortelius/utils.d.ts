/// <reference types="bn.js" />
import { OrteliusAxiaTx } from "./..";
import { BN } from '@zee-ava/avajs';
/**
 * Given an array of transactions from the explorer, filter out duplicate transactions
 * @param txs
 */
export declare function filterDuplicateOrtelius(txs: OrteliusAxiaTx[]): OrteliusAxiaTx[];
/**
 * Returns the source chain id.
 * @param tx Tx data from the explorer.
 */
export declare function findSourceChain(tx: OrteliusAxiaTx): string;
/**
 * Returns the destination chain id.
 * @param tx Tx data from the explorer.
 */
export declare function findDestinationChain(tx: OrteliusAxiaTx): string;
export declare function getStakeAmount(tx: OrteliusAxiaTx): BN;
