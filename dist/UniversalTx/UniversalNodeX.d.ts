/// <reference types="bn.js" />
import { UniversalNodeAbstract } from "./UniversalNode";
import { ExportChainsX } from "../Wallet/types";
import { UniversalTxActionExportX, UniversalTxActionImportX, UniversalTxExportX, UniversalTxImportX } from "./types";
import { BN } from '@zee-ava/avajs';
export default class UniversalNodeX extends UniversalNodeAbstract {
    constructor(balance: BN, feeExport: BN, feeImport: BN);
    buildExportTx(destChain: ExportChainsX, amount: BN): UniversalTxExportX;
    buildImportTx(sourceChain: ExportChainsX): UniversalTxImportX;
    getExportMethod(to: ExportChainsX): UniversalTxActionExportX;
    getImportMethod(from: ExportChainsX): UniversalTxActionImportX;
}
