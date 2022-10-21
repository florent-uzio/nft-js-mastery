import { MenuItemsNFT } from './menu-items.types';

type MenuItemsProps = { active: MenuItemsNFT; isMobile: boolean };

export const MenuItems = ({ active, isMobile }: MenuItemsProps) => {
  const generateLink = () => {};

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
            onClick={() => {}}
            className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
              active === item
                ? 'dark:text-white text-nft-black-1'
                : 'dark:text-nft-gray-3 text-nft-gray-2'
            }`}
          ></li>
        );
      })}
    </ul>
  );
};
