import { TFunction } from 'i18next';
import { currencies, signByCurrencyCode } from '@/constants/currencies';

export const getSortedCurrencies = (translationFn: TFunction) =>
  currencies.map((el) => ({
    code: el.code,
    sign: signByCurrencyCode[el.code],
    label: translationFn(el.code),
  }));
