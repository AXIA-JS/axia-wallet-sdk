import Eth from '@ledgerhq/hw-app-eth';
import AppAxc from '@zee-ava/hd-wallet-axia';
import { ILedgerAppConfig } from "../types";
/**
 *
 * @param xpub Extended public key for m/44'/60'/0'
 * @param index Index of the Eth address
 * @returns Extended public key for m/44'/60'/0'/0/n where `n` is the address index
 */
export declare function getEthAddressKeyFromAccountKey(xpub: string, index: number): string;
export declare function getAppAxc(transport: any): AppAxc;
export declare function getAppEth(transport: any): Eth;
export declare function getLedgerConfigAxc(transport: any): Promise<ILedgerAppConfig>;
