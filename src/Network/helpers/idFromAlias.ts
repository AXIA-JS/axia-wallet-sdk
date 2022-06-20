import { ChainIdType } from '@/types';
import { axChain, coreChain, swapChain } from '@/Network/network';

/**
 * Given a chain alias, returns the chain id.
 * @param alias `X`, `P` or `C`
 */
export function chainIdFromAlias(alias: ChainIdType) {
    if (alias === 'X') {
        return swapChain.getBlockchainID();
    } else if (alias === 'P') {
        return coreChain.getBlockchainID();
    } else if (alias === 'C') {
        return axChain.getBlockchainID();
    }
    throw new Error('Unknown chain alias.');
}
