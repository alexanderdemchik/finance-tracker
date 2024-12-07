import { TbBuildingCarousel, TbGhost3, TbNut, TbPacman, TbShoppingCart, TbSwimming, TbToolsKitchen2, TbTransfer } from 'react-icons/tb';

import { LuGamepad2 } from 'react-icons/lu';
import {
  FaMobileScreenButton,
  FaBook,
  FaShirt,
  FaBus,
  FaCar,
  FaHeartPulse,
  FaMoneyCheck,
  FaCreditCard,
  FaPercent,
  FaBuildingColumns,
  FaWallet,
  FaPiggyBank,
} from 'react-icons/fa6';

import { GiMoneyStack } from 'react-icons/gi';

export const iconsToComponentsMap = {
  gamepad: LuGamepad2,
  ghost: TbGhost3,
  pacman: TbPacman,
  shopping: TbShoppingCart,
  food: TbToolsKitchen2,
  phone: FaMobileScreenButton,
  carousel: TbBuildingCarousel,
  book: FaBook,
  swimming: TbSwimming,
  shirt: FaShirt,
  bus: FaBus,
  car: FaCar,
  health: FaHeartPulse,
  salary: FaMoneyCheck,
  moneyStack: GiMoneyStack,
  creditCard: FaCreditCard,
  percent: FaPercent,
  bank: FaBuildingColumns,
  wallet: FaWallet,
  piggyBank: FaPiggyBank,
  tranfer: TbTransfer,
  correction: TbNut,
};

export type AvailableIconsType = keyof typeof iconsToComponentsMap;
