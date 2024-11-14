import { AvailableIconsType } from '@/constants/iconsToComponentsMap';
import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';

export interface IAccount {
  id: string;
  title: string;
  default: boolean;
  currency: CurrencyCodeEnum;
  icon: AvailableIconsType;
  color?: string;
  balance: number;
}
