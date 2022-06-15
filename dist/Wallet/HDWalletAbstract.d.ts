import { WalletProvider } from "./Wallet";
import HdScanner from "./HdScanner";
import { UTXOSet as AXVMUTXOSet } from '@zee-ava/avajs/dist/apis/axvm/utxos';
import { UTXOSet as PlatformUTXOSet } from '@zee-ava/avajs/dist/apis/platformvm';
import { iHDWalletIndex } from "./types";
import * as bip32 from 'bip32';
import { NetworkConfig } from "../Network";
export declare abstract class HDWalletAbstract extends WalletProvider {
    protected internalScan: HdScanner;
    protected externalScan: HdScanner;
    protected accountKey: bip32.BIP32Interface;
    isHdReady: boolean;
    protected constructor(accountKey: bip32.BIP32Interface);
    protected onNetworkChange(config: NetworkConfig): void;
    /**
     * Returns current index used for external address derivation.
     */
    getExternalIndex(): number;
    /**
     * Returns current index used for internal address derivation.
     */
    getInternalIndex(): number;
    /**
     * Gets the active external address on the AssetChain
     * - The X address will change after every deposit.
     */
    getAddressX(): string;
    /**
     * Gets the active change address on the AssetChain
     * - The change address will change after every transaction on the AssetChain.
     */
    getChangeAddressX(): string;
    /**
     * Gets the active address on the CoreChain
     */
    getAddressP(): string;
    /**
     * Returns every external AssetChain address used by the wallet up to now.
     */
    getExternalAddressesX(): Promise<string[]>;
    /**
     * Returns every external AssetChain address used by the wallet up to now.
     */
    getExternalAddressesXSync(): string[];
    /**
     * Returns every internal AssetChain address used by the wallet up to now.
     */
    getInternalAddressesX(): Promise<string[]>;
    /**
     * Returns every internal AssetChain address used by the wallet up to now.
     */
    getInternalAddressesXSync(): string[];
    /**
     * Returns every AssetChain address used by the wallet up to now (internal + external).
     */
    getAllAddressesX(): Promise<string[]>;
    /**
     * Returns every AssetChain address used by the wallet up to now (internal + external).
     */
    getAllAddressesXSync(): string[];
    getExternalAddressesP(): Promise<string[]>;
    getExternalAddressesPSync(): string[];
    /**
     * Returns every CoreChain address used by the wallet up to now.
     */
    getAllAddressesP(): Promise<string[]>;
    /**
     * Returns every CoreChain address used by the wallet up to now.
     */
    getAllAddressesPSync(): string[];
    /**
     * Scans the network and initializes internal and external addresses on P and AssetChains.
     * - Heavy operation
     * - MUST use the explorer api to find the last used address
     * - If explorer is not available it will use the connected node. This may result in invalid balances.
     */
    resetHdIndices(externalStart?: number, internalStart?: number): Promise<iHDWalletIndex>;
    setHdIndices(external: number, internal: number): void;
    /**
     * Emits an event to indicate the wallet has finishing calculating its last use address
     * @protected
     */
    protected emitHdReady(): void;
    updateUtxosX(): Promise<AXVMUTXOSet>;
    private incrementExternal;
    private incrementInternal;
    updateUtxosP(): Promise<PlatformUTXOSet>;
    getAddressAtIndexExternalX(index: number): string;
    getAddressAtIndexInternalX(index: number): string;
    getAddressAtIndexExternalP(index: number): string;
}
