import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export interface IRecord {
  id: string;
  catId?: string;
  accId?: string;
  targetAccId?: string;
  value: number;
  currency: CurrencyCodeEnum;
  originalValue?: number;
  originalCurrency?: CurrencyCodeEnum;
  date: number;
  type: RecordTypeEnum;
}
