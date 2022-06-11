import { iHistoryImportExport } from '@/History/types';
import { parseMemo } from '@/History/history_helpers';
import { idToChainAlias } from '@/Network/helpers/aliasFromNetworkID';
import { xChain } from '@/Network/network';
import { bnToAxcX } from '@/utils';
import { getOutputsOfChain, getOutputTotals, getOwnedOutputs } from '@/Explorer/ortelius/utxoUtils';
import { findDestinationChain, findSourceChain, OrteliusAxiaTx } from '@/Explorer';

export function getImportSummary(tx: OrteliusAxiaTx, addresses: string[]): iHistoryImportExport {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);
    let chainAliasTo = idToChainAlias(tx.chainID);

    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, addresses);
    let amtOut = getOutputTotals(myOuts);

    let time = new Date(tx.timestamp);
    let fee = xChain.getTxFee();

    let res: iHistoryImportExport = {
        id: tx.id,
        memo: parseMemo(tx.memo),
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'import',
        fee: fee,
    };

    return res;
}

export function getExportSummary(tx: OrteliusAxiaTx, addresses: string[]): iHistoryImportExport {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);

    let destinationChain = findDestinationChain(tx);
    let chainAliasTo = idToChainAlias(destinationChain);

    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, addresses);
    let chainOuts = getOutputsOfChain(myOuts, destinationChain);
    let amtOut = getOutputTotals(chainOuts);

    let time = new Date(tx.timestamp);
    let fee = xChain.getTxFee();

    let res: iHistoryImportExport = {
        id: tx.id,
        memo: parseMemo(tx.memo),
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'export',
        fee: fee,
    };

    return res;
}
