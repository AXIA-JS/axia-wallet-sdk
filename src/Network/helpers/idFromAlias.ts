import { ChainIdType } from '@/types';
import { appChain, coreChain, xChain } from '@/Network/network';

/**
 * Given a chain alias, returns the chain id.
 * @param alias `X`, `P` or `C`
 */
export function chainIdFromAlias(alias: ChainIdType) {
    if (alias === 'X') {
        return xChain.getBlockchainID();
    } else if (alias === 'P') {
        return coreChain.getBlockchainID();
    } else if (alias === 'C') {
        return appChain.getBlockchainID();
    }
    throw new Error('Unknown chain alias.');
}
