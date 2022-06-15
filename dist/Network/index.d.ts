import { NetworkConfig } from './types';
import { getEvmChainID, getConfigFromUrl } from "./network";
import WebsocketProvider from "./providers/WebsocketProvider";
export declare function setNetwork(conf: NetworkConfig): void;
/**
 * Unlike `setNetwork` this function will fail if the network is not available.
 * @param conf
 */
export declare function setNetworkAsync(conf: NetworkConfig): Promise<void>;
export declare function isFujiNetwork(activeNetwork: NetworkConfig): boolean;
export declare function isMainnetNetwork(activeNetwork: NetworkConfig): boolean;
export declare function isLocalNetwork(activeNetwork: NetworkConfig): boolean;
export declare function getAxcAssetID(): string;
export declare function getActiveNetworkConfig(): NetworkConfig;
export { WebsocketProvider, getEvmChainID, getConfigFromUrl };
export { NetworkConfig } from './types';
export * from './helpers';
