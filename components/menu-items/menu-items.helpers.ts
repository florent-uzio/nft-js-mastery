import { MenuItemsNFT } from './menu-items.types';

export const isMenuItemNFT = (thing: string): thing is MenuItemsNFT => {
  return Object.values<string>(MenuItemsNFT).includes(thing);
};
