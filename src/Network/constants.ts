import { NetworkConfig } from './types';
import { Defaults } from '@zee-ava/avajs/dist/utils';
import { getRpcC, getRpcP, getRpcX } from './helpers/rpcFromConfig';

export const MainnetConfig: NetworkConfig = {
    rawUrl: 'https://api.avax.network',
    apiProtocol: 'https',
    apiIp: 'api.avax.network',
    apiPort: 443,
    explorerURL: 'https://explorerapi.avax.network',
    explorerSiteURL: 'https://explorer.avax.network',
    networkID: 1,
    // @ts-ignore
    swapChainID: Defaults.network[1]['Swap']['blockchainID'],
    // @ts-ignore
    coreChainID: Defaults.network[1]['Core']['blockchainID'],
    // @ts-ignore
    axChainID: Defaults.network[1]['AX']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[1]['AX']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[1]['Swap']['axcAssetID'],
    get rpcUrl() {
        return {
            ax: getRpcC(this),
            core: getRpcP(this),
            swap: getRpcX(this),
        };
    },
};

export const TestnetConfig: NetworkConfig = {
    rawUrl: 'http://rpc-v2.canarytest.axiacoin.network',
    apiProtocol: 'http',
    apiIp: 'rpc-v2.canarytest.axiacoin.network',
    apiPort: 80,
    explorerURL: 'https://explorerapi.avax-test.network',
    explorerSiteURL: 'https://explorer.avax-test.network',
    networkID: 5678,
    // @ts-ignore
    swapChainID: Defaults.network[5678]['Swap']['blockchainID'],
    // @ts-ignore
    coreChainID: Defaults.network[5678]['Core']['blockchainID'],
    // @ts-ignore
    axChainID: Defaults.network[5678]['AX']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[5678]['AX']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[5678]['Swap']['axcAssetID'],
    get rpcUrl() {
        return {
            ax: getRpcC(this),
            core: getRpcP(this),
            swap: getRpcX(this),
        };
    },
};

export const LocalnetConfig: NetworkConfig = {
    rawUrl: 'http://localhost:9650',
    apiProtocol: 'http',
    apiIp: 'localhost',
    apiPort: 9650,
    networkID: 12345,
    // @ts-ignore
    swapChainID: Defaults.network[12345]['Swap']['blockchainID'],
    // @ts-ignore
    coreChainID: Defaults.network[12345]['Core']['blockchainID'],
    // @ts-ignore
    axChainID: Defaults.network[12345]['AX']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[12345]['AX']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[12345]['Swap']['axcAssetID'],
    get rpcUrl() {
        return {
            ax: getRpcC(this),
            core: getRpcP(this),
            swap: getRpcX(this),
        };
    },
};

// Default network connection
export const DefaultConfig = MainnetConfig;
