import React, { createContext } from 'react';

type NFTContextApi = {
  nftCurrency: string;
};

export const NFTContext = createContext<NFTContextApi>({} as NFTContextApi);

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const nftCurrency = 'ETH';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
