import React, { createContext, useEffect, useState } from 'react';

type NFTContextApi = {
  nftCurrency: string;
  connectWallet: () => void;
  currentAccount: string;
};

export const NFTContext = createContext<NFTContextApi>({} as NFTContextApi);

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
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

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};
