import { ITransactionData } from "./raw_types";
import { iHistoryImportExport } from "./parsed_types";
export declare function getImportSummary(tx: ITransactionData, addresses: string[]): iHistoryImportExport;
export declare function getExportSummary(tx: ITransactionData, addresses: string[]): iHistoryImportExport;
