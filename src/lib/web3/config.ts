import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'

export const BUILDER_CODE = 'bc_ekawyf65';
export const APP_ID = '693ee23ad19763ca26ddc2d4';

// Base Mainnet configured with Denim upgrade (activated Nov 5, 2026: 200ms native canonical blocks)
export const baseDenim = {
  ...base,
  name: 'Base Mainnet (Denim 200ms)',
  custom: {
    ...base.custom,
    networkUpgrade: 'Denim',
    blockTimeMs: 200,
    activatedAt: '2026-11-05T18:00:00Z',
  },
} as const;

export const wagmiConfig = createConfig({
  chains: [baseDenim],
  // 200ms polling interval aligned with Denim 200ms canonical block generation
  pollingInterval: 200,
  transports: {
    [baseDenim.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
})

