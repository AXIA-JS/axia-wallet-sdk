import { NetworkConfig } from "../Network/types";
import { Axia } from '@zee-ava/avajs';
import { HttpClient } from './http_client';
export declare function wsUrlFromConfigX(config: NetworkConfig): string;
export declare function wsUrlFromConfigEVM(config: NetworkConfig): string;
/**
 * Given the base url of an Axia API, requests the Network ID
 * @param url The base url for the Axia API
 */
export declare function getNetworkIdFromURL(url: string): Promise<number>;
export declare function createAxiaProvider(config: NetworkConfig): Axia;
/**
 * Given a network configuration returns an HttpClient instance connected to the explorer
 */
export declare function createExplorerApi(networkConfig: NetworkConfig): HttpClient;
/**
 * Checks if the given network accepts credentials.
 * This must be true to use cookies.
 */
export declare function canUseCredentials(config: NetworkConfig): Promise<boolean>;
