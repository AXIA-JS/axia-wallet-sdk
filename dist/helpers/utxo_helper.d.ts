import { UTXOSet as AXVMUTXOSet } from '@zee-ava/avajs/dist/apis/axvm/utxos';
import { UTXOSet as PlatformUTXOSet } from '@zee-ava/avajs/dist/apis/platformvm/utxos';
import { UTXOSet as EVMUTXOSet } from '@zee-ava/avajs/dist/apis/evm/utxos';
import { ExportChainsC, ExportChainsP, ExportChainsX } from "../Wallet/types";
import { GetStakeResponse } from '@zee-ava/avajs/dist/apis/platformvm/interfaces';
/**
 *
 * @param addrs an array of AssetChain addresses to get the atomic utxos of
 * @param sourceChain Which chain to check against, either `P` or `C`
 */
export declare function axvmGetAtomicUTXOs(addrs: string[], sourceChain: ExportChainsX): Promise<AXVMUTXOSet>;
export declare function platformGetAtomicUTXOs(addrs: string[], sourceChain: ExportChainsP): Promise<PlatformUTXOSet>;
export declare function evmGetAtomicUTXOs(addrs: string[], sourceChain: ExportChainsC): Promise<EVMUTXOSet>;
export declare function getStakeForAddresses(addrs: string[]): Promise<GetStakeResponse>;
export declare function axvmGetAllUTXOs(addrs: string[]): Promise<AXVMUTXOSet>;
export declare function axvmGetAllUTXOsForAddresses(addrs: string[], endIndex?: any): Promise<AXVMUTXOSet>;
export declare function platformGetAllUTXOs(addrs: string[]): Promise<PlatformUTXOSet>;
export declare function platformGetAllUTXOsForAddresses(addrs: string[], endIndex?: any): Promise<PlatformUTXOSet>;
