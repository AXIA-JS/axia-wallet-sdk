import { iHistoryBaseTx } from "./";
import { OrteliusAxiaTx } from "../Explorer";
export declare function getBaseTxSummary(tx: OrteliusAxiaTx, ownerAddrs: string[]): Promise<iHistoryBaseTx>;
