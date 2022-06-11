import { HistoryItemType } from "./";
import { OrteliusAxiaTx } from "../Explorer";
export declare function getTransactionSummary(tx: OrteliusAxiaTx, walletAddrs: string[], evmAddress: string): Promise<HistoryItemType>;
