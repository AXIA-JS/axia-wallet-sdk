import AXVMWebSocketProvider from "./AXVMWebSocketProvider";
import EVMWebSocketProvider from "./EVMWebSocketProvider";
import { WalletType } from "../../Wallet/types";
import { NetworkConfig } from "../types";
export default class WebsocketProvider {
    axvmProvider: AXVMWebSocketProvider;
    evmProvider: EVMWebSocketProvider;
    constructor(axvmEndpoint: string, evmEndpoint: string);
    static fromActiveNetwork(): WebsocketProvider;
    static fromNetworkConfig(config: NetworkConfig): WebsocketProvider;
    setEndpoints(axvmEndpoint: string, evmEndpoint: string): void;
    setNetwork(config: NetworkConfig): void;
    trackWallet(wallet: WalletType): void;
    removeWallet(wallet: WalletType): void;
}
