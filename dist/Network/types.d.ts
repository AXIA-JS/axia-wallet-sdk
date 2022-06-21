export declare type NetworkProtocolType = 'http' | 'https';
export interface NetworkConfigRpc {
    ax: string;
    swap: string;
    core: string;
}
export interface NetworkConfig {
    rawUrl: string;
    apiProtocol: NetworkProtocolType;
    apiIp: string;
    apiPort: number;
    explorerURL?: string;
    explorerSiteURL?: string;
    networkID: number;
    evmChainID: number;
    swapChainID: string;
    coreChainID: string;
    axChainID: string;
    axcID: string;
    rpcUrl: NetworkConfigRpc;
}
