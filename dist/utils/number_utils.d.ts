/// <reference types="bn.js" />
import { BN } from '@zee-ava/avajs';
import Big from 'big.js';
declare module 'big.js' {
    interface Big {
        toLocaleString(toFixed?: number): string;
    }
}
/**
 * @param val the amount to parse
 * @param denomination number of decimal places to parse with
 */
export declare function bnToBig(val: BN, denomination?: number): Big;
/**
 * Converts a BN amount of 18 decimals to 9.
 * Used for AXC AX <-> Swap,Core conversions
 * @param amount
 */
export declare function axcCtoX(amount: BN): BN;
export declare function axcXtoC(amount: BN): BN;
export declare function axcPtoC(amount: BN): BN;
export declare function bnToBigAxcX(val: BN): Big;
export declare function bnToBigAxcP(val: BN): Big;
export declare function bnToBigAxcC(val: BN): Big;
/**
 * Parses the value using a denomination of 18
 *
 * @param val the amount to parse given in WEI
 *
 * @example
 * ```
 * bnToAxcC(new BN('22500000000000000000')
 * // will return  22.5
 *```
 *
 */
export declare function bnToAxcC(val: BN): string;
/**
 * Parses the value using a denomination of 9
 *
 * @param val the amount to parse given in nAXC
 */
export declare function bnToAxcX(val: BN): string;
/**
 * Parses the value using a denomination of 9
 *
 * @param val the amount to parse given in nAXC
 */
export declare function bnToAxcP(val: BN): string;
/**
 *
 * @param val the number to parse
 * @param decimals number of decimal places used to parse the number
 */
export declare function numberToBN(val: number | string, decimals: number): BN;
export declare function numberToBNAxcX(val: number | string): BN;
export declare function numberToBNAxcP(val: number | string): BN;
export declare function numberToBNAxcC(val: number | string): BN;
/**
 * @Remarks
 * A helper method to convert BN numbers to human readable strings.
 *
 * @param val The amount to convert
 * @param decimals Number of decimal places to parse the amount with
 *
 * @example
 * ```
 * bnToLocaleString(new BN(100095),2)
 * // will return '1,000.95'
 * ```
 */
export declare function bnToLocaleString(val: BN, decimals?: number): string;
export declare function bigToLocaleString(bigVal: Big, decimals?: number): string;
/**
 * Converts a string to a BN value of the given denomination.
 * @param value The string value of the
 * @param decimals
 *
 * @example
 * ```
 * stringToBN('1.32', 5) // is same as BN(132000)
 * ```
 */
export declare function stringToBN(value: string, decimals: number): BN;
export declare function bigToBN(val: Big, denom: number): BN;
