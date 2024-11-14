import { RecordTypeEnum } from '@/enums/RecordTypeEnum';
import { ICategory } from '@/types/ICategory';

export const defaultCategories: ICategory[] = [
  {
    id: 'shopping',
    title: 'Продукты',
    icon: 'shopping',
    type: RecordTypeEnum.EXPENSES,
    color: '#FF0000',
  },
  {
    id: 'food',
    title: 'Кафе',
    icon: 'food',
    type: RecordTypeEnum.EXPENSES,
    color: '#FFA500',
  },
  {
    id: 'games',
    title: 'Игры',
    icon: 'gamepad',
    type: RecordTypeEnum.EXPENSES,
    color: '#00FF00',
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
    color: '#FF00FF',
  },
  {
    id: 'sport',
    title: 'Спорт',
    icon: 'swimming',
    type: RecordTypeEnum.EXPENSES,
    color: '#8A2BE2',
  },
  {
    id: 'education',
    title: 'Образование',
    icon: 'book',
    type: RecordTypeEnum.EXPENSES,
    color: '#00FFFF',
  },

  {
    id: 'transport',
    title: 'Транспорт',
    icon: 'bus',
    type: RecordTypeEnum.EXPENSES,
    color: '#7FFF00',
  },
  {
    id: 'car',
    title: 'Авто',
    icon: 'car',
    type: RecordTypeEnum.EXPENSES,
    color: '#FF0000',
  },
  {
    id: 'salary',
    title: 'Зарплата',
    icon: 'salary',
    type: RecordTypeEnum.INCOME,
    color: '#8A2BE2',
  },
];
