/// <reference types="bn.js" />
/// <reference types="node" />
import { BN } from '@zee-ava/avajs';
export default class EvmWalletReadonly {
    balance: BN;
    address: string;
    publicKey: Buffer;
    constructor(publicKey: Buffer);
    getBalance(): BN;
    getAddress(): string;
    getAddressBech32(): string;
    updateBalance(): Promise<BN>;
}
