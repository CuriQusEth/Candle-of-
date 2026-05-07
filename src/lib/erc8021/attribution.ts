import { BUILDER_CODE } from '../web3/config';

/**
 * ERC-8021 Transaction Attribution
 * Appends builder code and attribution details to transaction calldata or standardizes event emission.
 */
export function buildAttributionData(originalData: string, attributionCode: string = '0x'): string {
  // In a real ERC-8021 implementation, we would encode the builder code and attribution code
  // and append it to the calldata according to the specification.
  console.log(`Attributing transaction to builder: ${BUILDER_CODE}`);
  return originalData; // Mocked for safety in preview
}

/**
 * Encodes a generic GM transaction on-chain with builder attribution.
 */
export function encodeSayGM(address: string) {
  // Mock encoding of a "Say GM" contract call
  return buildAttributionData(`0xGM_FROM_${address}`);
}
