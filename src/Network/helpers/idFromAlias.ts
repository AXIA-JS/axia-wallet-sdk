import { ChainIdType } from '@/types';
import { axChain, coreChain, swapChain } from '@/Network/network';

/**
 * Given a chain alias, returns the chain id.
 * @param alias `Swap`, `Core` or `AX`
 */
export function chainIdFromAlias(alias: ChainIdType) {
    if (alias === 'Swap') {
        return swapChain.getBlockchainID();
    } else if (alias === 'Core') {
        return coreChain.getBlockchainID();
    } else if (alias === 'AX') {
        return axChain.getBlockchainID();
    }
    throw new Error('Unknown chain alias.');
}
