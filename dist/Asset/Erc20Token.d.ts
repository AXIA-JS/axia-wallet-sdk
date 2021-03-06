/// <reference types="bn.js" />
import { Erc20TokenData } from "./types";
import { BN } from '@zee-ava/avajs';
import { Contract } from 'web3-eth-contract';
export default class Erc20Token {
    contract: Contract;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    chainId: number;
    data: Erc20TokenData;
    constructor(data: Erc20TokenData);
    toData(): Erc20TokenData;
    static getData(address: string): Promise<Erc20TokenData>;
    balanceOf(address: string): Promise<BN>;
}
