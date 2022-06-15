import {
    AxvmStatusResponseType,
    AxvmStatusType,
    ChainStatusResponseTypeC,
    ChainStatusTypeC,
    PlatformStatusResponseType,
    PlatformStatusType,
} from '@/utils/types';
import { appChain, coreChain, web3, assetChain } from '@/Network/network';

/**
 * Waits until the given tx id is accepted on AssetChain
 * @param txId Tx ID to wait for
 * @param tryCount Number of attempts until timeout
 */
export async function waitTxX(txId: string, tryCount = 10): Promise<string> {
    if (tryCount <= 0) {
        throw new Error('Timeout');
    }
    let resp: AxvmStatusResponseType;

    try {
        resp = (await assetChain.getTxStatus(txId)) as AxvmStatusResponseType;
    } catch (e) {
        throw new Error('Unable to get transaction status.');
    }

    let status: AxvmStatusType;
    let reason;
    if (typeof resp === 'string') {
        status = resp as AxvmStatusType;
    } else {
        status = resp.status as AxvmStatusType;
        reason = resp.reason;
    }

    if (status === 'Unknown' || status === 'Processing') {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await waitTxX(txId, tryCount - 1));
            }, 1000);
        });
        // return await waitTxX(txId, tryCount - 1);
    } else if (status === 'Rejected') {
        throw new Error(reason);
    } else if (status === 'Accepted') {
        return txId;
    }

    return txId;
}

export async function waitTxP(txId: string, tryCount = 10): Promise<string> {
    if (tryCount <= 0) {
        throw new Error('Timeout');
    }
    let resp: PlatformStatusResponseType;

    try {
        resp = (await coreChain.getTxStatus(txId)) as PlatformStatusResponseType;
    } catch (e) {
        throw new Error('Unable to get transaction status.');
    }

    let status: PlatformStatusType;
    let reason;
    if (typeof resp === 'string') {
        status = resp as PlatformStatusType;
    } else {
        status = resp.status as PlatformStatusType;
        reason = resp.reason;
    }

    if (status === 'Unknown' || status === 'Processing') {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await waitTxP(txId, tryCount - 1));
            }, 1000);
        });
        // return await waitTxX(txId, tryCount - 1);
    } else if (status === 'Dropped') {
        throw new Error(reason);
    } else if (status === 'Committed') {
        return txId;
    } else {
        throw new Error('Unknown status type.');
    }
}

export async function waitTxEvm(txHash: string, tryCount = 10): Promise<string> {
    if (tryCount <= 0) {
        throw new Error('Timeout');
    }

    let receipt;

    try {
        receipt = await web3.eth.getTransactionReceipt(txHash);
    } catch (e) {
        throw new Error('Unable to get transaction receipt.');
    }

    if (!receipt) {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await waitTxEvm(txHash, tryCount - 1));
            }, 1000);
        });
    } else {
        if (receipt.status) {
            return txHash;
        } else {
            throw new Error('Transaction reverted.');
        }
    }
}

export async function waitTxC(txId: string, tryCount = 10): Promise<string> {
    if (tryCount <= 0) {
        throw new Error('Timeout');
    }

    let resp: ChainStatusResponseTypeC;
    try {
        resp = (await appChain.getAtomicTxStatus(txId)) as ChainStatusResponseTypeC;
    } catch (e) {
        throw new Error('Unable to get transaction status.');
    }

    let status: ChainStatusTypeC;
    let reason;
    if (typeof resp === 'string') {
        status = resp as ChainStatusTypeC;
    } else {
        status = resp.status as ChainStatusTypeC;
        reason = resp.reason;
    }

    if (status === 'Unknown' || status === 'Processing') {
        return await new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await waitTxC(txId, tryCount - 1));
            }, 1000);
        });
        // return await waitTxX(txId, tryCount - 1);
    } else if (status === 'Dropped') {
        throw new Error(reason);
    } else if (status === 'Accepted') {
        return txId;
    } else {
        throw new Error('Unknown status type.');
    }
}
