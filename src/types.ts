export interface User {
	accent_color: string;
	avatar: string;
	banner: string;
	banner_color: string;
	discriminator: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	token: string;
	username: string;
	verified: boolean;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;

}


export interface PageProps {
	user?: User;
}

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