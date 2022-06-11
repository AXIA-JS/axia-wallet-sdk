import { Axia } from '@zee-ava/avajs/dist';
import { AVMAPI } from '@zee-ava/avajs/dist/apis/avm';
import { InfoAPI } from '@zee-ava/avajs/dist/apis/info';
import { EVMAPI } from '@zee-ava/avajs/dist/apis/evm';
import Web3 from 'web3';
import { NetworkConfig } from './types';
import { ethers } from 'ethers';
import { HttpClient } from "../helpers/http_client";
export declare const axia: Axia;
export declare const xChain: AVMAPI;
export declare const cChain: EVMAPI;
export declare const pChain: import("@zee-ava/avajs/dist/apis/platformvm").PlatformVMAPI;
export declare const infoApi: InfoAPI;
export declare const web3: Web3;
export declare let ethersProvider: ethers.providers.JsonRpcProvider;
export declare let explorer_api: HttpClient | null;
export declare let activeNetwork: NetworkConfig;
/**
 * Returns the evm chain ID of the active network
 */
export declare function getEvmChainID(): number;
/**
 * Similar to `setRpcNetwork`, but checks if credentials can be used with the api.
 * @param config
 */
export declare function setRpcNetworkAsync(config: NetworkConfig): Promise<void>;
/**
 * Changes the connected network of the SDK.
 * This is a synchronous call that does not do any network requests.
 * @param conf
 * @param credentials
 */
export declare function setRpcNetwork(conf: NetworkConfig, credentials?: boolean): void;
/**
 * Given the base url for an Axia API, returns a NetworkConfig object.
 * @param url A string including protocol, base domain, and ports (if any). Ex: `http://localhost:9650`
 */
export declare function getConfigFromUrl(url: string): Promise<NetworkConfig>;
