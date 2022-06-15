import { HDWalletAbstract } from "./HDWalletAbstract";
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import { UnsignedTx as PlatformUnsignedTx, Tx as PlatformTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { UnsignedTx as AXVMUnsignedTx, Tx as AXVMTx } from '@zee-ava/avajs/dist/apis/axvm';
import { Transaction } from '@ethereumjs/tx';
import { WalletNameType } from "./types";
import EvmWallet from "./EvmWallet";
import EvmWalletReadonly from "./EvmWalletReadonly";
export default class PublicMnemonicWallet extends HDWalletAbstract {
    /**
     *
     * @param xpubAXVM of derivation path m/44'/9000'/0'
     * @param xpubEVM of derivation path m/44'/60'/0'
     */
    constructor(xpubAXVM: string, xpubEVM: string);
    evmWallet: EvmWallet | EvmWalletReadonly;
    type: WalletNameType;
    getAddressC(): string;
    getEvmAddressBech(): string;
    signC(tx: EVMUnsignedTx): Promise<EVMTx>;
    signEvm(tx: Transaction): Promise<Transaction>;
    signP(tx: PlatformUnsignedTx): Promise<PlatformTx>;
    signX(tx: AXVMUnsignedTx): Promise<AXVMTx>;
}
