import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export interface IRecord {
  id: string;
  catId?: string;
  accId?: string;
  value: number;
  currency: CurrencyCodeEnum;
  sourceAccId?: string;
  sourceValue?: number;
  sourceCurrency?: CurrencyCodeEnum;
  date: number;
  type: RecordTypeEnum;
}
