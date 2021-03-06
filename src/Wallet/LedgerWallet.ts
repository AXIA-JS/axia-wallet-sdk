//@ts-ignore
import Eth from '@ledgerhq/hw-app-eth';
// @ts-ignore
import AppAxc from '@zee-ava/hd-wallet-axia';
import EthereumjsCommon from '@ethereumjs/common';
import { importPublic, bnToRlp, rlp, BN as EthBN } from 'ethereumjs-util';
import {
    AXC_ACCOUNT_PATH,
    ETH_ACCOUNT_PATH,
    LEDGER_ETH_ACCOUNT_PATH,
    LEDGER_EXCHANGE_TIMEOUT,
    MIN_EVM_SUPPORT_V,
} from '@/Wallet/constants';
import HDKey from 'hdkey';
import { ChainAlias, ILedgerAppConfig, WalletNameType } from '@/Wallet/types';
import { Transaction, TxOptions } from '@ethereumjs/tx';
import {
    UnsignedTx as AVMUnsignedTx,
    Tx as AVMTx,
    TransferableOperation,
    OperationTx,
    AVMConstants,
    ImportTx as AVMImportTx,
    SelectCredentialClass as AVMSelectCredentialClass,
} from '@zee-ava/avajs/dist/apis/avm';
import { Credential, SigIdx, Signature } from '@zee-ava/avajs/dist/common';
import {
    UnsignedTx as EVMUnsignedTx,
    Tx as EVMTx,
    ImportTx as EVMImportTx,
    ExportTx as EVMExportTx,
    EVMInput,
    SelectCredentialClass as EVMSelectCredentialClass,
    EVMConstants,
} from '@zee-ava/avajs/dist/apis/evm';
import {
    UnsignedTx as PlatformUnsignedTx,
    Tx as PlatformTx,
    PlatformVMConstants,
    ExportTx as PlatformExportTx,
    ImportTx as PlatformImportTx,
    SelectCredentialClass as PlatformSelectCredentialClass,
} from '@zee-ava/avajs/dist/apis/platformvm';
import { HDWalletAbstract } from '@/Wallet/HDWalletAbstract';
import EvmWalletReadonly from '@/Wallet/EvmWalletReadonly';
import { KeyPair as EVMKeyPair } from '@zee-ava/avajs/dist/apis/evm/keychain';
import { activeNetwork, axia, web3 } from '@/Network/network';
import { Buffer } from '@zee-ava/avajs';
import { ChainIdType } from '@/types';
import { ParseableAvmTxEnum, ParseablePlatformEnum, ParseableEvmTxEnum } from '@/helpers/tx_helper';
import createHash from 'create-hash';
//@ts-ignore
import bippath from 'bip32-path';
import { bintools } from '@/common';
import * as bip32 from 'bip32';
import { idToChainAlias } from '@/Network';
import { getAccountPathAxia } from '@/Wallet/helpers/derivationHelper';

export default class LedgerWallet extends HDWalletAbstract {
    evmWallet: EvmWalletReadonly;
    type: WalletNameType = 'ledger';
    evmAccount: HDKey;
    config: ILedgerAppConfig;

    appAxc: AppAxc;
    ethApp: Eth;

    constructor(
        axcAcct: bip32.BIP32Interface,
        evmAcct: HDKey,
        axcApp: AppAxc,
        ethApp: Eth,
        config: ILedgerAppConfig
    ) {
        super(axcAcct);
        this.evmAccount = evmAcct;
        this.config = config;
        this.appAxc = axcApp;
        this.ethApp = ethApp;

        this.evmWallet = new EvmWalletReadonly(importPublic(evmAcct.publicKey));
    }

    /**
     * Create a new ledger wallet instance from the given transport
     * @param transport
     */
    static async fromTransport(transport: any) {
        transport.setExchangeTimeout(LEDGER_EXCHANGE_TIMEOUT);

        const app = LedgerWallet.getAppAxc(transport);
        const eth = LedgerWallet.getAppEth(transport);

        let config = await app.getAppConfiguration();

        if (!config) {
            throw new Error(`Unable to connect ledger. You must use ledger version ${MIN_EVM_SUPPORT_V} or above.`);
        }

        if (config.version < MIN_EVM_SUPPORT_V) {
            throw new Error(`Unable to connect ledger. You must use ledger version ${MIN_EVM_SUPPORT_V} or above.`);
        }

        return await LedgerWallet.fromApp(app, eth);
    }

