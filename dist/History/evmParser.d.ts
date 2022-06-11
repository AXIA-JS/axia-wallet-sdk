import { ITransactionDataEVM } from "./raw_types";
import { iHistoryEVMTx } from "./parsed_types";
export declare function getTransactionSummaryEVM(tx: ITransactionDataEVM, walletAddress: string): iHistoryEVMTx;
