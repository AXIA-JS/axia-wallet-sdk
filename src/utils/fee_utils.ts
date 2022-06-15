import { coreChain, assetChain } from '@/Network/network';
import { BN } from '@zee-ava/avajs';

/**
 * Returns the transaction fee for AssetChain.
 */
export function getTxFeeX(): BN {
    return assetChain.getTxFee();
}

/**
 * Returns the transaction fee for CoreChain.
 */
export function getTxFeeP(): BN {
    return coreChain.getTxFee();
}
