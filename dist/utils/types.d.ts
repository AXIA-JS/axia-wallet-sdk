export declare type AxvmStatusType = 'Accepted' | 'Processing' | 'Rejected' | 'Unknown';
export declare type PlatformStatusType = 'Committed' | 'Processing' | 'Dropped' | 'Unknown';
export declare type ChainStatusTypeC = 'Accepted' | 'Processing' | 'Dropped' | 'Unknown';
export declare type AxvmStatusResponseType = AxvmStatusType | iAxvmStatusResponse;
export declare type PlatformStatusResponseType = PlatformStatusType | iPlatformStatusResponse;
export declare type ChainStatusResponseTypeC = ChainStatusTypeC | iChainStatusResponseC;
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
