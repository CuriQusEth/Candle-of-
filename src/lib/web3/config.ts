import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'

export const BUILDER_CODE = 'bc_ekawyf65';
export const APP_ID = '693ee23ad19763ca26ddc2d4';

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
