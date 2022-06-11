/**
 * Given an account number, returns the Axia account derivation path as a string
 * @param accountIndex
 */
export declare function getAccountPathAxia(accountIndex: number): string;
/**
 * Returns the string `m/44'/60'/0'/0/n` where `n` is the account index.
 * @param accountIndex
 */
export declare function getAccountPathEVM(accountIndex: number): string;
