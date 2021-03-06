import {
    HistoryItemType,
    HistoryItemTypeName,
    iHistoryEVMTx,
    iHistoryImportExport,
    iHistoryItem,
    iHistoryStaking,
    ITransactionData,
    ITransactionDataEVM,
} from '@/History';
import { findSourceChain, getEvmAssetBalanceFromUTXOs, parseMemo } from '@/History/history_helpers';
import { activeNetwork, swapChain } from '@/Network/network';
import { bnToAxcC, bnToAxcP, bnToAxcX } from '@/utils';
import { BN } from '@zee-ava/avajs';
import { getBaseTxSummary } from '@/History/base_tx_parser';
import { idToChainAlias } from '@/Network/helpers/aliasFromNetworkID';
import { getExportSummary, getImportSummary } from '@/History/importExportParser';
import { getOutputTotals, getOwnedOutputs, getRewardOuts, getStakeAmount } from '@/History/utxo_helpers';

export async function getTransactionSummary(
    tx: ITransactionData,
    walletAddrs: string[],
    evmAddress: string
): Promise<HistoryItemType> {
    let cleanAddressesXP = walletAddrs.map((addr) => addr.split('-')[1]);

    switch (tx.type) {
        case 'import':
        case 'pvm_import':
            return getImportSummary(tx, cleanAddressesXP);
        case 'export':
        case 'pvm_export':
        case 'atomic_export_tx':
            return getExportSummary(tx, cleanAddressesXP);
        case 'add_validator':
        case 'add_nominator':
            return getStakingSummary(tx, cleanAddressesXP);
        case 'atomic_import_tx':
            return getImportSummaryC(tx, evmAddress);
        case 'operation':
        case 'base':
            return await getBaseTxSummary(tx, cleanAddressesXP);
        default:
            return getUnsupportedSummary(tx);
    }
}

function getUnsupportedSummary(tx: ITransactionData): iHistoryItem {
    return {
        id: tx.id,
        type: 'not_supported',
        timestamp: new Date(tx.timestamp),
        fee: new BN(0),
    };
}

function getStakingSummary(tx: ITransactionData, ownerAddrs: string[]): iHistoryStaking {
    let time = new Date(tx.timestamp);

    // let coreChainID = activeNetwork.coreChainID;
    // let axcID = activeNetwork.axcID;
    let ins = tx.inputs?.map((tx) => tx.output) || [];
    let myIns = getOwnedOutputs(ins, ownerAddrs);

    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, ownerAddrs);

    let stakeAmount = getStakeAmount(tx);

    // Assign the type
    let type: HistoryItemTypeName = tx.type === 'add_validator' ? 'add_validator' : 'add_nominator';
    // If this wallet only received the fee
    if (myIns.length === 0 && type === 'add_nominator') {
        type = 'delegation_fee';
    } else if (myIns.length === 0 && type === 'add_validator') {
        type = 'validation_fee';
    }

    let rewardAmount;
    let rewardAmountClean;
    if (tx.rewarded) {
        let rewardOuts = getRewardOuts(myOuts);
        rewardAmount = getOutputTotals(rewardOuts);
        rewardAmountClean = bnToAxcP(rewardAmount);
    }

    return {
        id: tx.id,
        nodeID: tx.validatorNodeID,
        stakeStart: new Date(tx.validatorStart * 1000),
        stakeEnd: new Date(tx.validatorEnd * 1000),
        timestamp: time,
        type: type,
        fee: new BN(0),
        amount: stakeAmount,
        amountDisplayValue: bnToAxcP(stakeAmount),
        memo: parseMemo(tx.memo),
        isRewarded: tx.rewarded,
        rewardAmount: rewardAmount,
        rewardAmountDisplayValue: rewardAmountClean,
    };
}

// Returns the summary for a AXChain import TX
function getImportSummaryC(tx: ITransactionData, ownerAddr: string) {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);
    let chainAliasTo = idToChainAlias(tx.chainID);

    let axcID = activeNetwork.axcID;

    let outs = tx.outputs || [];
    let amtOut = getEvmAssetBalanceFromUTXOs(outs, ownerAddr, axcID, tx.chainID);

    let time = new Date(tx.timestamp);
    let fee = swapChain.getTxFee();

    let res: iHistoryImportExport = {
        id: tx.id,
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'import',
        fee: fee,
        memo: parseMemo(tx.memo),
    };

    return res;
}
