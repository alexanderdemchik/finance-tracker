import { AvailableIconsType } from '@/constants/iconsToComponentsMap';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export interface ICategory {
  id: string;
  title: string;
  icon: AvailableIconsType;
  type: RecordTypeEnum;
  color?: string;
  hidden?: boolean;
}
