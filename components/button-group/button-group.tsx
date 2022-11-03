import { useRouter } from 'next/router';
import { useContext } from 'react';
import { NFTContext } from '../../context';
import { MenuItemsNFT } from '../menu-items';
import { Button } from '../shared';

type ButtonGroupProps = {
  activeTabChangeHandler: (item?: MenuItemsNFT) => void;
};

export const ButtonGroup = ({ activeTabChangeHandler }: ButtonGroupProps) => {
  const router = useRouter();
  const { connectWallet, currentAccount } = useContext(NFTContext);

  const onCreateClickHandler = () => {
    activeTabChangeHandler();

    router.push('/create-nft');
  };

  return currentAccount ? (
    <Button className="mx-2 rounded-xl" onClick={onCreateClickHandler}>
      Create
    </Button>
  ) : (
    <Button className="mx-2 rounded-xl" onClick={connectWallet}>
      Connect
    </Button>
  );
};
