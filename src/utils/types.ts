export type AxvmStatusType = 'Accepted' | 'Processing' | 'Rejected' | 'Unknown';
export type PlatformStatusType = 'Committed' | 'Processing' | 'Dropped' | 'Unknown';
export type ChainStatusTypeC = 'Accepted' | 'Processing' | 'Dropped' | 'Unknown';

export type AxvmStatusResponseType = AxvmStatusType | iAxvmStatusResponse;
export type PlatformStatusResponseType = PlatformStatusType | iPlatformStatusResponse;
export type ChainStatusResponseTypeC = ChainStatusTypeC | iChainStatusResponseC;

export interface iAxvmStatusResponse {
    status: AxvmStatusType;
    reason: string;
}

export interface iPlatformStatusResponse {
    status: PlatformStatusType;
    reason: string;
}

export interface iChainStatusResponseC {
    status: PlatformStatusType;
    reason: string;
}
