import Link from 'next/link';
import { MenuItemsNFT } from './menu-items.types';

type MenuItemsProps = {
  active: MenuItemsNFT;
  isMobile: boolean;
  activeTabChangeHandler: (item: MenuItemsNFT) => void;
};

export const MenuItems = ({
  active,
  isMobile,
  activeTabChangeHandler,
}: MenuItemsProps) => {
  const generateLink = (items: MenuItemsNFT) => {
    switch (items) {
      case MenuItemsNFT.ExploreNFTs: {
        return '/';
      }
      case MenuItemsNFT.ListedNFTs: {
        return '/created-nfts';
      }
      case MenuItemsNFT.MyNFTs: {
        return '/my-nfts';
      }
      default: {
        return '/';
      }
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {Object.values(MenuItemsNFT).map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => activeTabChangeHandler(item)}
            className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
              active === item
                ? 'dark:text-white text-nft-black-1'
                : 'dark:text-nft-gray-3 text-nft-gray-2'
            }`}
          >
            <Link href={generateLink(item)}>{item}</Link>
          </li>
        );
      })}
    </ul>
  );
};
