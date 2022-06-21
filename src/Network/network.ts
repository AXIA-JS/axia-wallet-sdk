import { Axia } from '@zee-ava/avajs/dist';
import { AVMAPI } from '@zee-ava/avajs/dist/apis/avm';
import { InfoAPI } from '@zee-ava/avajs/dist/apis/info';
import { EVMAPI } from '@zee-ava/avajs/dist/apis/evm';
import Web3 from 'web3';
import { DefaultConfig } from './constants';
import { NetworkConfig, NetworkConfigRpc, NetworkProtocolType } from './types';
import { AxiosInstance } from 'axios';
import { getRpcC, getRpcP, getRpcX } from './helpers/rpcFromConfig';
import URL from 'url';
import { bintools } from '@/common';
import {
    canUseCredentials,
    createAxiaProvider,
    createExplorerApi,
    getNetworkIdFromURL,
} from '@/helpers/network_helper';

export const axia: Axia = createAxiaProvider(DefaultConfig);

export const swapChain: AVMAPI = axia.SwapChain();
export const axChain: EVMAPI = axia.AXChain();
export const coreChain = axia.CoreChain();
export const infoApi: InfoAPI = axia.Info();

function getProviderFromUrl(url: string, credentials = false) {
    return new Web3.providers.HttpProvider(url, {
        timeout: 20000,
        withCredentials: credentials,
    });
}

const rpcUrl = getRpcC(DefaultConfig);
export const web3 = new Web3(getProviderFromUrl(rpcUrl, true));

export let explorer_api: AxiosInstance | null = null;
export let activeNetwork: NetworkConfig = DefaultConfig;

/**
 * Returns the evm chain ID of the active network
 */
export function getEvmChainID(): number {
    return activeNetwork.evmChainID;
}

/**
 * Similar to `setRpcNetwork`, but checks if credentials can be used with the api.
 * @param config
 */
export async function setRpcNetworkAsync(config: NetworkConfig): Promise<void> {
    let credentials = await canUseCredentials(config);
    setRpcNetwork(config, credentials);
}

/**
 * Changes the connected network of the SDK.
 * This is a synchronous call that does not do any network requests.
 * @param conf
 * @param credentials
 */
export function setRpcNetwork(conf: NetworkConfig, credentials = true): void {
    axia.setAddress(conf.apiIp, conf.apiPort, conf.apiProtocol);
    axia.setNetworkID(conf.networkID);

    if (credentials) {
        axia.setRequestConfig('withCredentials', credentials);
    } else {
        axia.removeRequestConfig('withCredentials');
    }

    swapChain.refreshBlockchainID(conf.swapChainID);
    swapChain.setBlockchainAlias('Swap');

    coreChain.refreshBlockchainID(conf.coreChainID);
    coreChain.setBlockchainAlias('Core');

    axChain.refreshBlockchainID(conf.axChainID);
    axChain.setBlockchainAlias('AX');

    swapChain.setAXCAssetID(conf.axcID);
    coreChain.setAXCAssetID(conf.axcID);
    axChain.setAXCAssetID(conf.axcID);

    if (conf.explorerURL) {
        explorer_api = createExplorerApi(conf);
    } else {
        explorer_api = null;
    }

    let rpcUrl = getRpcC(conf);
    web3.setProvider(getProviderFromUrl(rpcUrl, credentials));

    activeNetwork = conf;
}

/**
 * Given the base url for an Axia API, returns a NetworkConfig object.
 * @param url A string including protocol, base domain, and ports (if any). Ex: `http://localhost:9650`
 */
export async function getConfigFromUrl(url: string): Promise<NetworkConfig> {
    let urlObj = URL.parse(url);
    let portStr = urlObj.port;

    if (!urlObj.hostname || !urlObj.protocol) throw new Error('Invalid url.');

    if (!portStr) {
        portStr = urlObj.protocol === 'http:' ? '80' : '443';
    }

    // get network ID
    let netID = await getNetworkIdFromURL(url);
    let protocol: NetworkProtocolType = urlObj.protocol === 'http:' ? 'http' : 'https';

    let connection = new Axia(urlObj.hostname, parseInt(portStr), protocol, netID);
    // TODO: Use a helper for this
    let connectionEvm = new Web3(urlObj.href + 'ext/bc/AX/rpc');

    let infoApi = connection.Info();
    let xApi = connection.SwapChain();

    let fetchIdX = infoApi.getBlockchainID('Swap');
    let fetchIdP = infoApi.getBlockchainID('Core');
    let fetchIdC = infoApi.getBlockchainID('AX');
    let fetchEvmChainID = connectionEvm.eth.getChainId();
    let fetchAxcId = await xApi.getAXCAssetID();

    let values = await Promise.all([fetchIdX, fetchIdP, fetchIdC, fetchAxcId, fetchEvmChainID]);

    let idX = values[0];
    let idP = values[1];
    let idC = values[2];
    let axcId = bintools.cb58Encode(values[3]);
    let evmChainId = values[4];

    let config: NetworkConfig = {
        rawUrl: url,
        apiProtocol: protocol,
        apiIp: urlObj.hostname,
        apiPort: parseInt(portStr),
        networkID: netID,
        swapChainID: idX,
        coreChainID: idP,
        axChainID: idC,
        axcID: axcId,
        evmChainID: evmChainId,
        get rpcUrl(): NetworkConfigRpc {
            return {
                ax: getRpcC(this),
                core: getRpcP(this),
                swap: getRpcX(this),
            };
        },
    };

    return config;
}
