/**
 * Fetches the current AXC price using Coin Gecko.
 * @remarks
 * You might get rate limited if you use this function frequently.
 *
 * @return
 * Current price of 1 AXC vs a currency (default USD)
 */
export declare function getAxcPrice(currentCurrency?: string): Promise<number>;
/**
 * Gets daily price history using Coin Gecko.
 * @param currency
 */
export declare function getAxcPriceHistory(currency?: string): Promise<[timestamp: number, price: number][]>;