    /**
     * Returns a bip32 HD Node that can be used to derive internal/external Axia addresses
     * @param app Axia hw app instance
     * @param accountIndex Index of the account.
     * @return BIP32Interface The returned HD Node is of path `m/44'/9000'/n'` where `n` is the account index.
     */
    static async getAxcAccount(app: AppAxc, accountIndex = 0): Promise<bip32.BIP32Interface> {
        if (accountIndex < 0) throw new Error('Account index must be >= 0');

        let res = await app.getWalletExtendedPublicKey(getAccountPathAxia(accountIndex));

        let pubKey = res.public_key;
        let chainCode = res.chain_code;

        // Get the base58 publick key from the HDKey instance
        let hdKey = new HDKey();
        // @ts-ignore
        hdKey.publicKey = pubKey;
        // @ts-ignore
        hdKey.chainCode = chainCode;

        let hd = bip32.fromBase58(hdKey.publicExtendedKey);

        return hd;
    }

    /**
     * Returns a HDKey instance for the given account index.
     * @param eth Eth hw app instance
     * @param accountIndex
     * @return HDKey Returned HD node is of derivation path `m/44'/60'/0'/0/n` where `n` is the account index.
     */
    static async getEvmAccount(eth: Eth, accountIndex = 0): Promise<HDKey> {
        if (accountIndex < 0) throw new Error('Account index must be >= 0');

        //TODO: Use account derivation path instead of address
        let ethRes = await eth.getAddress(ETH_ACCOUNT_PATH, true, true);
        let hdEth = new HDKey();
        // @ts-ignore
        hdEth.publicKey = Buffer.from(ethRes.publicKey, 'hex');
        // @ts-ignore
        hdEth.chainCode = Buffer.from(ethRes.chainCode, 'hex');

        const acctPath = `m/0/${accountIndex}`;
        return hdEth.derive(acctPath);
    }

    /**
     * Returns the extended public key used by AXChain for address derivation.
     * @remarks Returns the extended public key for path `m/44'/60'/0'`. This key can be used to derive AXChain accounts.
     * @param transport
     */
    static async getExtendedPublicKeyEth(transport: any): Promise<string> {
        const ethApp = LedgerWallet.getAppEth(transport);
        let ethRes = await ethApp.getAddress(ETH_ACCOUNT_PATH, true, true);
        let hdEth = new HDKey();
        // @ts-ignore
        hdEth.publicKey = Buffer.from(ethRes.publicKey, 'hex');
        // @ts-ignore
        hdEth.chainCode = Buffer.from(ethRes.chainCode, 'hex');
        return hdEth.publicExtendedKey;
    }

    /**
     * Returns the extended public key used by Swap and CoreChains for address derivation.
     * @remarks Returns the extended public key for path `m/44'/90000'/n'` where `n` is the account index.
     * @param transport
     * @param accountIndex Which account's public key to derive
     */
    static async getExtendedPublicKeyAxc(transport: any, accountIndex = 0): Promise<string> {
        const app = LedgerWallet.getAppAxc(transport);

        let res = await app.getWalletExtendedPublicKey(getAccountPathAxia(accountIndex));

        let pubKey = res.public_key;
        let chainCode = res.chain_code;

        // Get the base58 publick key from the HDKey instance
        let hdKey = new HDKey();
        // @ts-ignore
        hdKey.publicKey = pubKey;
        // @ts-ignore
        hdKey.chainCode = chainCode;

        return hdKey.publicExtendedKey;
    }

    static getAppAxc(transport: any) {
        return new AppAxc(transport, 'w0w');
    }

    static getAppEth(transport: any) {
        return new Eth(transport, 'w0w');
    }

    static async fromApp(app: AppAxc, eth: Eth): Promise<LedgerWallet> {
        let axcAccount = await LedgerWallet.getAxcAccount(app, 0);
        let evmAccount = await LedgerWallet.getEvmAccount(eth, 0);
        let config = await app.getAppConfiguration();
        //@ts-ignore
        return new LedgerWallet(axcAccount, evmAccount, app, eth, config);
    }

    getAddressC(): string {
        return this.evmWallet.getAddress();
    }

