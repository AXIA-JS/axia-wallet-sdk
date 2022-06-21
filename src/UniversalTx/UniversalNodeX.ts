import { UniversalNodeAbstract } from '@/UniversalTx/UniversalNode';
import { ExportChainsX } from '@/Wallet/types';
import {
    UniversalTxActionExportX,
    UniversalTxActionImportX,
    UniversalTxExportX,
    UniversalTxImportX,
} from '@/UniversalTx/types';
import { BN } from '@zee-ava/avajs';

export default class UniversalNodeX extends UniversalNodeAbstract {
    constructor(balance: BN, feeExport: BN, feeImport: BN) {
        super(balance, 'Swap', feeExport, feeImport);
    }

    buildExportTx(destChain: ExportChainsX, amount: BN): UniversalTxExportX {
        return super.buildExportTx(destChain, amount) as UniversalTxExportX;
    }

    buildImportTx(sourceChain: ExportChainsX): UniversalTxImportX {
        return super.buildImportTx(sourceChain) as UniversalTxImportX;
    }

    getExportMethod(to: ExportChainsX): UniversalTxActionExportX {
        if (to === 'Core') {
            return 'export_x_p';
        } else {
            return 'export_x_c';
        }
    }

    getImportMethod(from: ExportChainsX): UniversalTxActionImportX {
        if (from === 'Core') {
            return 'import_p_x';
        } else {
            return 'import_c_x';
        }
    }
}
