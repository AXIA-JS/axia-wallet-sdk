import { HistoryItemType, ITransactionData } from "./";
export declare function getTransactionSummary(tx: ITransactionData, walletAddrs: string[], evmAddress: string): Promise<HistoryItemType>;