    getEvmAddressBech(): string {
        let keypair = new EVMKeyPair(axia.getHRP(), 'AX');
        //@ts-ignore
        let addr = keypair.addressFromPublicKey(Buffer.from(this.evmAccount.publicKey));
        return bintools.addressToString(axia.getHRP(), 'AX', addr);
    }

    async signEvm(tx: Transaction): Promise<Transaction> {
        const rawUnsignedTx = rlp.encode([
            bnToRlp(tx.nonce),
            bnToRlp(tx.gasPrice),
            bnToRlp(tx.gasLimit),
            tx.to !== undefined ? tx.to.buf : Buffer.from([]),
            bnToRlp(tx.value),
            tx.data,
            bnToRlp(tx.common.chainIdBN()),
            Buffer.from([]),
            Buffer.from([]),
        ]);
        //TODO: Use account derivation path instead of address
        const signature = await this.ethApp.signTransaction(LEDGER_ETH_ACCOUNT_PATH, rawUnsignedTx.toString('hex'));

        const signatureBN = {
            v: new EthBN(signature.v, 16),
            r: new EthBN(signature.r, 16),
            s: new EthBN(signature.s, 16),
        };

        const chainId = await web3.eth.getChainId();
        const networkId = await web3.eth.net.getId();

        let common = EthereumjsCommon.forCustomChain('mainnet', { networkId, chainId }, 'istanbul');
        const chainParams: TxOptions = {
            //@ts-ignore
            common,
        };

        const signedTx = Transaction.fromTxData(
            {
                nonce: tx.nonce,
                gasPrice: tx.gasPrice,
                gasLimit: tx.gasLimit,
                to: tx.to,
                value: tx.value,
                data: tx.data,
                ...signatureBN,
            },
            chainParams
        );
        return signedTx;
    }

    // Returns an array of derivation paths that need to sign this transaction
    // Used with signTransactionHash and signTransactionParsable
    async getTransactionPaths<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx>(
        unsignedTx: UnsignedTx,
        chainId: ChainIdType
    ): Promise<{ paths: string[]; isAxcOnly: boolean }> {
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();

        let ins = tx.getIns();
        let operations: TransferableOperation[] = [];

        // Try to get operations, it will fail if there are none, ignore and continue
        try {
            operations = (tx as OperationTx).getOperations();
        } catch (e) {
            console.log('Failed to get tx operations.');
        }

        let items = ins;
        if (
            (txType === AVMConstants.IMPORTTX && chainId === 'Swap') ||
            (txType === PlatformVMConstants.IMPORTTX && chainId === 'Core')
        ) {
            items = ((tx as AVMImportTx) || PlatformImportTx).getImportInputs();
        }

        let hrp = axia.getHRP();
        let paths: string[] = [];

        let isAxcOnly = true;
        // Collect paths derivation paths for source addresses
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            let assetId = bintools.cb58Encode(item.getAssetID());
            // @ts-ignore
            // if (assetId !== store.state.Assets.AVA_ASSET_ID) {
            if (assetId !== activeNetwork.axcID) {
                isAxcOnly = false;
            }

            let sigidxs: SigIdx[] = item.getInput().getSigIdxs();
            let sources = sigidxs.map((sigidx) => sigidx.getSource());
            let addrs: string[] = sources.map((source) => {
                return bintools.addressToString(hrp, chainId, source);
            });

            for (let j = 0; j < addrs.length; j++) {
                let srcAddr = addrs[j];
                let pathStr = await this.getPathFromAddress(srcAddr); // returns change/index

                paths.push(pathStr);
            }
        }

        // Do the Same for operational inputs, if there are any...
        for (let i = 0; i < operations.length; i++) {
            let op = operations[i];
            let sigidxs: SigIdx[] = op.getOperation().getSigIdxs();
            let sources = sigidxs.map((sigidx) => sigidx.getSource());
            let addrs: string[] = sources.map((source) => {
                return bintools.addressToString(hrp, chainId, source);
            });

            for (let j = 0; j < addrs.length; j++) {
                let srcAddr = addrs[j];
                let pathStr = await this.getPathFromAddress(srcAddr); // returns change/index

                paths.push(pathStr);
            }
        }

