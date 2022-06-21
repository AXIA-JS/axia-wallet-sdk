import { NetworkConfig } from '../types';

export function getRpcC(conf: NetworkConfig) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/AX/rpc`;
}
export function getRpcX(conf: NetworkConfig) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/Swap`;
}
export function getRpcP(conf: NetworkConfig) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/Core`;
}
