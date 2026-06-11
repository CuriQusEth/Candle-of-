import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export function useSendGMTransaction() {
  const { sendTransactionAsync } = useSendTransaction();

  const sendGMTransaction = async () => {
    try {
      // The instruction mentioned sending a transaction to this specific contract.
      // Assuming a generic call or 0 eth transfer if no ABI is provided.
      // Often a GM contract has a specific function, but without an ABI, 
      // we can try sending a simple 0 ETH transaction to "Say GM".
      // If it's a specific function call, we usually need the calldata.
      // Since the prompt doesn't give calldata or ABI, maybe we just send 0 value tx.
      const hash = await sendTransactionAsync({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: parseEther('0'),
      });
      alert(`GM sent! Tx Hash: ${hash}`);
    } catch (error) {
      console.error(error);
      alert('Failed to say GM');
    }
  };

  return { sendGMTransaction };
}