        return { paths, isAxcOnly };
    }

    async getPathFromAddress(address: string) {
        let externalAddrs = await this.externalScan.getAllAddresses();
        let internalAddrs = await this.internalScan.getAllAddresses();
        let platformAddrs = await this.externalScan.getAllAddresses('Core');

        let extIndex = externalAddrs.indexOf(address);
        let intIndex = internalAddrs.indexOf(address);
        let platformIndex = platformAddrs.indexOf(address);

        if (extIndex >= 0) {
            return `0/${extIndex}`;
        } else if (intIndex >= 0) {
            return `1/${intIndex}`;
        } else if (platformIndex >= 0) {
            return `0/${platformIndex}`;
        } else if (address[0] === 'AX') {
            return '0/0';
        } else {
            throw new Error('Unable to find source address.');
        }
    }

    async signX(unsignedTx: AVMUnsignedTx): Promise<AVMTx> {
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();
        let chainId: ChainIdType = 'Swap';

        let parseableTxs = ParseableAvmTxEnum;
        let { paths, isAxcOnly } = await this.getTransactionPaths<AVMUnsignedTx>(unsignedTx, chainId);

        // If ledger doesnt support parsing, sign hash
        let canLedgerParse = this.config.version >= '0.3.1';
        let isParsableType = txType in parseableTxs && isAxcOnly;

        let signedTx;
        if (canLedgerParse && isParsableType) {
            signedTx = await this.signTransactionParsable<AVMUnsignedTx, AVMTx>(unsignedTx, paths, chainId);
        } else {
            signedTx = await this.signTransactionHash<AVMUnsignedTx, AVMTx>(unsignedTx, paths, chainId);
        }

        return signedTx;
    }

    getChangePath(chainId?: ChainAlias): string {
        switch (chainId) {
            case 'Core':
                return 'm/0';
            case 'Swap':
            default:
                return 'm/1';
        }
    }

    getChangeIndex(chainId?: ChainAlias): number {
        switch (chainId) {
            case 'Core':
                // return this.platformHelper.hdIndex
                return this.externalScan.getIndex();
            case 'Swap':
            default:
                // return this.internalHelper.hdIndex
                return this.internalScan.getIndex();
        }
    }

    getChangeBipPath<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(
        unsignedTx: UnsignedTx,
        chainId: ChainIdType
    ) {
        if (chainId === 'AX') {
            return null;
        }

        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();

        const chainChangePath = this.getChangePath(chainId).split('m/')[1];
        let changeIdx = this.getChangeIndex(chainId);
        // If change and destination paths are the same
        // it can cause ledger to not display the destination amt.
        // Since platform helper does not have internal/external
        // path for change (it uses the external index)
        // there will be address collisions. So return null.
        if (
            txType === PlatformVMConstants.IMPORTTX ||
            txType === PlatformVMConstants.EXPORTTX ||
            txType === PlatformVMConstants.ADDVALIDATORTX ||
            txType === PlatformVMConstants.ADDNOMINATORTX
        ) {
            return null;
        }

        return bippath.fromString(`${AXC_ACCOUNT_PATH}/${chainChangePath}/${changeIdx}`);
    }

    // Used for signing transactions that are parsable
    async signTransactionParsable<
        UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx,
        SignedTx extends AVMTx | PlatformTx | EVMTx
    >(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx> {
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();
        let parseableTxs = {
            Swap: ParseableAvmTxEnum,
            Core: ParseablePlatformEnum,
            AX: ParseableEvmTxEnum,
        }[chainId];

        let title = `Sign ${parseableTxs[txType]}`;

        let bip32Paths = this.pathsToUniqueBipPaths(paths);

        const accountPath =
            chainId === 'AX' ? bippath.fromString(`${ETH_ACCOUNT_PATH}`) : bippath.fromString(`${AXC_ACCOUNT_PATH}`);
        let txbuff = unsignedTx.toBuffer();
        let changePath = this.getChangeBipPath(unsignedTx, chainId);
        //@ts-ignore
        let ledgerSignedTx = await this.appAxc.signTransaction(accountPath, bip32Paths, txbuff, changePath);

        let sigMap = ledgerSignedTx.signatures;
        let creds = this.getCredentials<UnsignedTx>(unsignedTx, paths, sigMap, chainId);

        let signedTx;
        switch (chainId) {
            case 'Swap':
                signedTx = new AVMTx(unsignedTx as AVMUnsignedTx, creds);
                break;
            case 'Core':
                signedTx = new PlatformTx(unsignedTx as PlatformUnsignedTx, creds);
                break;
            case 'AX':
                signedTx = new EVMTx(unsignedTx as EVMUnsignedTx, creds);
                break;
        }

        return signedTx as SignedTx;
    }

    // Used for non parsable transactions.
    // Ideally we wont use this function at all, but ledger is not ready yet.
    async signTransactionHash<
        UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx,
        SignedTx extends AVMTx | PlatformTx | EVMTx
    >(unsignedTx: UnsignedTx, paths: string[], chainId: ChainIdType): Promise<SignedTx> {
        let txbuff = unsignedTx.toBuffer();
        const msg: Buffer = Buffer.from(createHash('sha256').update(txbuff).digest());

        let bip32Paths = this.pathsToUniqueBipPaths(paths);

        // Sign the msg with ledger
        //TODO: Update when ledger supports Accounts
        const accountPathSource = chainId === 'AX' ? ETH_ACCOUNT_PATH : AXC_ACCOUNT_PATH;
        const accountPath = bippath.fromString(accountPathSource);
        //@ts-ignore
        let sigMap = await this.appAxc.signHash(accountPath, bip32Paths, msg);

        let creds: Credential[] = this.getCredentials<UnsignedTx>(unsignedTx, paths, sigMap, chainId);

        let signedTx;
        switch (chainId) {
            case 'Swap':
                signedTx = new AVMTx(unsignedTx as AVMUnsignedTx, creds);
                break;
            case 'Core':
                signedTx = new PlatformTx(unsignedTx as PlatformUnsignedTx, creds);
                break;
            case 'AX':
                signedTx = new EVMTx(unsignedTx as EVMUnsignedTx, creds);
                break;
        }

        return signedTx as SignedTx;
    }

    pathsToUniqueBipPaths(paths: string[]) {
        let uniquePaths = paths.filter((val: any, i: number) => {
            return paths.indexOf(val) === i;
        });

        let bip32Paths = uniquePaths.map((path) => {
            return bippath.fromString(path, false);
        });

        return bip32Paths;
    }

    getCredentials<UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx>(
        unsignedTx: UnsignedTx,
        paths: string[],
        sigMap: any,
        chainId: ChainIdType
    ): Credential[] {
        let creds: Credential[] = [];
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();

        // @ts-ignore
        let ins = tx.getIns ? tx.getIns() : [];
        let operations: TransferableOperation[] = [];
        let evmInputs: EVMInput[] = [];

        let items = ins;
        if (
            (txType === AVMConstants.IMPORTTX && chainId === 'Swap') ||
            (txType === PlatformVMConstants.IMPORTTX && chainId === 'Core') ||
            (txType === EVMConstants.IMPORTTX && chainId === 'AX')
        ) {
            items = ((tx as AVMImportTx) || PlatformImportTx || EVMImportTx).getImportInputs();
        }

        // Try to get operations, it will fail if there are none, ignore and continue
        try {
            operations = (tx as OperationTx).getOperations();
        } catch (e) {
            console.log('Failed to get tx operations.');
        }

        let CredentialClass;
        if (chainId === 'Swap') {
            CredentialClass = AVMSelectCredentialClass;
        } else if (chainId === 'Core') {
            CredentialClass = PlatformSelectCredentialClass;
        } else {
            CredentialClass = EVMSelectCredentialClass;
        }

        // Try to get evm inputs, it will fail if there are none, ignore and continue
        try {
            evmInputs = (tx as EVMExportTx).getInputs();
        } catch (e) {
            console.log('Failed to get EVM inputs.');
        }

        for (let i = 0; i < items.length; i++) {
            const sigidxs: SigIdx[] = items[i].getInput().getSigIdxs();
            const cred: Credential = CredentialClass(items[i].getInput().getCredentialID());

            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = i + j;
                let pathStr = paths[pathIndex];

                let sigRaw = sigMap.get(pathStr);
                let sigBuff = Buffer.from(sigRaw);
                const sig: Signature = new Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }

        for (let i = 0; i < operations.length; i++) {
            let op = operations[i].getOperation();
            const sigidxs: SigIdx[] = op.getSigIdxs();
            const cred: Credential = CredentialClass(op.getCredentialID());

            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = items.length + i + j;
                let pathStr = paths[pathIndex];

                let sigRaw = sigMap.get(pathStr);
                let sigBuff = Buffer.from(sigRaw);
                const sig: Signature = new Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }

        for (let i = 0; i < evmInputs.length; i++) {
            let evmInput = evmInputs[i];
            const sigidxs: SigIdx[] = evmInput.getSigIdxs();
            const cred: Credential = CredentialClass(evmInput.getCredentialID());

            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = items.length + i + j;
                let pathStr = paths[pathIndex];

                let sigRaw = sigMap.get(pathStr);
                let sigBuff = Buffer.from(sigRaw);
                const sig: Signature = new Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }

        return creds;
    }

    async signP(unsignedTx: PlatformUnsignedTx): Promise<PlatformTx> {
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();
        let chainId: ChainIdType = 'Core';
        let parseableTxs = ParseablePlatformEnum;

        let { paths, isAxcOnly } = await this.getTransactionPaths<PlatformUnsignedTx>(unsignedTx, chainId);
        // If ledger doesnt support parsing, sign hash
        let canLedgerParse = this.config.version >= '0.3.1';
        let isParsableType = txType in parseableTxs && isAxcOnly;

        // TODO: Remove after ledger is fixed
        // If UTXOS contain lockedStakeable funds always use sign hash
        let txIns = unsignedTx.getTransaction().getIns();
        for (let i = 0; i < txIns.length; i++) {
            let typeID = txIns[i].getInput().getTypeID();
            if (typeID === PlatformVMConstants.STAKEABLELOCKINID) {
                canLedgerParse = false;
                break;
            }
        }

        // TODO: Remove after ledger update
        // Ledger is not able to parse Core/AX atomic transactions
        if (txType === PlatformVMConstants.EXPORTTX) {
            const destChainBuff = (tx as PlatformExportTx).getDestinationChain();
            // If destination chain is AXChain, sign hash
            const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
            if (destChain === 'AX') {
                canLedgerParse = false;
            }
        }
        // TODO: Remove after ledger update
        // Ledger is not able to parse Core/AX atomic transactions
        if (txType === PlatformVMConstants.IMPORTTX) {
            const sourceChainBuff = (tx as PlatformImportTx).getSourceChain();
            // If destination chain is AXChain, sign hash
            const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
            if (sourceChain === 'AX') {
                canLedgerParse = false;
            }
        }

        let signedTx;
        if (canLedgerParse && isParsableType) {
            signedTx = await this.signTransactionParsable<PlatformUnsignedTx, PlatformTx>(unsignedTx, paths, chainId);
        } else {
            signedTx = await this.signTransactionHash<PlatformUnsignedTx, PlatformTx>(unsignedTx, paths, chainId);
        }
        return signedTx;
    }

    async signC(unsignedTx: EVMUnsignedTx): Promise<EVMTx> {
        // TODO: Might need to upgrade paths array to:
        //  paths = Array(utxoSet.getAllUTXOs().length).fill('0/0'),
        let tx = unsignedTx.getTransaction();
        let typeId = tx.getTxType();

        let paths = ['0/0'];
        if (typeId === EVMConstants.EXPORTTX) {
            let ins = (tx as EVMExportTx).getInputs();
            paths = ins.map(() => '0/0');
        } else if (typeId === EVMConstants.IMPORTTX) {
            let ins = (tx as EVMImportTx).getImportInputs();
            paths = ins.map(() => '0/0');
        }

        let canLedgerParse = true;

        // TODO: Remove after ledger update
        // Ledger is not able to parse Core/AX atomic transactions
        if (typeId === EVMConstants.EXPORTTX) {
            const destChainBuff = (tx as EVMExportTx).getDestinationChain();
            // If destination chain is AXChain, sign hash
            const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
            if (destChain === 'Core') {
                canLedgerParse = false;
            }
        }
        // TODO: Remove after ledger update
        if (typeId === EVMConstants.IMPORTTX) {
            const sourceChainBuff = (tx as EVMImportTx).getSourceChain();
            // If destination chain is AXChain, sign hash
            const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
            if (sourceChain === 'Core') {
                canLedgerParse = false;
            }
        }

        let txSigned;
        if (canLedgerParse) {
            txSigned = (await this.signTransactionParsable(unsignedTx, paths, 'AX')) as EVMTx;
        } else {
            txSigned = (await this.signTransactionHash(unsignedTx, paths, 'AX')) as EVMTx;
        }

        return txSigned;
    }
}
