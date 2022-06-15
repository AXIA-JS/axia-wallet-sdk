import { WalletProvider } from "./Wallet";
import { UnsafeWallet, WalletNameType } from "./types";
import { UnsignedTx as AVMUnsignedTx, Tx as AVMTx } from '@zee-ava/avajs/dist/apis/avm';
import { UnsignedTx as PlatformUnsignedTx, Tx as PlatformTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { Buffer as BufferAxia } from '@zee-ava/avajs';
import EvmWallet from "./EvmWallet";
import { UnsignedTx, Tx } from '@zee-ava/avajs/dist/apis/evm';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
export default class SingletonWallet extends WalletProvider implements UnsafeWallet {
    type: WalletNameType;
    key: string;
    keyBuff: BufferAxia;
    evmWallet: EvmWallet;
    /**
     *
     * @param privateKey An axia private key, starts with `PrivateKey-`
     */
    constructor(privateKey: string);
    static fromPrivateKey(key: string): SingletonWallet;
    static fromEvmKey(key: string): SingletonWallet;
    private getKeyChainX;
    private getKeyChainP;
    /**
     * Returns the derived private key used by the EVM wallet.
     */
    getEvmPrivateKeyHex(): string;
    getAddressC(): string;
    getAddressP(): string;
    getAddressX(): string;
    getAllAddressesP(): Promise<string[]>;
    getAllAddressesPSync(): string[];
    getAllAddressesX(): Promise<string[]>;
    getAllAddressesXSync(): string[];
    getChangeAddressX(): string;
    getEvmAddressBech(): string;
    getExternalAddressesP(): Promise<string[]>;
    getExternalAddressesPSync(): string[];
    getExternalAddressesX(): Promise<string[]>;
    getExternalAddressesXSync(): string[];
    getInternalAddressesX(): Promise<string[]>;
    getInternalAddressesXSync(): string[];
    signC(tx: UnsignedTx): Promise<Tx>;
    signEvm(tx: Transaction | FeeMarketEIP1559Transaction): Promise<Transaction | FeeMarketEIP1559Transaction>;
    signP(tx: PlatformUnsignedTx): Promise<PlatformTx>;
    signX(tx: AVMUnsignedTx): Promise<AVMTx>;
}
