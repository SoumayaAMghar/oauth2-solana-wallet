
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter
    // LedgerWalletAdapter,
    // SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Cluster, clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from '../../context/AutoConnectProvider';
// import { notify } from "../utils/notifications";
import { NetworkConfigurationProvider, useNetworkConfiguration } from '../../context/NetworkConfigurationProvider';
import { SendTransaction } from '../../components/sendTransaction';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    // const endpoint = "localhost:8899";
    console.log(network);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new TorusWalletAdapter()
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            // notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>{children}</WalletContextProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>



    );
};





function App() {
  return (
    <ContextProvider>
        <WalletContextProvider>
      <Content />
      </WalletContextProvider>
    </ContextProvider>
  );
}

export default App;


const Content: FC = () => {
  return (
    <div className="h-screen bg-no-repeat bg-[url('https://cdn.suwalls.com/wallpapers/abstract/purple-blur-27032-1920x1080.jpg')]" >
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
            <div className="max-w-2xl text-center">
                <h1 className=" font-mono text-9xl sm:text-xl capitalize tracking-widest text-white shadow-purple-500 font-black lg:text-9xl">FRAYFUL</h1>
                <div className="App flex flex-col justify-center items-center">
                    <p className="uppercase text-center text-4xl text-white font-mono m-10">Own your game assets!</p>
                <WalletMultiButton className="bg-gradient-to-l from-emerald-400 to-purple-500" /> 
                <SendTransaction/>
                </div>
            </div>
        </div>
    </div>
  );
}
