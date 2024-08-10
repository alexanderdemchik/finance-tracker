import { ICategory, RecordTypeEnum } from '../store/types';

export const defaultCategories: ICategory[] = [
  {
    id: 'shopping',
    title: 'Продукты',
    icon: 'shopping',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'food',
    title: 'Кафе',
    icon: 'food',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'games',
    title: 'Игры',
    icon: 'gamepad',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'phone',
    title: 'Телефон',
    icon: 'phone',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'entertaiment',
    title: 'Развлечения',
    icon: 'carousel',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'sport',
    title: 'Спорт',
    icon: 'swimming',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'education',
    title: 'Образование',
    icon: 'book',
    type: RecordTypeEnum.EXPENSES,
  },

  {
    id: 'transport',
    title: 'Транспорт',
    icon: 'bus',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'car',
    title: 'Авто',
    icon: 'car',
    type: RecordTypeEnum.EXPENSES,
  },
  {
    id: 'salary',
    title: 'Зарплата',
    icon: 'salary',
    type: RecordTypeEnum.INCOME,
  },
];
