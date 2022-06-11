import { NetworkConfig } from "./types";
export declare function isFujiNetwork(activeNetwork: NetworkConfig): boolean;
export declare function isMainnetNetwork(activeNetwork: NetworkConfig): boolean;
export declare function isLocalNetwork(activeNetwork: NetworkConfig): boolean;
export declare function getAxcAssetID(): string;
export declare function getActiveNetworkConfig(): NetworkConfig;
