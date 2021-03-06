/// <reference types="bn.js" />
import { UniversalNodeAbstract } from "./UniversalNode";
import { ExportChainsP } from "../Wallet/types";
import { UniversalTxActionExportP, UniversalTxActionImportP, UniversalTxExportP, UniversalTxImportP } from "./types";
import { BN } from '@zee-ava/avajs';
export default class UniversalNodeP extends UniversalNodeAbstract {
    constructor(balance: BN, feeExport: BN, feeImport: BN);
    buildExportTx(destChain: ExportChainsP, amount: BN): UniversalTxExportP;
    buildImportTx(sourceChain: ExportChainsP): UniversalTxImportP;
    getExportMethod(to: ExportChainsP): UniversalTxActionExportP;
    getImportMethod(from: ExportChainsP): UniversalTxActionImportP;
}
