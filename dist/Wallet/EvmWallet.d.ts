/// <reference types="node" />
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { KeyChain as EVMKeyChain, KeyPair as EVMKeyPair, UnsignedTx as EVMUnsignedTx, Tx as EVMTx } from '@zee-ava/avajs/dist/apis/evm';
import EvmWalletReadonly from "./EvmWalletReadonly";
export default class EvmWallet extends EvmWalletReadonly {
    private privateKey;
    constructor(key: Buffer);
    private getPrivateKeyBech;
    getKeyChain(): EVMKeyChain;
    getKeyPair(): EVMKeyPair;
    signEVM(tx: Transaction | FeeMarketEIP1559Transaction): Transaction | FeeMarketEIP1559Transaction;
    signC(tx: EVMUnsignedTx): EVMTx;
    getPrivateKeyHex(): string;
}
