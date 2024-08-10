import { CurrencyCodeEnum } from './currencies';
import json from './conversionRates.json';

export const defaultConvertionRates: Partial<
  Record<CurrencyCodeEnum, Partial<Record<CurrencyCodeEnum, number>>>
> = json;
