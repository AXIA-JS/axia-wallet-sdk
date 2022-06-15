import { ChainIdType } from '@/types';
import { activeNetwork } from '@/Network/network';

/**
 * Given the chain ID returns the chain alias
 * @param id Chain id
 */
export function idToChainAlias(id: string): ChainIdType {
    if (id === activeNetwork.xChainID) {
        return 'X';
    } else if (id === activeNetwork.coreChainID) {
        return 'P';
    } else if (id === activeNetwork.appChainID) {
        return 'C';
    }
    throw new Error('Unknown chain ID.');
}
