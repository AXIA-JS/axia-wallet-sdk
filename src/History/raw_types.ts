/**
 * Data coming from explorer for AXChain
 */
export interface ITransactionDataEVM {
    block: string;
    hash: string;
    createdAt: string;
    nonce: number;
    gasPrice: string;
    gasLimit: number;
    blockGasUsed: number;
    blockGasLimit: number;
    blockNonce: number;
    blockHash: string;
    recipient: string;
    value: string;
    toAddr: string;
    fromAddr: string;
    input?: string;
    v: string;
    r: string;
    s: string;
    traces: [
        {
            callType: string;
            to: string;
            from: string;
            type: string;
            gasUsed: string;
            gas: string;
            value: string;
        }
    ];
}

/**
 * Data coming from the explorer for X,CoreChain
 */
export interface ITransactionData {
    chainID: string;
    id: string;
    inputTotals: {
        [key: string]: string;
    };
    inputs: TransactionInput[] | null;
    memo: string;
    outputTotals: {
        [key: string]: string;
    };
    outputs: UTXO[] | null;

    reusedAddressTotals: null;
    rewarded: boolean;
    rewardedTime: string;
    timestamp: string;
    txFee: number;
    type: TransactionType;
    validatorStart: number;
    validatorEnd: number;
    validatorNodeID: string;
}

interface TransactionInput {
    credentials: TransactionCredential[];
    output: UTXO;
}

interface TransactionCredential {
    address: string;
    public_key: string;
    signature: string;
}

export interface UTXO {
    addresses: string[] | null;
    caddresses?: string[];
    amount: string;
    assetID: string;
    chainID: string;
    groupID: number;
    id: string;
    locktime: number;
    payload?: string;
    outputIndex: number;
    outputType: number;
    redeemingTransactionID: string;
    stake?: boolean;
    inChainID: string;
    outChainID: string;
    threshold: number;
    timestamp: string;
    transactionID: string;
    rewardUtxo: boolean;
}

export type TransactionType =
    | 'base'
    | 'create_asset'
    | 'operation'
    | 'import'
    | 'export'
    | 'add_validator'
    | 'add_subnet_validator'
    | 'add_nominator'
    | 'create_chain'
    | 'create_subnet'
    | 'pvm_import'
    | 'pvm_export'
    | 'atomic_import_tx' // for AXChain imports?
    | 'atomic_export_tx' // for AXChain exports?
    | 'advance_time'
    | 'reward_validator';
