import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import React, {FC, ReactNode, useMemo} from 'react';
// import '../App.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import {SendTransaction} from "../../components/sendTransaction";
import { NetworkConfigurationProvider, useNetworkConfiguration } from '../../context/NetworkConfigurationProvider';
import { WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';


const Context: FC<{ children: ReactNode}> = ({children}) => {
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network])
  //const endpoint = "localhost:8899"; // local cluster override
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo( () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new GlowWalletAdapter(),
    new SlopeWalletAdapter(),
    new TorusWalletAdapter()
  ], [network]);

  return (
    <ConnectionProvider endpoint={ endpoint }>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

const Content: FC = () => {
  return (
    <div className="h-screen bg-no-repeat bg-[url('https://cdn.suwalls.com/wallpapers/abstract/purple-blur-27032-1920x1080.jpg')]" >
        <div className="py-32 flex flex-col h-full w-full items-center justify-center">
            <h1 className=" font-mono text-9xl sm:text-xl capitalize tracking-widest text-white shadow-purple-500 font-black lg:text-9xl">FRAYFUL</h1>
            <div className="flex ">
                <video className="w-5/12 transform translate-x-6 translate-y-6 rounded-md object-left-top object-contain" src="https://www.frayful.com/photos/rot.webm" autoPlay loop></video>
                <div className="App flex flex-col justify-center items-center ">
                    <p className="uppercase  text-4xl text-white font-mono m-10">Connect your wallet and own your game assets!</p>                   
                    <WalletMultiButton className="bg-gradient-to-l from-emerald-400 to-purple-500  hover:from-pink-500 hover:to-yellow-500" /> 
                    <SendTransaction/>          
                </div>

            </div>
        </div>
    </div>
  );
}
export default function App() {
  return (
    <Context>
      <Content />
      
    </Context>
  );
}

