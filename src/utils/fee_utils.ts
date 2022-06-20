import { coreChain, swapChain } from '@/Network/network';
import { BN } from '@zee-ava/avajs';

/**
 * Returns the transaction fee for SwapChain.
 */
export function getTxFeeX(): BN {
    return swapChain.getTxFee();
}

/**
 * Returns the transaction fee for CoreChain.
 */
export function getTxFeeP(): BN {
    return coreChain.getTxFee();
}
