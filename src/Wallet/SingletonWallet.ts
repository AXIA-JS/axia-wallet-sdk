import { WalletProvider } from '@/Wallet/Wallet';
import { UnsafeWallet, WalletNameType } from '@/Wallet/types';

import { KeyChain as AXVMKeyChain, UnsignedTx as AXVMUnsignedTx, Tx as AXVMTx } from '@zee-ava/avajs/dist/apis/axvm';
import {
    KeyChain as PlatformKeyChain,
    UnsignedTx as PlatformUnsignedTx,
    Tx as PlatformTx,
} from '@zee-ava/avajs/dist/apis/platformvm';
import { axia, coreChain, assetChain } from '@/Network/network';
import { Buffer as BufferAxia } from '@zee-ava/avajs';
import EvmWallet from '@/Wallet/EvmWallet';
import { UnsignedTx, Tx, KeyPair as EVMKeyPair } from '@zee-ava/avajs/dist/apis/evm';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { bintools } from '@/common';

export default class SingletonWallet extends WalletProvider implements UnsafeWallet {
    type: WalletNameType = 'singleton';
    key = '';
    keyBuff: BufferAxia;
    evmWallet: EvmWallet;

    /**
     *
     * @param privateKey An axia private key, starts with `PrivateKey-`
     */
    constructor(privateKey: string) {
        super();

        this.key = privateKey;

        // Derive EVM key and address
        let pkBuf = bintools.cb58Decode(privateKey.split('-')[1]);
        this.keyBuff = pkBuf;

        let pkHex = pkBuf.toString('hex');
        let pkBuffNative = Buffer.from(pkHex, 'hex');

        this.evmWallet = new EvmWallet(pkBuffNative);
    }

    static fromPrivateKey(key: string): SingletonWallet {
        return new SingletonWallet(key);
    }

    static fromEvmKey(key: string): SingletonWallet {
        let keyBuff = bintools.cb58Encode(BufferAxia.from(key, 'hex'));
        let axvmKeyStr = `PrivateKey-${keyBuff}`;
        return new SingletonWallet(axvmKeyStr);
    }

    private getKeyChainX(): AXVMKeyChain {
        let keyChain = assetChain.newKeyChain();
        keyChain.importKey(this.key);
        return keyChain;
    }

    private getKeyChainP(): PlatformKeyChain {
        let keyChain = coreChain.newKeyChain();
        keyChain.importKey(this.key);
        return keyChain;
    }

    /**
     * Returns the derived private key used by the EVM wallet.
     */
    public getEvmPrivateKeyHex(): string {
        return this.evmWallet.getPrivateKeyHex();
    }

    getAddressC(): string {
        return this.evmWallet.getAddress();
    }

    getAddressP(): string {
        let keyChain = this.getKeyChainP();
        return keyChain.getAddressStrings()[0];
    }

    getAddressX(): string {
        let keyChain = this.getKeyChainX();
        return keyChain.getAddressStrings()[0];
    }

    async getAllAddressesP(): Promise<string[]> {
        return [this.getAddressP()];
    }

    getAllAddressesPSync(): string[] {
        return [this.getAddressP()];
    }

    async getAllAddressesX(): Promise<string[]> {
        return [this.getAddressX()];
    }

    getAllAddressesXSync(): string[] {
        return [this.getAddressX()];
    }

    getChangeAddressX(): string {
        return this.getAddressX();
    }

    getEvmAddressBech(): string {
        let keypair = new EVMKeyPair(axia.getHRP(), 'C');
        keypair.importKey(this.keyBuff);
        return keypair.getAddressString();
    }

    async getExternalAddressesP(): Promise<string[]> {
        return [this.getAddressP()];
    }

    getExternalAddressesPSync(): string[] {
        return [this.getAddressP()];
    }

    async getExternalAddressesX(): Promise<string[]> {
        return [this.getAddressX()];
    }

    getExternalAddressesXSync(): string[] {
        return [this.getAddressX()];
    }

    async getInternalAddressesX(): Promise<string[]> {
        return [this.getAddressX()];
    }

    getInternalAddressesXSync(): string[] {
        return [this.getAddressX()];
    }

    async signC(tx: UnsignedTx): Promise<Tx> {
        return this.evmWallet.signC(tx);
    }

    async signEvm(tx: Transaction | FeeMarketEIP1559Transaction): Promise<Transaction | FeeMarketEIP1559Transaction> {
        return this.evmWallet.signEVM(tx);
    }

    async signP(tx: PlatformUnsignedTx): Promise<PlatformTx> {
        return tx.sign(this.getKeyChainP());
    }

    async signX(tx: AXVMUnsignedTx): Promise<AXVMTx> {
        return tx.sign(this.getKeyChainX());
    }
}
