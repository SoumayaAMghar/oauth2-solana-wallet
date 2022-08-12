import { AppProps } from "next/app";
import Head from "next/head";
import '../styles/globals.css'
import {
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";


type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};
const [provider, setProvider] = useState<PhantomProvider | undefined>(
  undefined
);
useEffect(() => {
  const provider = getProvider();

  if (provider) setProvider(provider);
  else setProvider(undefined);
}, []);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta property="og:image" content="/public/vercel.svg" key="og-image" />
        <link rel="icon" href="/public/vercel.svg" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
      </Head>

      <Component {...pageProps} />
      
    </>
  );
}
