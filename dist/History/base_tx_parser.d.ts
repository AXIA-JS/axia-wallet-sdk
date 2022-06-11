import { iHistoryBaseTx, ITransactionData } from "./";
export declare function getBaseTxSummary(tx: ITransactionData, ownerAddrs: string[]): Promise<iHistoryBaseTx>;
