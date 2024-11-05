import { CurrencyCodeEnum } from '../constants/currencies';
import { AvailableIconsType } from '../constants/iconsToComponentsMap';

export interface IStoreState extends IAccountsSlice, IRecordsSlice, ISettingsSlice, ICategoriesSlice {
  layout: ILayoutSlice;
  _hasHydrated: boolean;
  setHasHydrated: (a: boolean) => void;
}

export interface ILayoutSlice {
  isAddingRecord: boolean;
  editRecordData?: IRecord;
  toggleAddingRecord: (editData?: IRecord) => void;
}

export interface IAccount {
  id: string;
  title: string;
  default: boolean;
  currency: CurrencyCodeEnum;
  icon: AvailableIconsType;
  color?: string;
  balance: number;
}

export interface IAccountsSlice {
  accounts: IAccount[];
  createAccount: (ac: IAccount) => void;
  updateAccountBalance: (id: string, change: number, type: RecordTypeEnum) => void;
}

export enum RecordTypeEnum {
  INCOME = 'IN',
  EXPENSES = 'EX',
  TRANSFER = 'TR',
}

export interface IRecord {
  id: string;
  catId: string;
  accId?: string;
  targetAccId?: string;
  value: number;
  currency: CurrencyCodeEnum;
  originalValue?: number;
  originalCurrency?: CurrencyCodeEnum;
  date: number;
  type: RecordTypeEnum;
}

export interface IRecordsSlice {
  records: IRecord[];
  addRecord: (rec: IRecord) => void;
  delRecord: (rec: IRecord) => void;
  editRecord: (rec: IRecord) => void;
}

export interface ISettingsSlice {
  currency: CurrencyCodeEnum;
  setCurrency: (c: CurrencyCodeEnum) => void;
  setInitialCurrency: (c: CurrencyCodeEnum) => void;
}

export interface ICategory {
  id: string;
  title: string;
  icon: AvailableIconsType;
  type: RecordTypeEnum;
  color?: string;
  hidden?: boolean;
}

export interface ICategoriesSlice {
  categories: ICategory[];
  setCategories: (cats: ICategory[]) => void;
  toggleCategoryVisibility: (id: string) => void;
  addCategory: (cat: ICategory) => void;
}

export interface IHomeStore {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
