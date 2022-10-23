import { useRouter } from 'next/router';
import { MenuItemsNFT } from '../menu-items';
import { Button } from '../shared';

type ButtonGroupProps = { hasConnected?: boolean } & {
  activeTabChangeHandler: (item?: MenuItemsNFT) => void;
};

export const ButtonGroup = ({
  activeTabChangeHandler,
  hasConnected,
}: ButtonGroupProps) => {
  const router = useRouter();
  const onCreateClickHandler = () => {
    activeTabChangeHandler();

    router.push('/create-nft');
  };

  return hasConnected ? (
    <Button className="mx-2 rounded-xl" onClick={onCreateClickHandler}>
      Create
    </Button>
  ) : (
    <Button
      className="mx-2 rounded-xl"
      onClick={() => {
        // TODO: Connect to Metamask
      }}
    >
      Connect
    </Button>
  );
};
