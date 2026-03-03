"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

const SEPOLIA_RPC = process.env.NEXT_PUBLIC_RPC_URL;
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!SEPOLIA_RPC || !WALLETCONNECT_PROJECT_ID) {
  throw new Error(
    "Missing required environment variables: NEXT_PUBLIC_RPC_URL or NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"
  );
}

const chains = [sepolia] as const;

const { connectors } = getDefaultWallets({
  appName: 'MintMuseily',
  projectId: WALLETCONNECT_PROJECT_ID,
});

const config = createConfig({
  chains,
  connectors,
  transports: {
    [sepolia.id]: http(SEPOLIA_RPC),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
