/// <reference types="bn.js" />
import { BN } from '@zee-ava/avajs';
import { UnsignedTx as AXVMUnsignedTx, UTXO as AXVMUTXO, UTXOSet as AXVMUTXOSet, UTXOSet } from '@zee-ava/avajs/dist/apis/axvm';
import { PayloadBase } from '@zee-ava/avajs/dist/utils';
import { UTXOSet as PlatformUTXOSet } from '@zee-ava/avajs/dist/apis/platformvm';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import { ExportChainsC, ExportChainsP, ExportChainsX } from "../Wallet/types";
export declare function buildCreateNftFamilyTx(name: string, symbol: string, groupNum: number, fromAddrs: string[], minterAddr: string, changeAddr: string, utxoSet: UTXOSet): Promise<AXVMUnsignedTx>;
export declare function buildMintNftTx(mintUtxo: AXVMUTXO, payload: PayloadBase, quantity: number, ownerAddress: string, changeAddress: string, fromAddresses: string[], utxoSet: UTXOSet): Promise<AXVMUnsignedTx>;
export declare function buildAxvmExportTransaction(destinationChain: ExportChainsX, utxoSet: AXVMUTXOSet, fromAddresses: string[], toAddress: string, amount: BN, // export amount + fee
sourceChangeAddress: string): Promise<AXVMUnsignedTx>;
export declare function buildPlatformExportTransaction(utxoSet: PlatformUTXOSet, fromAddresses: string[], toAddress: string, amount: BN, // export amount + fee
sourceChangeAddress: string, destinationChain: ExportChainsP): Promise<import("@zee-ava/avajs/dist/apis/platformvm").UnsignedTx>;
/**
 *
 * @param fromAddresses
 * @param toAddress
 * @param amount
 * @param fromAddressBech
 * @param destinationChain Either `X` or `P`
 * @param fee Export fee in nAXC
 */
export declare function buildEvmExportTransaction(fromAddresses: string[], toAddress: string, amount: BN, // export amount + fee
fromAddressBech: string, destinationChain: ExportChainsC, fee: BN): Promise<import("@zee-ava/avajs/dist/apis/evm").UnsignedTx>;
export declare function buildEvmTransferEIP1559Tx(from: string, to: string, amount: BN, // in wei
priorityFee: BN, maxFee: BN, gasLimit: number): Promise<FeeMarketEIP1559Transaction>;
export declare function buildEvmTransferNativeTx(from: string, to: string, amount: BN, // in wei
gasPrice: BN, gasLimit: number): Promise<Transaction>;
export declare function buildCustomEvmTx(from: string, gasPrice: BN, gasLimit: number, data?: string, to?: string, value?: string, nonce?: number): Promise<Transaction>;
export declare function buildEvmTransferErc20Tx(from: string, to: string, amount: BN, // in wei
gasPrice: BN, gasLimit: number, contractAddress: string): Promise<Transaction>;
export declare function buildEvmTransferErc721Tx(from: string, to: string, gasPrice: BN, gasLimit: number, tokenContract: string, tokenId: string): Promise<Transaction>;
export declare function estimateErc20Gas(tokenContract: string, from: string, to: string, value: BN): Promise<any>;
/**
 * Estimates the gas needed to send AXC
 * @param to Destination address
 * @param amount Amount of AXC to send, given in WEI
 * @param gasPrice Given in WEI
 */
export declare function estimateAxcGas(from: string, to: string, amount: BN, gasPrice: BN): Promise<number>;
export declare enum AxvmTxNameEnum {
    'Transaction',
    'Mint',
    'Operation',
    'Import',
    'Export'
}
export declare enum PlatfromTxNameEnum {
    'Transaction',
    'Add Validator',
    'Add Nominator',
    'Import',
    'Export',
    'Add Subnet Validator',
    'Create Chain',
    'Create Subnet',
    'Advance Time',
    'Reward Validator'
}
export declare enum ParseableAxvmTxEnum {
    'Transaction',
    'Import',
    'Export'
}
export declare enum ParseablePlatformEnum {
    'Transaction',
    'Add Validator',
    'Add Nominator',
    'Import',
    'Export'
}
export declare enum ParseableEvmTxEnum {
    'Import',
    'Export'
}
