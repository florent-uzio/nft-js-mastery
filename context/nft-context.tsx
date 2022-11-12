import React, { createContext, useEffect, useState } from 'react';
import { useIpfsClient } from '../utils';

type NFTContextApi = {
  nftCurrency: string;
  connectWallet: () => void;
  currentAccount: string;
  uploadToIPFS: (file: File) => Promise<string | undefined>;
};

export const NFTContext = createContext<NFTContextApi>({} as NFTContextApi);

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const { client } = useIpfsClient();
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    // @ts-ignore
    if (!window.ethereum) {
      return alert('Please install Metamask');
    }

    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    // @ts-ignore
    if (!window.ethereum) {
      return alert('Please install Metamask');
    }

    // @ts-ignore
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file });

      // const url = `https://ipfs.infura.io:5001/ipfs/${added.path}`;
      const url = `https://ipfs.io/ipfs/${added.path}`;

      return url;
    } catch (err) {
      console.log(`Error uploading file to IPFS: ${err}`);
    }
  };

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
