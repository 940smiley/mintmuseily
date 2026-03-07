"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

const SEPOLIA_RPC = process.env.NEXT_PUBLIC_RPC_URL!;
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

if (!SEPOLIA_RPC || !WALLETCONNECT_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_RPC_URL and NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID must be defined');
}

const config = getDefaultConfig({
  appName: 'MintMuseily',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(SEPOLIA_RPC),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
