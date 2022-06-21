/// <reference types="node" />
/// <reference types="bn.js" />
import { AssetBalanceP, AssetBalanceRawX, ERC20Balance, ExportChainsC, ExportChainsP, ExportChainsX, iAxcBalance, WalletBalanceX, WalletEventArgsType, WalletEventType, WalletNameType } from './types';
import { BN } from '@zee-ava/avajs';
import { FeeMarketEIP1559Transaction, Transaction } from '@ethereumjs/tx';
import EvmWallet from "./EvmWallet";
import { UTXOSet as AVMUTXOSet, UnsignedTx as AVMUnsignedTx, UTXO as AVMUTXO, Tx as AvmTx } from '@zee-ava/avajs/dist/apis/avm';
import { UTXOSet as PlatformUTXOSet, UTXO as PlatformUTXO, UnsignedTx as PlatformUnsignedTx, Tx as PlatformTx } from '@zee-ava/avajs/dist/apis/platformvm';
import { UnsignedTx as EVMUnsignedTx, Tx as EVMTx, UTXOSet as EVMUTXOSet } from '@zee-ava/avajs/dist/apis/evm';
import { PayloadBase } from '@zee-ava/avajs/dist/utils';
import EvmWalletReadonly from "./EvmWalletReadonly";
import EventEmitter from 'events';
import { HistoryItemType, ITransactionData } from "../History";
import { ChainIdType } from "../types";
import { UniversalTx } from "../UniversalTx";
import { GetStakeResponse } from '@zee-ava/avajs/dist/apis/platformvm/interfaces';
import { NetworkConfig } from "../Network";
export declare abstract class WalletProvider {
    abstract type: WalletNameType;
    abstract evmWallet: EvmWallet | EvmWalletReadonly;
    /**
     * The SwapChain UTXOs of the wallet's current state
     */
    utxosX: AVMUTXOSet;
    /**
     * The CoreChain UTXOs of the wallet's current state
     */
    utxosP: PlatformUTXOSet;
    balanceX: WalletBalanceX;
    abstract signEvm(tx: Transaction | FeeMarketEIP1559Transaction): Promise<Transaction | FeeMarketEIP1559Transaction>;
    abstract signX(tx: AVMUnsignedTx): Promise<AvmTx>;
    abstract signP(tx: PlatformUnsignedTx): Promise<PlatformTx>;
    abstract signC(tx: EVMUnsignedTx): Promise<EVMTx>;
    abstract getAddressX(): string;
    abstract getChangeAddressX(): string;
    abstract getAddressP(): string;
    abstract getAddressC(): string;
    abstract getEvmAddressBech(): string;
    abstract getExternalAddressesX(): Promise<string[]>;
    abstract getExternalAddressesXSync(): string[];
    abstract getInternalAddressesX(): Promise<string[]>;
    abstract getInternalAddressesXSync(): string[];
    abstract getExternalAddressesP(): Promise<string[]>;
    abstract getExternalAddressesPSync(): string[];
    abstract getAllAddressesX(): Promise<string[]>;
    abstract getAllAddressesXSync(): string[];
    abstract getAllAddressesP(): Promise<string[]>;
    abstract getAllAddressesPSync(): string[];
    protected constructor();
    /**
     * Call after getting done with the wallet to avoi memory leaks and remove event listeners
     */
    destroy(): void;
    /**
     * Fired when the network changes
     * @param config
     * @protected
     */
    protected onNetworkChange(config: NetworkConfig): void;
    /***
     * Used to get an identifier string that is consistent across different network connections.
     * Currently returns the AX address of this wallet.
     */
    getBaseAddress(): string;
    protected emitter: EventEmitter;
    on(event: WalletEventType, listener: (...args: any[]) => void): void;
    off(event: WalletEventType, listener: (...args: any[]) => void): void;
    protected emit(event: WalletEventType, args?: WalletEventArgsType): void;
    protected emitAddressChange(): void;
    protected emitBalanceChangeX(): void;
    protected emitBalanceChangeP(): void;
    protected emitBalanceChangeC(): void;
    /**
     *
     * @param to - the address funds are being send to.
     * @param amount - amount of AXC to send in nAXC
     * @param memo - A MEMO for the transaction
     */
    sendAxcX(to: string, amount: BN, memo?: string): Promise<string>;
    /**
     * Sends AXC to another address on the AXChain using legacy transaction format.
     * @param to Hex address to send AXC to.
     * @param amount Amount of AXC to send, represented in WEI format.
     * @param gasPrice Gas price in WEI format
     * @param gasLimit Gas limit
     *
     * @return Returns the transaction hash
     */
    sendAxcC(to: string, amount: BN, gasPrice: BN, gasLimit: number): Promise<string>;
    /**
     * Send Axia Native Tokens on SwapChain
     * @param assetID ID of the token to send
     * @param amount How many units of the token to send. Based on smallest divisible unit.
     * @param to SwapChain address to send tokens to
     */
    sendANT(assetID: string, amount: BN, to: string): Promise<string>;
    /**
     * Makes a transfer call on a ERC20 contract.
     * @param to Hex address to transfer tokens to.
     * @param amount Amount of the ERC20 token to send, donated in the token's correct denomination.
     * @param gasPrice Gas price in WEI format
     * @param gasLimit Gas limit
     * @param contractAddress Contract address of the ERC20 token
     */
    sendErc20(to: string, amount: BN, gasPrice: BN, gasLimit: number, contractAddress: string): Promise<string>;
    /**
     * Estimate the gas needed for an ERC20 Transfer transaction
     * @param contractAddress The ERC20 contract address
     * @param to Address receiving the tokens
     * @param amount Amount to send. Given in the smallest divisible unit.
     */
    estimateErc20Gas(contractAddress: string, to: string, amount: BN): Promise<number>;
    /**
     * Estimate gas limit for the given inputs.
     * @param to
     * @param data
     */
    estimateGas(to: string, data: string): Promise<number>;
    /**
     * Estimate the gas needed for a AXC send transaction on the AXChain.
     * @param to Destination address.
     * @param amount Amount of AXC to send, in WEI.
     */
    estimateAxcGasLimit(to: string, amount: BN, gasPrice: BN): Promise<number>;
    /**
     * A method to create custom EVM transactions.
     * @param gasPrice
     * @param gasLimit
     * @param data `data` field of the transaction, in hex format
     * @param to `to` field of the transaction, in hex format
     * @param value `value` field of the transaction, in hex format
     * @param nonce Nonce of the transaction, in number. If not provided, SDK will get the latest nonce from the network
     */
    sendCustomEvmTx(gasPrice: BN, gasLimit: number, data?: string, to?: string, value?: string, nonce?: number): Promise<string>;
    /**
     * Returns the maximum spendable AXC balance for the given chain.
     * Scans all chains and take cross over fees into account
     * @param chainType Swap, Core or AX
     */
    getUsableAxcBalanceForChain(chainType: ChainIdType, atomicFeeXP: BN, atomicFeeC: BN): BN;
    /**
     * Create a new instance of a UniversalNode for the given chain using current balance state
     * @param chain Chain of the universal node.
     * @private
     */
    private createUniversalNode;
    /**
     * Can this wallet have the given amount on the given chain after a series of internal transactions (if required).
     * @param chain Swap/Core/AX
     * @param amount The amount to check against
     */
    canHaveBalanceOnChain(chain: ChainIdType, amount: BN, atomicFeeXP: BN, atomicFeeC: BN): boolean;
    /**
     * Returns an array of transaction to do in order to have the target amount on the given chain
     * @param chain The chain (Swap/Core/AX) to have the desired amount on
     * @param amount The desired amount
     */
    getTransactionsForBalance(chain: ChainIdType, amount: BN, atomicFeeXP: BN, atomicFeeC: BN): UniversalTx[];
    /**
     * Given a `Transaction`, it will sign and issue it to the network.
     * @param tx The unsigned transaction to issue.
     */
    issueEvmTx(tx: Transaction | FeeMarketEIP1559Transaction): Promise<string>;
    /**
     * Returns the AXChain AXC balance of the wallet in WEI format.
     */
    updateAxcBalanceC(): Promise<BN>;
    /**
     *  Returns UTXOs on the SwapChain that belong to this wallet.
     *  - Makes network request.
     *  - Updates `this.utxosX` with new UTXOs
     *  - Calls `this.updateBalanceX()` after success.
     *  */
    updateUtxosX(): Promise<AVMUTXOSet>;
    /**
     *  Returns the fetched UTXOs on the SwapChain that belong to this wallet.
     */
    getUtxosX(): AVMUTXOSet;
    /**
     *  Returns UTXOs on the CoreChain that belong to this wallet.
     *  - Makes network request.
     *  - Updates `this.utxosP` with the new UTXOs
     */
    updateUtxosP(): Promise<PlatformUTXOSet>;
    /**
     * Returns the fetched UTXOs on the CoreChain that belong to this wallet.
     */
    getUtxosP(): PlatformUTXOSet;
    /**
     * Returns the number AXC staked by this wallet.
     */
    getStake(): Promise<GetStakeResponse>;
    /**
     * Returns the wallet's balance of the given ERC20 contracts
     * @param addresses ERC20 Contract addresses
     */
    getBalanceERC20(addresses: string[]): Promise<ERC20Balance[]>;
    private updateUnknownAssetsX;
    /**
     * Uses the SwapChain UTXOs owned by this wallet, gets asset description for unknown assets,
     * and returns a dictionary of Asset IDs to balance amounts.
     * - Updates `this.balanceX`
     * - Expensive operation if there are unknown assets
     * - Uses existing UTXOs
     * @private
     */
    private updateBalanceX;
    getBalanceX(): WalletBalanceX;
    /**
     * A helpful method that returns the AXC balance on Swap, Core, AXChains.
     * Internally calls chain specific getAxcBalance methods.
     */
    getAxcBalance(): iAxcBalance;
    /**
     * Returns the SwapChain AXC balance of the current wallet state.
     * - Does not make a network request.
     * - Does not refresh wallet balance.
     */
    getAxcBalanceX(): AssetBalanceRawX;
    getAxcBalanceC(): BN;
    /**
     * Returns the CoreChain AXC balance of the current wallet state.
     * - Does not make a network request.
     * - Does not refresh wallet balance.
     */
    getAxcBalanceP(): AssetBalanceP;
    /**
     * Exports AXC from CoreChain to SwapChain
     * @remarks
     * The export fee is added automatically to the amount. Make sure the exported amount includes the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer. Fees excluded.
     * @param destinationChain Either `Swap` or `AX`
     * @return returns the transaction id.
     */
    exportCoreChain(amt: BN, destinationChain: ExportChainsP): Promise<string>;
    /***
     * Estimates the required fee for a AXChain export transaction
     * @param destinationChain Either `Swap` or `Core`
     * @param baseFee Current base fee of the network, use a padded amount.
     * @return BN AXChain atomic export transaction fee in nAXC.
     */
    estimateAtomicFeeExportC(destinationChain: ExportChainsC, baseFee: BN): BN;
    /**
     * Exports AXC from AXChain to SwapChain
     * @remarks
     * Make sure the exported `amt` includes the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer
     * @param destinationChain either `Swap` or `Core`
     * @param exportFee Export fee in nAXC
     * @return returns the transaction id.
     */
    exportAXChain(amt: BN, destinationChain: ExportChainsC, exportFee?: BN): Promise<string>;
    /**
     * Exports AXC from SwapChain to either Core or AXChain
     * @remarks
     * The export fee will be added to the amount automatically. Make sure the exported amount has the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer
     * @param destinationChain Which chain to export to.
     * @return returns the transaction id.
     */
    exportSwapChain(amt: BN, destinationChain: ExportChainsX): Promise<string>;
    getAtomicUTXOsX(sourceChain: ExportChainsX): Promise<AVMUTXOSet>;
    getAtomicUTXOsP(sourceChain: ExportChainsP): Promise<PlatformUTXOSet>;
    getAtomicUTXOsC(sourceChain: ExportChainsC): Promise<EVMUTXOSet>;
    /**
     * Imports atomic SwapChain UTXOs to the current active SwapChain address
     * @param sourceChain The chain to import from, either `Core` or `AX`
     */
    importX(sourceChain: ExportChainsX): Promise<string>;
    /**
     * Import utxos in atomic memory to the CoreChain.
     * @param sourceChain Either `Swap` or `AX`
     * @param [toAddress] The destination CoreChain address assets will get imported to. Defaults to the CoreChain address of the wallet.
     */
    importP(sourceChain: ExportChainsP, toAddress?: string): Promise<string>;
    /**
     *
     * @param sourceChain Which chain to import from. `Swap` or `Core`
     * @param [fee] The import fee to use in the transactions. If omitted the SDK will try to calculate the fee. For deterministic transactions you should always pre calculate and provide this value.
     * @param [utxoSet] If omitted imports all atomic UTXOs.
     */
    importC(sourceChain: ExportChainsC, fee?: BN, utxoSet?: EVMUTXOSet): Promise<string>;
    createNftFamily(name: string, symbol: string, groupNum: number): Promise<string>;
    mintNft(mintUtxo: AVMUTXO, payload: PayloadBase, quantity: number): Promise<string>;
    /**
     * Adds a validator to the network using the given node id.
     *
     * @param nodeID The node id you are adding as a validator
     * @param amt Amount of AXC to stake in nAXC
     * @param start Validation period start date
     * @param end Validation period end date
     * @param delegationFee Minimum 2%
     * @param rewardAddress CoreChain address to send staking rewards
     * @param utxos
     *
     * @return Transaction id
     */
    validate(nodeID: string, amt: BN, start: Date, end: Date, delegationFee: number, rewardAddress?: string, utxos?: PlatformUTXO[]): Promise<string>;
    delegate(nodeID: string, amt: BN, start: Date, end: Date, rewardAddress?: string, utxos?: PlatformUTXO[]): Promise<string>;
    /**
     * Issues the given transaction.
     * @param tx A universal transaction json object.
     */
    issueUniversalTx(tx: UniversalTx): Promise<string>;
    getHistoryX(limit?: number): Promise<ITransactionData[]>;
    getHistoryP(limit?: number): Promise<ITransactionData[]>;
    getHistoryC(limit?: number): Promise<ITransactionData[]>;
    getHistoryEVM(): Promise<import("../History").ITransactionDataEVM[]>;
    getHistory(limit?: number): Promise<HistoryItemType[]>;
    /**
     * Fetches information about the given txId and parses it from the wallet's perspective
     * @param txId
     */
    getHistoryTx(txId: string): Promise<HistoryItemType>;
    /**
     * Fetches information about the given txId and parses it from the wallet's perspective
     * @param txHash
     */
    getHistoryTxEvm(txHash: string): Promise<HistoryItemType>;
}
