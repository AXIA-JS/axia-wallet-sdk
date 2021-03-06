import { NetworkConfig } from '@/Network/types';
import axios from 'axios';
import { Axia } from '@zee-ava/avajs';

export function wsUrlFromConfigX(config: NetworkConfig): string {
    let protocol = config.apiProtocol === 'http' ? 'ws' : 'wss';
    return `${protocol}://${config.apiIp}:${config.apiPort}/ext/bc/Swap/events`;
}

export function wsUrlFromConfigEVM(config: NetworkConfig): string {
    let protocol = config.apiProtocol === 'http' ? 'ws' : 'wss';
    return `${protocol}://${config.apiIp}:${config.apiPort}/ext/bc/AX/ws`;
}

/**
 * Given the base url of an Axia API, requests the Network ID
 * @param url The base url for the Axia API
 */
export async function getNetworkIdFromURL(url: string): Promise<number> {
    // TODO: Not be the best to assume /ext/info but Axiajs complicates things
    let res = await axios.post(url + '/ext/info', {
        jsonrpc: '2.0',
        id: 1,
        method: 'info.getNetworkID',
    });
    return parseInt(res.data.result.networkID);
}

export function createAxiaProvider(config: NetworkConfig) {
    return new Axia(config.apiIp, config.apiPort, config.apiProtocol, config.networkID);
}
/**
 * Given a network configuration returns an Axios instance connected to the explorer
 */
export function createExplorerApi(networkConfig: NetworkConfig) {
    if (!networkConfig.explorerURL) {
        throw new Error('Network configuration does not specify an explorer API.');
    }

    return axios.create({
        baseURL: networkConfig.explorerURL,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

/**
 * Checks if the given network accepts credentials.
 * This must be true to use cookies.
 */
export async function canUseCredentials(config: NetworkConfig): Promise<boolean> {
    let provider = createAxiaProvider(config);
    provider.setRequestConfig('withCredentials', true);

    let infoApi = provider.Info();

    // Make a dummy request with credentials
    try {
        await infoApi.getNetworkID();
        return true;
        // eslint-disable-next-line
    } catch (e) {}

    provider.setRequestConfig('withCredentials', false);

    try {
        await infoApi.getNetworkID();
    } catch (e) {
        throw new Error('Unable to connect.');
    }

    return false;
}
