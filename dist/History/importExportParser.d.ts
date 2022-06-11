import { iHistoryImportExport } from "./types";
import { OrteliusAxiaTx } from "../Explorer";
export declare function getImportSummary(tx: OrteliusAxiaTx, addresses: string[]): iHistoryImportExport;
export declare function getExportSummary(tx: OrteliusAxiaTx, addresses: string[]): iHistoryImportExport;
