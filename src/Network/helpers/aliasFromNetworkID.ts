import { ChainIdType } from '@/types';
import { activeNetwork } from '@/Network/network';

/**
 * Given the chain ID returns the chain alias
 * @param id Chain id
 */
export function idToChainAlias(id: string): ChainIdType {
    if (id === activeNetwork.swapChainID) {
        return 'Swap';
    } else if (id === activeNetwork.coreChainID) {
        return 'Core';
    } else if (id === activeNetwork.axChainID) {
        return 'AX';
    }
    throw new Error('Unknown chain ID.');
}
