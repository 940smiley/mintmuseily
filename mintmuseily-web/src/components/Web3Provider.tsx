"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SEPOLIA_RPC = process.env.NEXT_PUBLIC_RPC_URL;

if (!SEPOLIA_RPC) {
  throw new Error('NEXT_PUBLIC_RPC_URL is not defined in environment variables');
}

const chains = [sepolia] as const;

const { connectors } = getDefaultWallets({
  appName: 'MintMuseily',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
});

const config = createConfig({
  chains,
  connectors,
  transports: {
    [sepolia.id]: http(SEPOLIA_RPC),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
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
