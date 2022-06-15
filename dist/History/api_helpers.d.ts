import { ITransactionData, ITransactionDataEVM } from "./raw_types";
/**
 * Returns transactions FROM and TO the address given
 * @param addr The address to get historic transactions for.
 */
export declare function getAddressHistoryEVM(addr: string): Promise<ITransactionDataEVM[]>;
export declare function getAddressHistory(addrs: string[], limit: number | undefined, chainID: string, endTime?: string): Promise<ITransactionData[]>;
/**
 * Returns the Axtract data from the given tx id.
 * @param txID
 */
export declare function getTx(txID: string): Promise<ITransactionData>;
/**
 * Returns Axtract data for a transaction hash on AppChain EVM,
 * @param txHash
 */
export declare function getTxEvm(txHash: string): Promise<ITransactionDataEVM>;
