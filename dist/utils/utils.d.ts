/// <reference types="node" />
import { PayloadBase } from '@zee-ava/avajs/dist/utils';
/**
 * Checks if address is valid.
 *
 * @return
 * boolean if address is valid, error message if not valid.
 */
export declare function isValidAddress(address: string): boolean;
export declare function digestMessage(msgStr: string): Buffer;
export declare function parseNftPayload(rawPayload: string): PayloadBase;
