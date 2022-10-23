import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import images from '../assets';
import { ButtonGroup } from './button-group';
import { MenuItems, MenuItemsNFT } from './menu-items';

export const Navbar = () => {
  const [active, setActive] = useState<MenuItemsNFT | undefined>(
    MenuItemsNFT.ExploreNFTs
  );
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const changeThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const activeTabChangeHandler = (item?: MenuItemsNFT) => {
    if (item) {
      setActive(item);
    }
    setActive(undefined);
  };

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              CryptoKet
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      {/* Toggle dark/light */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={changeThemeHandler}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />

            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        {/* Menu items */}
        {/* Larger devices coding */}
        <div className="md:hidden flex">
          <MenuItems
            active={active}
            activeTabChangeHandler={activeTabChangeHandler}
            isMobile={false}
          />
          <ButtonGroup
            activeTabChangeHandler={activeTabChangeHandler}
            hasConnected={true}
          />
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            alt="close"
            className={theme === 'light' ? 'filter invert' : ''}
            height={20}
            objectFit="contain"
            onClick={() => setIsOpen(false)}
            src={images.cross}
            width={20}
          />
        ) : (
          <Image
            alt="menu"
            className={theme === 'light' ? 'filter invert' : ''}
            height={25}
            objectFit="contain"
            onClick={() => setIsOpen(true)}
            src={images.menu}
            width={25}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                activeTabChangeHandler={activeTabChangeHandler}
                isMobile
              />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup activeTabChangeHandler={activeTabChangeHandler} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
