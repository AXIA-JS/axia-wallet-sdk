import { Buffer as BufferAxia } from '@zee-ava/avajs';
import { privateToPublic } from 'ethereumjs-util';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { axia } from '@/Network/network';
import {
    KeyChain as EVMKeyChain,
    KeyPair as EVMKeyPair,
    UnsignedTx as EVMUnsignedTx,
    Tx as EVMTx,
} from '@zee-ava/avajs/dist/apis/evm';
import EvmWalletReadonly from '@/Wallet/EvmWalletReadonly';
import { bintools } from '@/common';

export default class EvmWallet extends EvmWalletReadonly {
    private privateKey: Buffer;

    constructor(key: Buffer) {
        let pubKey = privateToPublic(key);
        super(pubKey);

        this.privateKey = key;
    }

    private getPrivateKeyBech(): string {
        return `PrivateKey-` + bintools.cb58Encode(BufferAxia.from(this.privateKey));
    }

    getKeyChain(): EVMKeyChain {
        let keychain = new EVMKeyChain(axia.getHRP(), 'C');
        keychain.importKey(this.getPrivateKeyBech());
        return keychain;
    }

    getKeyPair(): EVMKeyPair {
        let keychain = new EVMKeyChain(axia.getHRP(), 'C');
        return keychain.importKey(this.getPrivateKeyBech());
    }

    signEVM(tx: Transaction | FeeMarketEIP1559Transaction) {
        return tx.sign(this.privateKey);
    }

    signC(tx: EVMUnsignedTx): EVMTx {
        return tx.sign(this.getKeyChain());
    }

    getPrivateKeyHex(): string {
        return this.privateKey.toString('hex');
    }
}
