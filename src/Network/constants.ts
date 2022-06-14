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
    xChainID: Defaults.network[1]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[1]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[1]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[1]['C']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[1]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

export const TestnetConfig: NetworkConfig = {
    rawUrl: 'http://18.222.205.99:9650',
    apiProtocol: 'http',
    apiIp: '18.222.205.99:9650',
    apiPort: 9650,
    explorerURL: 'https://explorerapi.avax-test.network',
    explorerSiteURL: 'https://explorer.avax-test.network',
    networkID: 5,
    // @ts-ignore
    xChainID: Defaults.network[5]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[5]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[5]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[5]['C']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[5]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
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
    xChainID: Defaults.network[12345]['X']['blockchainID'],
    // @ts-ignore
    pChainID: Defaults.network[12345]['P']['blockchainID'],
    // @ts-ignore
    cChainID: Defaults.network[12345]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: Defaults.network[12345]['C']['chainID'],
    // @ts-ignore
    axcID: Defaults.network[12345]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};

// Default network connection
export const DefaultConfig = MainnetConfig;
