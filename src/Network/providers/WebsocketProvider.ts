import AXVMWebSocketProvider from '@/Network/providers/AXVMWebSocketProvider';
import EVMWebSocketProvider from '@/Network/providers/EVMWebSocketProvider';
import { WalletType } from '@/Wallet/types';
import { NetworkConfig } from '@/Network/types';
import { wsUrlFromConfigEVM, wsUrlFromConfigX } from '@/helpers/network_helper';
import { activeNetwork } from '@/Network/network';

export default class WebsocketProvider {
    axvmProvider: AXVMWebSocketProvider;
    evmProvider: EVMWebSocketProvider;

    constructor(axvmEndpoint: string, evmEndpoint: string) {
        this.axvmProvider = new AXVMWebSocketProvider(axvmEndpoint);
        this.evmProvider = new EVMWebSocketProvider(evmEndpoint);
    }

    static fromActiveNetwork(): WebsocketProvider {
        return WebsocketProvider.fromNetworkConfig(activeNetwork);
    }

    static fromNetworkConfig(config: NetworkConfig): WebsocketProvider {
        let evm = wsUrlFromConfigEVM(config);
        let axvm = wsUrlFromConfigX(config);
        return new WebsocketProvider(axvm, evm);
    }

    public setEndpoints(axvmEndpoint: string, evmEndpoint: string): void {
        this.axvmProvider.setEndpoint(axvmEndpoint);
        this.evmProvider.setEndpoint(evmEndpoint);
    }

    public setNetwork(config: NetworkConfig): void {
        let evm = wsUrlFromConfigEVM(config);
        let axvm = wsUrlFromConfigX(config);
        this.setEndpoints(axvm, evm);
    }

    public trackWallet(wallet: WalletType): void {
        this.axvmProvider.trackWallet(wallet);
        this.evmProvider.trackWallet(wallet);
    }

    public removeWallet(wallet: WalletType): void {
        this.axvmProvider.removeWallet(wallet);
        this.evmProvider.removeWallet(wallet);
    }
}
