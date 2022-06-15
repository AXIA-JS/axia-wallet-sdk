import { coreChain, xChain } from '@/Network/network';
import { BN } from '@zee-ava/avajs';

/**
 * Returns the transaction fee for X chain.
 */
export function getTxFeeX(): BN {
    return xChain.getTxFee();
}

/**
 * Returns the transaction fee for CoreChain.
 */
export function getTxFeeP(): BN {
    return coreChain.getTxFee();
}
