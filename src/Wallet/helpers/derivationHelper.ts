import { AXC_TOKEN_PATH, ETH_ACCOUNT_PATH } from '@/Wallet/constants';

/**
 * Given an account number, returns the Axia account derivation path as a string
 * @param accountIndex
 */
export function getAccountPathAxia(accountIndex: number) {
    if (accountIndex < 0) throw new Error('Account index can not be less than 0.');
    return `${AXC_TOKEN_PATH}/${accountIndex}'`;
}

export function getAccountPathEVM(accountIndex: number) {
    if (accountIndex < 0) throw new Error('Account index can not be less than 0.');
    return `${ETH_ACCOUNT_PATH}/0/${accountIndex}`;
}
